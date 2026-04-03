use anyhow::{Result, anyhow};
use clap::Parser;
use claudette_rs::api::{ApiConfig, ApiProvider, LlmClient, QueryEngine};
use claudette_rs::commands::{clear_command, cost_command, help_command, model_command};
use claudette_rs::mcp::{McpClient, McpToolWrapper};
use claudette_rs::tools::{BashTool, EditTool, GlobTool, GrepTool, ReadTool, TodoWriteTool, WebFetchTool, WebSearchTool, WriteTool};
use claudette_rs::tui::{App, run_tui};
use claudette_rs::types::{CommandRegistry, Message, ToolRegistry, CostTracker, StreamEvent};
use claudette_rs::types::permission::{PermissionContext, PermissionMode, ToolPermissionRule};
use claudette_rs::utils::system_prompt::build_system_prompt;
use parking_lot::Mutex;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use tokio::sync::{mpsc, Mutex as TokioMutex};

#[derive(Debug, Deserialize, Serialize, Clone)]
struct McpServerConfig {
    name: String,
    command: String,
    args: Vec<String>,
    instructions: String,
}

#[derive(Debug, Deserialize, Serialize, Default, Clone)]
struct Settings {
    #[serde(default)]
    permission_mode: String,
    #[serde(default)]
    always_allow: Vec<String>,
    #[serde(default)]
    always_deny: Vec<String>,
    #[serde(default)]
    always_ask: Vec<String>,
    #[serde(default)]
    read_only: bool,
}

async fn load_settings() -> Result<Settings> {
    let config_dir = dirs::config_dir().ok_or_else(|| anyhow::anyhow!("No config directory"))?.join("claudette");
    let settings_path = config_dir.join("settings.json");
    if !settings_path.exists() {
        return Ok(Settings::default());
    }
    let data = tokio::fs::read_to_string(&settings_path).await?;
    let settings: Settings = serde_json::from_str(&data)?;
    Ok(settings)
}

async fn load_mcp_config() -> Result<Vec<McpServerConfig>> {
    let config_dir = dirs::config_dir().ok_or_else(|| anyhow::anyhow!("No config directory"))?.join("claudette");
    let config_path = config_dir.join("mcp.json");
    if !config_path.exists() {
        return Ok(Vec::new());
    }
    let data = tokio::fs::read_to_string(&config_path).await?;
    let configs: Vec<McpServerConfig> = serde_json::from_str(&data)?;
    Ok(configs)
}

#[derive(Parser, Debug)]
#[command(name = "claudette")]
#[command(about = "A terminal-based AI coding agent")]
#[command(version)]
struct Cli {
    /// Working directory
    #[arg(short, long, default_value = ".")]
    cwd: String,

    /// Model to use
    #[arg(short, long)]
    model: Option<String>,

    /// API provider
    #[arg(long, value_enum, default_value = "anthropic")]
    provider: Provider,

     /// Base URL for API requests (for OpenAI-compatible endpoints)
     #[arg(long)]
     base_url: Option<String>,
 
     /// API key (overrides settings and environment variables)
     #[arg(long)]
     api_key: Option<String>,
 
     /// Maximum tokens in response
     #[arg(long, default_value_t = 8192)]
     max_tokens: u64,

    /// Maximum turns per message
    #[arg(long, default_value_t = 50)]
    max_turns: usize,

    /// Skip the TUI and run in REPL mode
    #[arg(long)]
    repl: bool,

    /// Show version and exit
    #[arg(long)]
    show_version: bool,

    /// Demo mode — no API key needed, simulated responses
    #[arg(long)]
    demo: bool,
}

#[derive(clap::ValueEnum, Clone, Debug, Default)]
enum Provider {
    #[default]
    Anthropic,
    Openai,
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();

