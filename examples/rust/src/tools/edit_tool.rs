use crate::types::{Tool, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use serde_json::json;
use tokio::fs;

fn guess_language_from_path(path: &std::path::Path) -> &'static str {
    match path.extension().and_then(|s| s.to_str()) {
        Some("rs") => "rust",
        Some("js") => "javascript",
        Some("ts") => "typescript",
        Some("py") => "python",
        Some("sh") => "bash",
        Some("zsh") => "bash",
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

pub struct EditTool;

#[async_trait]
impl Tool for EditTool {
    fn name(&self) -> &str {
        "Edit"
    }

    fn description(&self) -> &str {
        "Performs a search-and-replace edit on a file. Finds the old_string and replaces it with new_string."
    }

    fn input_schema(&self) -> serde_json::Value {
        json!({
            "type": "object",
            "properties": {
                "file_path": {
                    "type": "string",
                    "description": "The absolute path to the file to edit"
                },
                "old_string": {
                    "type": "string",
                    "description": "The text to find and replace"
                },
                "new_string": {
                    "type": "string",
                    "description": "The text to replace it with"
                }
            },
            "required": ["file_path", "old_string", "new_string"]
        })
    }

    fn is_destructive(&self) -> bool {
        true
    }

    async fn execute(&self, input: serde_json::Value, _ctx: &ToolUseContext<'_>) -> Result<ToolResult> {
        let file_path = input["file_path"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'file_path' field"))?;

        let old_string = input["old_string"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'old_string' field"))?;

        let new_string = input["new_string"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'new_string' field"))?;

        let path = std::path::Path::new(file_path);
        if !path.exists() {
            return Ok(ToolResult::error(format!("File not found: {file_path}")));
        }

        let content = fs::read_to_string(path).await?;

        // Find first occurrence
        let Some(pos) = content.find(old_string) else {
            return Ok(ToolResult::error(format!(
                "Could not find the specified text in {file_path}"
            )));
        };

        let new_content = format!(
            "{}{}{}",
            &content[..pos],
            new_string,
            &content[pos + old_string.len()..]
        );

        fs::write(path, &new_content).await?;

        // Generate a diff-like summary plus the new content
        let old_lines: Vec<&str> = old_string.lines().collect();
        let new_lines: Vec<&str> = new_string.lines().collect();
        let mut result = format!("Successfully edited {file_path}\n");
        result.push_str(&format!(
            "Replaced {} line(s) with {} line(s)\n",
            old_lines.len(),
            new_lines.len()
        ));

        // Include the new file content in a fenced code block
        let lang = guess_language_from_path(path);
        if !new_content.is_empty() {
            if lang.is_empty() {
                result.push_str(&format!("```\n{}\n```", new_content));
            } else {
                result.push_str(&format!("```{}\n{}\n```", lang, new_content));
            }
        }

        Ok(ToolResult::success(result))
    }
}
