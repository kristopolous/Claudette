use crate::types::{Tool, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use serde_json::json;

pub struct GlobTool;

#[async_trait]
impl Tool for GlobTool {
    fn name(&self) -> &str {
        "Glob"
    }

    fn description(&self) -> &str {
        "Finds files matching a glob pattern. Supports ** for recursive matching."
    }

    fn input_schema(&self) -> serde_json::Value {
        json!({
            "type": "object",
            "properties": {
                "pattern": {
                    "type": "string",
                    "description": "The glob pattern to match (e.g., '**/*.rs', 'src/**/*.ts')"
                },
                "path": {
                    "type": "string",
                    "description": "The directory to search in (defaults to current working directory)"
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
            .map(|p| std::path::PathBuf::from(p))
            .unwrap_or_else(|| ctx.cwd.clone());

        let glob_pattern = format!("{}/{}", search_path.display(), pattern);
        let mut matches: Vec<String> = Vec::new();

        for entry in glob::glob(&glob_pattern)? {
            match entry {
                Ok(path) => {
                    if let Ok(rel) = path.strip_prefix(&ctx.cwd) {
                        matches.push(rel.display().to_string());
                    } else {
                        matches.push(path.display().to_string());
                    }
                }
                Err(e) => eprintln!("Glob error: {e}"),
            }
        }

        if matches.is_empty() {
            Ok(ToolResult::success("No files matched the pattern"))
        } else {
            matches.sort();
            let result = matches.join("\n");
            Ok(ToolResult::success(result))
        }
    }
}