    if cli.show_version {
        println!("claudette-rs {}", env!("CARGO_PKG_VERSION"));
        return Ok(());
    }

    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("warn")),
        )
        .init();

    let cwd = std::env::current_dir()?;

    if cli.demo {
        return run_demo(&cwd).await;
    }

    let provider = match cli.provider {
        Provider::Anthropic => ApiProvider::Anthropic,
        Provider::Openai => ApiProvider::OpenAI,
    };

    // If --api-key provided, set appropriate environment variable
    if let Some(key) = &cli.api_key {
        match provider {
            ApiProvider::Anthropic => std::env::set_var("ANTHROPIC_API_KEY", key),
            ApiProvider::OpenAI => std::env::set_var("OPENAI_API_KEY", key),
        }
    }

    // Auto-detect provider if neither key is set for the chosen one
    let has_anthropic_key = std::env::var("ANTHROPIC_API_KEY").is_ok();
    let has_openai_key = std::env::var("OPENAI_API_KEY").is_ok();

    let provider = match (provider, has_anthropic_key, has_openai_key) {
        (ApiProvider::Anthropic, false, true) => {
            eprintln!("ANTHROPIC_API_KEY not set, but OPENAI_API_KEY found. Switching to OpenAI provider.");
            ApiProvider::OpenAI
        }
        (ApiProvider::OpenAI, true, false) => {
            eprintln!("OPENAI_API_KEY not set, but ANTHROPIC_API_KEY found. Switching to Anthropic provider.");
            ApiProvider::Anthropic
        }
        (p, _, _) => p,
    };

    // Ensure the appropriate API key is set (from --api-key or environment)
    let api_key = match provider {
        ApiProvider::Anthropic => std::env::var("ANTHROPIC_API_KEY")
            .map_err(|_| anyhow!("ANTHROPIC_API_KEY not set. Use --api-key or set env var."))?,
        ApiProvider::OpenAI => std::env::var("OPENAI_API_KEY")
            .map_err(|_| anyhow!("OPENAI_API_KEY not set. Use --api-key or set env var."))?,
    };

    let base_url = cli.base_url.unwrap_or_else(|| match provider {
        ApiProvider::Anthropic => "https://api.anthropic.com".to_string(),
        ApiProvider::OpenAI => "https://api.openai.com".to_string(),
    });

     let model = cli.model.unwrap_or_else(|| match provider {
         ApiProvider::Anthropic => "claude-sonnet-4-20250514".to_string(),
         ApiProvider::OpenAI => "gpt-4o".to_string(),
     });

     // Build tool registry first
     let mut tool_registry = ToolRegistry::new();
     tool_registry.register(Box::new(BashTool::new()));
     tool_registry.register(Box::new(ReadTool));
     tool_registry.register(Box::new(WriteTool));
     tool_registry.register(Box::new(EditTool));
     tool_registry.register(Box::new(GlobTool));
     tool_registry.register(Box::new(GrepTool));
     tool_registry.register(Box::new(TodoWriteTool));
     tool_registry.register(Box::new(WebFetchTool::new()));
     tool_registry.register(Box::new(WebSearchTool::new()));

     // Load and register MCP tools if configured
     let mcp_configs = load_mcp_config().await?;
     let mut mcp_clients_info: Vec<(String, String)> = Vec::new();


     for config in mcp_configs {
         match McpClient::new(config.command.clone(), config.args.clone(), None).await {
             Ok(client) => {
                  let client_arc = Arc::new(TokioMutex::new(client));
                 // Initialize
                 {
                     let mut client_lock = client_arc.lock().await;
                     if let Err(e) = client_lock.initialize().await {
                         eprintln!("Failed to initialize MCP server {}: {}", config.name, e);
                         continue;
                     }
                 }
                 // List tools and register
                 let mut client_lock = client_arc.lock().await;
                 match client_lock.list_tools().await {
                     Ok(mcp_tools) => {
                         for mcp_tool in mcp_tools {
                             let wrapper = McpToolWrapper::new(config.name.clone(), mcp_tool, Arc::clone(&client_arc));
                             tool_registry.register(Box::new(wrapper));
                         }
                         mcp_clients_info.push((config.name, config.instructions));
                     }
                     Err(e) => {
                         eprintln!("Failed to list tools from MCP server: {}", e);
                     }
                 }

             }
             Err(e) => {
                 eprintln!("Failed to create MCP client: {}", e);
             }
         }
     }

     let tool_definitions = tool_registry.definitions();
     let mcp_info_refs: Vec<(&str, &str)> = mcp_clients_info.iter().map(|(n,i)| (n.as_str(), i.as_str())).collect();

     // Build system prompt with comprehensive settings
    let model_info = match provider {
        ApiProvider::Anthropic => Some(("Claude", model.as_str())),
        ApiProvider::OpenAI => Some(("GPT", model.as_str())),
    };
     let system_prompt = build_system_prompt(
         &cwd,
         Some(&tool_definitions),
         model_info,
         Some(&mcp_info_refs), // mcp_clients
         None, // simple_mode
         None, // proactive_mode
         None, // language_preference
         None, // output_style
         None, // token_budget
         None, // enable_scratchpad
         None, // scratchpad_dir
         None, // enable_hooks
         None, // fork_subagent_enabled
         None, // verification_agent_enabled
         None, // ant_mode
         None, // keep_recent
     ).await;

    let mut command_registry = CommandRegistry::new();
    let tool_names: Vec<String> = tool_registry.names().into_iter().map(|s| s.to_string()).collect();
    command_registry.register(help_command(tool_names.clone()));
    command_registry.register(clear_command());
    command_registry.register(model_command(model.clone()));

    let cost_tracker = Arc::new(Mutex::new(CostTracker::new()));
    command_registry.register(cost_command(cost_tracker.clone()));

    let config = ApiConfig {
        api_key,
        model: model.clone(),
        max_tokens: cli.max_tokens,
        base_url,
        temperature: None,
        provider,
    };
    let client = LlmClient::new(config);

    // Load settings for permission and read-only mode
     let settings = load_settings().await.unwrap_or_default();
     let mode = match settings.permission_mode.as_str() {
         "auto" => PermissionMode::Auto,
         "bypass" => PermissionMode::Bypass,
         _ => PermissionMode::Auto,
     };
    let mut permission_ctx = PermissionContext::new(mode);
    for tool in &settings.always_allow {
        permission_ctx.add_always_allow(tool);
    }
    for tool in &settings.always_deny {
        permission_ctx.add_always_deny(tool);
    }
    for tool in &settings.always_ask {
        permission_ctx.always_ask.push(ToolPermissionRule {
            tool_name: tool.clone(),
            pattern: None,
        });
    }
    let read_only = settings.read_only;

    let mut query_engine = QueryEngine::new(
        tool_registry,
        system_prompt.clone(),
        client,
        cli.max_turns,
        permission_ctx,
        read_only,
    );

    let (input_tx, mut input_rx) = mpsc::channel::<String>(32);
    let (event_tx, event_rx) = mpsc::channel::<StreamEvent>(256);

      let cost_tracker_clone = cost_tracker.clone();
      let model_clone = model.clone();
      let command_names: Vec<String> = command_registry.names().into_iter().map(|s| s.to_string()).collect();
      let query_handle = tokio::spawn(async move {
          while let Some(input) = input_rx.recv().await {
             if input.starts_with('/') {
                 if input == "/quit" || input == "/exit" {
                     let _ = event_tx.send(StreamEvent::MessageEnd {
                         message: claudette_rs::types::event::AssistantMessage {
                             content: vec![],
                             usage: claudette_rs::types::event::Usage::default(),
                         },
                     }).await;
                     break;
                 }

                 if let Some(cmd) = command_registry.find(&input) {
                     let args = input.trim_start_matches('/').split_once(' ').map(|(_, a)| a).unwrap_or("");
                     match cmd.handler.execute(args).await {
                         Ok(result) => {
                             if result == "CLEAR_SESSION" {
                                 let _ = event_tx.send(StreamEvent::ClearScreen).await;
                                 let _ = event_tx.send(StreamEvent::TextDelta {
                                     delta: "\n\n[Session cleared]".to_string(),
                                 }).await;
                             } else {
                                 let _ = event_tx.send(StreamEvent::TextDelta {
                                     delta: format!("\n\n{result}"),
                                 }).await;
                             }
                             let _ = event_tx.send(StreamEvent::MessageEnd {
                                 message: claudette_rs::types::event::AssistantMessage {
                                     content: vec![],
                                     usage: claudette_rs::types::event::Usage::default(),
                                 },
                             }).await;
                         }
                         Err(e) => {
                             let _ = event_tx.send(StreamEvent::Error {
                                 message: e.to_string(),
                                 retryable: false,
                             }).await;
                         }
                     }
                     continue;
                 }
             }

             let msg = Message::user_text(&input);
             let tx = event_tx.clone();
             let tracker = cost_tracker_clone.clone();
             let model_name = model_clone.clone();

             match query_engine.submit_message(msg, move |event| {
                 let tx = tx.clone();
                 let tracker = tracker.clone();
                 let model_name = model_name.clone();

                 if let StreamEvent::MessageEnd { message } = &event {
                     let mut t = tracker.lock();
                     t.add_usage(&model_name, &message.usage);
                 }

                 tokio::spawn(async move {
                     let _ = tx.send(event).await;
                 });
             }).await {
                 Ok(()) => {
                     let usage = query_engine.get_usage();
                     let _ = event_tx.send(StreamEvent::MessageEnd {
                         message: claudette_rs::types::event::AssistantMessage {
                             content: vec![],
                             usage: claudette_rs::types::event::Usage {
                                 input_tokens: usage.input_tokens,
                                 output_tokens: usage.output_tokens,
                                 cache_creation_input_tokens: usage.cache_creation_input_tokens,
                                 cache_read_input_tokens: usage.cache_read_input_tokens,
                             },
                         },
                     }).await;
                 }
                 Err(e) => {
                     let _ = event_tx.send(StreamEvent::Error {
                         message: e.to_string(),
                         retryable: true,
                     }).await;
                 }
             }
         }
     });

    let app = App::new(Some(command_names.clone()));
    run_tui(app, event_rx, input_tx).await?;

    query_handle.abort();

    Ok(())
}



