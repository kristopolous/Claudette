use crate::types::{Tool, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use serde_json::json;
use tokio::fs;

/// Guess a syntax highlighting language from file extension.
fn guess_language_from_path(path: &std::path::Path) -> &'static str {
    match path.extension().and_then(|s| s.to_str()) {
        Some("rs") => "rust",
        Some("js") => "javascript",
        Some("ts") => "typescript",
        Some("py") => "python",
        Some("sh") | Some("zsh") => "bash",
        Some("html") => "html",
        Some("css") => "css",
        Some("scss") => "scss",
        Some("json") => "json",
        Some("md") => "markdown",
        Some("yaml") | Some("yml") => "yaml",
        Some("toml") => "toml",
        Some("xml") => "xml",
        Some("sql") => "sql",
        Some("java") => "java",
        Some("go") => "go",
        Some("c") => "c",
        Some("cpp") | Some("cc") | Some("cxx") => "cpp",
        Some("h") => "c",
        Some("hpp") => "cpp",
        Some("rb") => "ruby",
        Some("php") => "php",
        Some("swift") => "swift",
        Some("kt") => "kotlin",
        _ => "",
    }
}

pub struct WriteTool;

#[async_trait]
impl Tool for WriteTool {
    fn name(&self) -> &str {
        "Write"
    }

    fn description(&self) -> &str {
        "Writes a file to the local filesystem. Creates the file if it doesn't exist, overwrites if it does."
    }

    fn input_schema(&self) -> serde_json::Value {
        json!({
            "type": "object",
            "properties": {
                "file_path": {
                    "type": "string",
                    "description": "The absolute path to the file to write"
                },
                "content": {
                    "type": "string",
                    "description": "The content to write to the file"
                }
            },
            "required": ["file_path", "content"]
        })
    }

    fn is_destructive(&self) -> bool {
        true
    }

    async fn execute(&self, input: serde_json::Value, _ctx: &ToolUseContext<'_>) -> Result<ToolResult> {
        let file_path = input["file_path"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'file_path' field"))?;

        let content = input["content"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'content' field"))?;

        let path = std::path::Path::new(file_path);

        // Create parent directories if needed
        if let Some(parent) = path.parent() {
            fs::create_dir_all(parent).await?;
        }

        match fs::write(path, content).await {
            Ok(()) => {
                let lang = guess_language_from_path(path);
                let mut result = format!("Successfully wrote to `{}`\n", file_path);
                // Include the file content in a fenced code block for display
                if !content.is_empty() {
                    if lang.is_empty() {
                        result.push_str(&format!("```\n{}\n```", content));
                    } else {
                        result.push_str(&format!("```{}\n{}\n```", lang, content));
                    }
                }
                Ok(ToolResult::success(result))
            }
            Err(e) => Ok(ToolResult::error(format!("Failed to write file: {e}"))),
        }
    }
}
