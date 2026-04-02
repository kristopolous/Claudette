use crate::types::{Tool, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use serde_json::json;
use tokio::fs;

pub struct ReadTool;

#[async_trait]
impl Tool for ReadTool {
    fn name(&self) -> &str {
        "Read"
    }

    fn description(&self) -> &str {
        "Reads a file from the local filesystem. Supports text files, source code, config files, etc."
    }

    fn input_schema(&self) -> serde_json::Value {
        json!({
            "type": "object",
            "properties": {
                "file_path": {
                    "type": "string",
                    "description": "The absolute path to the file to read"
                },
                "offset": {
                    "type": "integer",
                    "description": "The line number to start reading from (1-indexed)"
                },
                "limit": {
                    "type": "integer",
                    "description": "The maximum number of lines to read"
                }
            },
            "required": ["file_path"]
        })
    }

    fn is_read_only(&self) -> bool {
        true
    }

    async fn execute(&self, input: serde_json::Value, _ctx: &ToolUseContext<'_>) -> Result<ToolResult> {
        let file_path = input["file_path"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'file_path' field"))?;

        let offset = input["offset"].as_u64().unwrap_or(1) as usize;
        let limit = input["limit"].as_u64().unwrap_or(2000) as usize;

        let path = std::path::Path::new(file_path);
        if !path.exists() {
            return Ok(ToolResult::error(format!("File not found: {file_path}")));
        }

        match fs::read_to_string(path).await {
            Ok(content) => {
                let lines: Vec<&str> = content.lines().collect();
                let start = (offset - 1).min(lines.len());
                let end = (start + limit).min(lines.len());
                let excerpt = &lines[start..end];

                let mut result = String::new();
                for (i, line) in excerpt.iter().enumerate() {
                    result.push_str(&format!("{}: {}\n", start + i + 1, line));
                }

                if lines.len() > end {
                    result.push_str(&format!("\n... ({} more lines)", lines.len() - end));
                }

                Ok(ToolResult::success(result))
            }
            Err(e) => Ok(ToolResult::error(format!("Failed to read file: {e}"))),
        }
    }
}