async fn run_demo(_cwd: &std::path::Path) -> Result<()> {
     eprintln!("Running in DEMO mode — no API calls will be made.\n");

     // Build tool registry first
     let mut tool_registry = ToolRegistry::new();
     tool_registry.register(Box::new(BashTool::new()));
     tool_registry.register(Box::new(ReadTool));
     tool_registry.register(Box::new(WriteTool));
     tool_registry.register(Box::new(EditTool));
     tool_registry.register(Box::new(GlobTool));
     tool_registry.register(Box::new(GrepTool));
     tool_registry.register(Box::new(TodoWriteTool));
     tool_registry.register(Box::new(WebFetchTool::new()));
     tool_registry.register(Box::new(WebSearchTool::new()));

     // Load and register MCP tools if configured
     let mcp_configs = load_mcp_config().await?;
     let mut mcp_clients_info: Vec<(String, String)> = Vec::new();


     for config in mcp_configs {
         match McpClient::new(config.command.clone(), config.args.clone(), None).await {
             Ok(client) => {
                  let client_arc = Arc::new(TokioMutex::new(client));
                 // Initialize
                 {
                     let mut client_lock = client_arc.lock().await;
                     if let Err(e) = client_lock.initialize().await {
                         eprintln!("Failed to initialize MCP server {}: {}", config.name, e);
                         continue;
                     }
                 }
                 // List tools and register
                 let mut client_lock = client_arc.lock().await;
                 match client_lock.list_tools().await {
                     Ok(mcp_tools) => {
                         for mcp_tool in mcp_tools {
                             let wrapper = McpToolWrapper::new(config.name.clone(), mcp_tool, Arc::clone(&client_arc));
                             tool_registry.register(Box::new(wrapper));
                         }
                         mcp_clients_info.push((config.name, config.instructions));
                     }
                     Err(e) => {
                         eprintln!("Failed to list tools from MCP server: {}", e);
                     }
                 }

             }
             Err(e) => {
                 eprintln!("Failed to create MCP client: {}", e);
             }
         }
     }



    let mut command_registry = CommandRegistry::new();
    let tool_names: Vec<String> = tool_registry.names().into_iter().map(|s| s.to_string()).collect();
    command_registry.register(help_command(tool_names.clone()));
    command_registry.register(clear_command());
    command_registry.register(model_command("demo".to_string()));

    let cost_tracker = Arc::new(Mutex::new(CostTracker::new()));
    command_registry.register(cost_command(cost_tracker.clone()));



    let (input_tx, mut input_rx) = mpsc::channel::<String>(32);
     let (event_tx, event_rx) = mpsc::channel::<StreamEvent>(256);

     let command_names: Vec<String> = command_registry.names().into_iter().map(|s| s.to_string()).collect();

      let query_handle = tokio::spawn(async move {
         while let Some(input) = input_rx.recv().await {
             if input.starts_with('/') {
                 if input == "/quit" || input == "/exit" {
                     let _ = event_tx.send(StreamEvent::MessageEnd {
                         message: claudette_rs::types::event::AssistantMessage {
                             content: vec![],
                             usage: claudette_rs::types::event::Usage::default(),
                         },
                     }).await;
                     break;
                 }

                 if let Some(cmd) = command_registry.find(&input) {
                     let args = input.trim_start_matches('/').split_once(' ').map(|(_, a)| a).unwrap_or("");
                     match cmd.handler.execute(args).await {
                         Ok(result) => {
                             if result == "CLEAR_SESSION" {
                                 let _ = event_tx.send(StreamEvent::ClearScreen).await;
                                 let _ = event_tx.send(StreamEvent::TextDelta {
                                     delta: "\n\n[Session cleared]".to_string(),
                                 }).await;
                             } else {
                                 let _ = event_tx.send(StreamEvent::TextDelta {
                                     delta: format!("\n\n{result}"),
                                 }).await;
                             }
                             let _ = event_tx.send(StreamEvent::MessageEnd {
                                 message: claudette_rs::types::event::AssistantMessage {
                                     content: vec![],
                                     usage: claudette_rs::types::event::Usage::default(),
                                 },
                             }).await;
                         }
                         Err(e) => {
                             let _ = event_tx.send(StreamEvent::Error {
                                 message: e.to_string(),
                                 retryable: false,
                             }).await;
                         }
                     }
                     continue;
                 }
             }

              let tx = event_tx.clone();

             tokio::spawn(async move {
                let demo_responses = [
                    ("👋 Hi! I'm Claudette running in demo mode.", 200),
                    ("", 100),
                    ("I can't make real API calls without a key, but I can show you the TUI and tools.", 300),
                    ("", 100),
                    ("Try these tools:", 150),
                    ("  • Bash — run shell commands", 100),
                    ("  • Read/Write/Edit — file operations", 100),
                    ("  • Glob/Grep — search files", 100),
                    ("  • TodoWrite — track tasks", 100),
                    ("  • WebFetch/WebSearch — web access", 100),
                    ("", 100),
                    ("Type /help for commands, or /quit to exit.", 200),
                ];

                for (text, delay) in demo_responses {
                    tokio::time::sleep(std::time::Duration::from_millis(delay)).await;
                    if !text.is_empty() {
                        let _ = tx.send(StreamEvent::TextDelta { delta: text.to_string() }).await;
                    }
                }

                let _ = tx.send(StreamEvent::MessageEnd {
                    message: claudette_rs::types::event::AssistantMessage {
                        content: vec![],
                        usage: claudette_rs::types::event::Usage::default(),
                    },
                }).await;
            });
        }
    });

    let app = App::new(Some(command_names.clone()));
    run_tui(app, event_rx, input_tx).await?;

    query_handle.abort();

    Ok(())
}
