use crate::types::{Tool, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use regex::Regex;
use serde_json::json;
use std::path::Path;
use tokio::fs;
use walkdir::WalkDir;

pub struct GrepTool;

#[async_trait]
impl Tool for GrepTool {
    fn name(&self) -> &str {
        "Grep"
    }

    fn description(&self) -> &str {
        "Searches file contents using regular expressions. Searches recursively by default."
    }

    fn input_schema(&self) -> serde_json::Value {
        json!({
            "type": "object",
            "properties": {
                "pattern": {
                    "type": "string",
                    "description": "The regex pattern to search for"
                },
                "path": {
                    "type": "string",
                    "description": "The directory or file to search in (defaults to current working directory)"
                },
                "include": {
                    "type": "string",
                    "description": "File pattern to include (e.g., '*.rs', '*.ts')"
                }
            },
            "required": ["pattern"]
        })
    }

    fn is_read_only(&self) -> bool {
        true
    }

    async fn execute(&self, input: serde_json::Value, ctx: &ToolUseContext<'_>) -> Result<ToolResult> {
        let pattern = input["pattern"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'pattern' field"))?;

        let search_path = input["path"]
            .as_str()
            .map(|p| p.to_string())
            .unwrap_or_else(|| ctx.cwd.display().to_string());

        let include = input["include"].as_str();

        let re = match Regex::new(pattern) {
            Ok(re) => re,
            Err(e) => return Ok(ToolResult::error(format!("Invalid regex pattern: {e}"))),
        };

        let path = Path::new(&search_path);
        let mut results: Vec<String> = Vec::new();
        let max_results = 100;

        if path.is_file() {
            if let Ok(content) = fs::read_to_string(path).await {
                for (i, line) in content.lines().enumerate() {
                    if re.is_match(line) {
                        results.push(format!("{}: {}", i + 1, line));
                        if results.len() >= max_results {
                            break;
                        }
                    }
                }
            }
        } else if path.is_dir() {
            for entry in WalkDir::new(path)
                .into_iter()
                .filter_map(|e| e.ok())
                .filter(|e| e.file_type().is_file())
            {
                if let Some(include) = include {
                    if let Some(ext) = entry.path().extension() {
                        let include_ext = include.trim_start_matches("*.");
                        if ext != include_ext {
                            continue;
                        }
                    } else {
                        continue;
                    }
                }

                if let Ok(content) = fs::read_to_string(entry.path()).await {
                    for (i, line) in content.lines().enumerate() {
                        if re.is_match(line) {
                            let rel_path = entry
                                .path()
                                .strip_prefix(&ctx.cwd)
                                .unwrap_or_else(|_| entry.path());
                            results.push(format!("{}: {}: {}", rel_path.display(), i + 1, line));
                            if results.len() >= max_results {
                                break;
                            }
                        }
                    }
                }
                if results.len() >= max_results {
                    break;
                }
            }
        }

        if results.is_empty() {
            Ok(ToolResult::success("No matches found"))
        } else {
            let mut result = results.join("\n");
            if results.len() >= max_results {
                result.push_str(&format!("\n\n... (truncated, showing first {max_results} matches)"));
            }
            Ok(ToolResult::success(result))
        }
    }
}
