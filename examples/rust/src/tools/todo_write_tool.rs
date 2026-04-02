use crate::types::{Tool, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use serde_json::json;

pub struct TodoWriteTool;

#[async_trait]
impl Tool for TodoWriteTool {
    fn name(&self) -> &str {
        "TodoWrite"
    }

    fn description(&self) -> &str {
        "Creates, updates, and manages todo items. Use this to track progress on multi-step tasks."
    }

    fn input_schema(&self) -> serde_json::Value {
        json!({
            "type": "object",
            "properties": {
                "todos": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "content": { "type": "string" },
                            "status": { "type": "string", "enum": ["pending", "in_progress", "completed", "cancelled"] },
                            "priority": { "type": "string", "enum": ["high", "medium", "low"] }
                        },
                        "required": ["content", "status"]
                    },
                    "description": "The complete updated todo list"
                }
            },
            "required": ["todos"]
        })
    }

    async fn execute(&self, input: serde_json::Value, _ctx: &ToolUseContext<'_>) -> Result<ToolResult> {
        let todos = input["todos"]
            .as_array()
            .ok_or_else(|| anyhow::anyhow!("Missing or invalid 'todos' field"))?;

        let mut result = String::from("Todo list updated:\n");
        for (i, todo) in todos.iter().enumerate() {
            let content = todo["content"].as_str().unwrap_or("?");
            let status = todo["status"].as_str().unwrap_or("pending");
            let icon = match status {
                "completed" => "✓",
                "in_progress" => "⟳",
                "cancelled" => "✗",
                _ => "○",
            };
            result.push_str(&format!("{icon} {i}: {content} [{status}]\n"));
        }

        Ok(ToolResult::success(result))
    }
}
