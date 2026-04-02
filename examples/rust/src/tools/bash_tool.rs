use crate::types::{Tool, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use serde_json::json;
use std::process::Stdio;
use tokio::process::Command;

pub struct BashTool {
    pub allowed_directories: Vec<String>,
}

impl BashTool {
    pub fn new() -> Self {
        Self {
            allowed_directories: vec![],
        }
    }
}

impl Default for BashTool {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl Tool for BashTool {
    fn name(&self) -> &str {
        "Bash"
    }

    fn description(&self) -> &str {
        "Executes a given bash command in a persistent shell session. Use this for running shell commands, git operations, package management, etc."
    }

    fn input_schema(&self) -> serde_json::Value {
        json!({
            "type": "object",
            "properties": {
                "command": {
                    "type": "string",
                    "description": "The bash command to execute"
                },
                "timeout": {
                    "type": "integer",
                    "description": "Optional timeout in milliseconds (max 120000)"
                }
            },
            "required": ["command"]
        })
    }

    fn is_destructive(&self) -> bool {
        true
    }

    async fn execute(&self, input: serde_json::Value, ctx: &ToolUseContext<'_>) -> Result<ToolResult> {
        let command = input["command"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'command' field"))?;

        let timeout_ms = input["timeout"].as_u64().unwrap_or(120000);

        if ctx.abort_signal.is_cancelled() {
            return Ok(ToolResult::error("Command execution was cancelled"));
        }

        let output = Command::new("bash")
            .arg("-c")
            .arg(command)
            .current_dir(&ctx.cwd)
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .output()
            .await;

        match output {
            Ok(output) => {
                let stdout = String::from_utf8_lossy(&output.stdout);
                let stderr = String::from_utf8_lossy(&output.stderr);
                let mut result = String::new();

                if !stdout.is_empty() {
                    result.push_str(&stdout);
                }
                if !stderr.is_empty() {
                    if !result.is_empty() {
                        result.push_str("\n--- stderr ---\n");
                    }
                    result.push_str(&stderr);
                }
                if result.is_empty() {
                    result.push_str("(empty output)");
                }

                result.push_str(&format!("\n\n[Exit code: {}]", output.status.code().unwrap_or(-1)));

                // Truncate if too large
                let max_size = ctx.max_result_size;
                if result.len() > max_size {
                    result = result[..max_size].to_string();
                    result.push_str("\n\n... [output truncated]");
                }

                Ok(ToolResult::success(result))
            }
            Err(e) => Ok(ToolResult::error(format!("Failed to execute command: {e}"))),
        }
    }
}
