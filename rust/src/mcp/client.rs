use crate::mcp::protocol::{
    CallToolParams, CallToolResult, ClientCapabilities, ClientInfo, InitializeParams,
    InitializeResult, JsonRpcMessage, JsonRpcRequest, McpTool, ToolListResult,
};
use crate::mcp::transport::{McpTransport, StdioTransport};
use crate::types::{Tool, ToolDefinition, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use serde_json::json;
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::Mutex;

pub struct McpClient {
    transport: Arc<Mutex<StdioTransport>>,
    server_name: String,
    initialized: bool,
    tools: Vec<McpTool>,
}

impl McpClient {
    pub async fn new(command: String, args: Vec<String>, env: Option<Vec<(String, String)>>) -> Result<Self> {
        let args_refs: Vec<&str> = args.iter().map(|s| s.as_str()).collect();
        let transport = StdioTransport::new(&command, &args_refs, env).await?;

        Ok(Self {
            transport: Arc::new(Mutex::new(transport)),
            server_name: command.clone(),
            initialized: false,
            tools: Vec::new(),
        })
    }

    pub async fn initialize(&mut self) -> Result<InitializeResult> {
        let mut transport = self.transport.lock().await;

        let params = InitializeParams {
            protocol_version: "2024-11-05".to_string(),
            capabilities: ClientCapabilities { roots: None },
            client_info: ClientInfo {
                name: "claudette-rs".to_string(),
                version: env!("CARGO_PKG_VERSION").to_string(),
            },
        };

        let response = transport
            .send_request("initialize", serde_json::to_value(&params)?)
            .await?;

        let result: InitializeResult = serde_json::from_value(
            response.result.ok_or_else(|| anyhow::anyhow!("No result in initialize response"))?,
        )?;

        // Send initialized notification
        let notification = JsonRpcMessage::Notification(crate::mcp::protocol::JsonRpcNotification {
            jsonrpc: "2.0".to_string(),
            method: "notifications/initialized".to_string(),
            params: json!({}),
        });
        transport.send(notification).await?;

        self.initialized = true;
        Ok(result)
    }

    pub async fn list_tools(&mut self) -> Result<Vec<McpTool>> {
        let mut transport = self.transport.lock().await;

        let response = transport.send_request("tools/list", json!({})).await?;
        let result: ToolListResult = serde_json::from_value(
            response.result.ok_or_else(|| anyhow::anyhow!("No result in tools/list response"))?,
        )?;

        self.tools = result.tools.clone();
        Ok(result.tools)
    }

    pub async fn call_tool(&self, name: &str, arguments: Option<serde_json::Value>) -> Result<CallToolResult> {
        let mut transport = self.transport.lock().await;

        let params = CallToolParams {
            name: name.to_string(),
            arguments,
        };

        let response = transport.send_request("tools/call", serde_json::to_value(&params)?).await?;
        let result: CallToolResult = serde_json::from_value(
            response.result.ok_or_else(|| anyhow::anyhow!("No result in tools/call response"))?,
        )?;

        Ok(result)
    }

    pub fn server_name(&self) -> &str {
        &self.server_name
    }

    pub fn tools(&self) -> &[McpTool] {
        &self.tools
    }

    pub fn is_initialized(&self) -> bool {
        self.initialized
    }

    pub async fn shutdown(&mut self) -> Result<()> {
        let mut transport = self.transport.lock().await;
        transport.close().await
    }
}

// Wrapper that implements the Tool trait for MCP tools
pub struct McpToolWrapper {
    pub server_name: String,
    pub mcp_tool: McpTool,
    client: Arc<Mutex<McpClient>>,
}

impl McpToolWrapper {
    pub fn new(server_name: String, mcp_tool: McpTool, client: Arc<Mutex<McpClient>>) -> Self {
        Self {
            server_name,
            mcp_tool,
            client,
        }
    }
}

#[async_trait]
impl Tool for McpToolWrapper {
    fn name(&self) -> &str {
        &self.mcp_tool.name
    }

    fn description(&self) -> &str {
        self.mcp_tool.description.as_deref().unwrap_or("")
    }

    fn input_schema(&self) -> serde_json::Value {
        self.mcp_tool.input_schema.clone()
    }

    async fn execute(&self, input: serde_json::Value, _ctx: &ToolUseContext<'_>) -> Result<ToolResult> {
        let client = self.client.lock().await;
        let result = client.call_tool(&self.mcp_tool.name, Some(input)).await?;

        let mut output = String::new();
        let mut is_error = result.is_error.unwrap_or(false);

        for content in &result.content {
            match content {
                crate::mcp::protocol::ToolResultContent::Text { text } => {
                    output.push_str(text);
                    output.push('\n');
                }
                crate::mcp::protocol::ToolResultContent::Image { data, mime_type } => {
                    output.push_str(&format!("[Image: {mime_type}, {} bytes]\n", data.len()));
                }
                crate::mcp::protocol::ToolResultContent::Resource { resource } => {
                    if let Some(text) = &resource.text {
                        output.push_str(text);
                        output.push('\n');
                    } else if let Some(blob) = &resource.blob {
                        output.push_str(&format!("[Resource blob: {} bytes]\n", blob.len()));
                    }
                }
            }
        }

        if output.is_empty() {
            output.push_str("(empty response)");
        }

        Ok(ToolResult {
            content: output.trim().to_string(),
            is_error,
        })
    }
}

pub struct McpManager {
    clients: HashMap<String, Arc<Mutex<McpClient>>>,
}

impl McpManager {
    pub fn new() -> Self {
        Self {
            clients: HashMap::new(),
        }
    }

    pub async fn add_server(&mut self, name: String, command: String, args: Vec<String>) -> Result<()> {
        let client = McpClient::new(command, args, None).await?;
        self.clients.insert(name, Arc::new(Mutex::new(client)));
        Ok(())
    }

    pub async fn initialize_all(&mut self) -> Result<Vec<String>> {
        let mut initialized = Vec::new();

        for (name, client) in &self.clients {
            let mut c = client.lock().await;
            if !c.is_initialized() {
                match c.initialize().await {
                    Ok(_) => {
                        c.list_tools().await?;
                        initialized.push(name.clone());
                    }
                    Err(e) => eprintln!("Failed to initialize MCP server {name}: {e}"),
                }
            }
        }

        Ok(initialized)
    }

    pub fn get_clients(&self) -> &HashMap<String, Arc<Mutex<McpClient>>> {
        &self.clients
    }
}

impl Default for McpManager {
    fn default() -> Self {
        Self::new()
    }
}
