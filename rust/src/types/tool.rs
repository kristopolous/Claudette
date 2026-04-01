use crate::types::permission::PermissionContext;
use crate::types::message::Message;
use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct ToolDefinition {
    pub name: String,
    pub description: String,
    pub input_schema: serde_json::Value,
    pub aliases: Vec<String>,
    pub is_read_only: bool,
    pub is_destructive: bool,
}

#[async_trait::async_trait]
pub trait Tool: Send + Sync {
    fn name(&self) -> &str;
    fn description(&self) -> &str;
    fn input_schema(&self) -> serde_json::Value;

    async fn execute(
        &self,
        input: serde_json::Value,
        ctx: &ToolUseContext<'_>,
    ) -> anyhow::Result<ToolResult>;

    fn is_read_only(&self) -> bool {
        false
    }

    fn is_destructive(&self) -> bool {
        false
    }

    fn aliases(&self) -> &[String] {
        &[]
    }

    fn to_definition(&self) -> ToolDefinition {
        ToolDefinition {
            name: self.name().to_string(),
            description: self.description().to_string(),
            input_schema: self.input_schema(),
            aliases: self.aliases().to_vec(),
            is_read_only: self.is_read_only(),
            is_destructive: self.is_destructive(),
        }
    }
}

pub struct ToolRegistry {
    tools: HashMap<String, Box<dyn Tool>>,
}

impl ToolRegistry {
    pub fn new() -> Self {
        Self {
            tools: HashMap::new(),
        }
    }

    pub fn register(&mut self, tool: Box<dyn Tool>) {
        let name = tool.name().to_string();
        let aliases: Vec<String> = tool.aliases().to_vec();
        self.tools.insert(name, tool);
        for alias in aliases {
            // Aliases are tracked but resolved through the primary name lookup
            let _ = alias;
        }
    }

    pub fn get(&self, name: &str) -> Option<&dyn Tool> {
        self.tools.get(name).map(|t| t.as_ref())
    }

    pub fn get_mut(&mut self, name: &str) -> Option<&mut Box<dyn Tool>> {
        self.tools.get_mut(name)
    }

    pub fn names(&self) -> Vec<&str> {
        self.tools.keys().map(|s| s.as_str()).collect()
    }

    pub fn definitions(&self) -> Vec<ToolDefinition> {
        self.tools.values().map(|t| t.to_definition()).collect()
    }

    pub fn api_tools(&self) -> Vec<serde_json::Value> {
        self.tools
            .values()
            .map(|t| {
                serde_json::json!({
                    "name": t.name(),
                    "description": t.description(),
                    "input_schema": t.input_schema(),
                })
            })
            .collect()
    }
}

impl Default for ToolRegistry {
    fn default() -> Self {
        Self::new()
    }
}

pub struct ToolUseContext<'a> {
    pub cwd: std::path::PathBuf,
    pub abort_signal: tokio_util::sync::CancellationToken,
    pub tools: &'a ToolRegistry,
    pub permission_ctx: &'a PermissionContext,
    pub messages: &'a Vec<Message>,
    pub max_result_size: usize,
}

#[derive(Debug, Clone)]
pub struct ToolResult {
    pub content: String,
    pub is_error: bool,
}

impl ToolResult {
    pub fn success(content: impl Into<String>) -> Self {
        Self {
            content: content.into(),
            is_error: false,
        }
    }

    pub fn error(content: impl Into<String>) -> Self {
        Self {
            content: content.into(),
            is_error: true,
        }
    }
}
