use anyhow::Result;
use clap::Parser;
use claudette_rs::api::{AnthropicClient, ApiConfig, QueryEngine};
use claudette_rs::commands::{clear_command, cost_command, help_command, model_command};
use claudette_rs::context::{format_claude_md_context, get_git_status, format_git_context};
use claudette_rs::tools::{BashTool, EditTool, GlobTool, GrepTool, ReadTool, TodoWriteTool, WebFetchTool, WebSearchTool, WriteTool};
use claudette_rs::tui::{App, run_tui};
use claudette_rs::types::{Command as SlashCommand, CommandRegistry, Message, PermissionContext, ToolRegistry, CostTracker, StreamEvent};
use parking_lot::Mutex;
use std::sync::Arc;
use tokio::sync::mpsc;

#[derive(Parser, Debug)]
#[command(name = "claudette")]
#[command(about = "A terminal-based AI coding agent")]
#[command(version)]
struct Cli {
    /// Working directory
    #[arg(short, long, default_value = ".")]
    cwd: String,

    /// Model to use
    #[arg(short, long, default_value = "claude-sonnet-4-20250514")]
    model: String,

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
    version: bool,
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();

    if cli.version {
        println!("claudette-rs {}", env!("CARGO_PKG_VERSION"));
        return Ok(());
    }

    // Initialize tracing
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| tracing_subscriber::EnvFilter::new("warn")),
        )
        .init();

    let cwd = std::env::current_dir()?;

    // Check for API key
    let api_key = std::env::var("ANTHROPIC_API_KEY")
        .map_err(|_| anyhow::anyhow!("ANTHROPIC_API_KEY environment variable not set"))?;

    // Build system prompt
    let mut system_prompt = build_system_prompt(&cwd).await;

    // Create tool registry
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

    // Create command registry
    let mut command_registry = CommandRegistry::new();
    let tool_names: Vec<String> = tool_registry.names().into_iter().map(|s| s.to_string()).collect();
    command_registry.register(help_command(tool_names.clone()));
    command_registry.register(clear_command());
    command_registry.register(model_command(cli.model.clone()));

    let cost_tracker = Arc::new(Mutex::new(CostTracker::new()));
    command_registry.register(cost_command(cost_tracker.clone()));

    // Create API client
    let config = ApiConfig {
        api_key,
        model: cli.model.clone(),
        max_tokens: cli.max_tokens,
        ..Default::default()
    };
    let client = AnthropicClient::new(config);

    // Create query engine
    let mut query_engine = QueryEngine::new(
        tool_registry,
        system_prompt.clone(),
        client,
        cli.max_turns,
    );

    // Create channels for TUI <-> query engine communication
    let (input_tx, mut input_rx) = mpsc::channel::<String>(32);
    let (event_tx, event_rx) = mpsc::channel::<StreamEvent>(256);

    // Spawn query engine task
    let cost_tracker_clone = cost_tracker.clone();
    let query_handle = tokio::spawn(async move {
        while let Some(input) = input_rx.recv().await {
            // Check for commands
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
                                // Signal to clear
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

            // Normal message - send to query engine
            let msg = Message::user_text(&input);
            let tx = event_tx.clone();
            let tracker = cost_tracker_clone.clone();

            match query_engine.submit_message(msg, move |event| {
                let tx = tx.clone();
                let tracker = tracker.clone();

                // Track usage
                if let StreamEvent::MessageEnd { message } = &event {
                    let mut t = tracker.lock();
                    t.add_usage("claude-sonnet-4-20250514", &message.usage);
                }

                tokio::spawn(async move {
                    let _ = tx.send(event).await;
                });
            }).await {
                Ok(()) => {},
                Err(e) => {
                    let _ = event_tx.send(StreamEvent::Error {
                        message: e.to_string(),
                        retryable: true,
                    }).await;
                }
            }
        }
    });

    // Create and run TUI
    let app = App::new();
    run_tui(app, event_rx, input_tx).await?;

    // Wait for query engine to finish
    query_handle.abort();

    Ok(())
}

async fn build_system_prompt(cwd: &std::path::Path) -> String {
    let mut prompt = String::from("You are Claudette, a highly skilled software engineer AI. You help users with coding tasks including writing, debugging, refactoring, and understanding code.\n\n");

    // Add current date
    let now = chrono::Utc::now();
    prompt.push_str(&format!("Current date: {}\n\n", now.format("%Y-%m-%d")));

    // Add git context
    if let Ok(Some(status)) = get_git_status(cwd) {
        let git_ctx = format_git_context(&status);
        if !git_ctx.is_empty() {
            prompt.push_str("## Git Status\n");
            prompt.push_str(&git_ctx);
            prompt.push_str("\n\n");
        }
    }

    // Add CLAUDE.md context
    if let Ok(ctx) = format_claude_md_context(cwd).await {
        if !ctx.is_empty() {
            prompt.push_str(&ctx);
        }
    }

    prompt.push_str("\n## Available Tools\n");
    prompt.push_str("- Bash: Execute shell commands\n");
    prompt.push_str("- Read: Read file contents\n");
    prompt.push_str("- Write: Write file contents\n");
    prompt.push_str("- Edit: Search-replace in files\n");
    prompt.push_str("- Glob: Find files by pattern\n");
    prompt.push_str("- Grep: Search file contents with regex\n");
    prompt.push_str("- TodoWrite: Manage todo items\n");
    prompt.push_str("- WebFetch: Fetch URL content\n");
    prompt.push_str("- WebSearch: Search the web\n");

    prompt
}
