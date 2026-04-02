use crate::types::{Tool, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use reqwest::Client;
use serde_json::json;

pub struct WebSearchTool {
    client: Client,
}

impl WebSearchTool {
    pub fn new() -> Self {
        Self {
            client: Client::builder()
                .timeout(std::time::Duration::from_secs(30))
                .build()
                .expect("Failed to create HTTP client"),
        }
    }
}

impl Default for WebSearchTool {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl Tool for WebSearchTool {
    fn name(&self) -> &str {
        "WebSearch"
    }

    fn description(&self) -> &str {
        "Searches the web for information. Returns relevant results for the given query."
    }

    fn input_schema(&self) -> serde_json::Value {
        json!({
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "The search query"
                }
            },
            "required": ["query"]
        })
    }

    async fn execute(&self, input: serde_json::Value, _ctx: &ToolUseContext<'_>) -> Result<ToolResult> {
        let query = input["query"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'query' field"))?;

        // Use a simple web search via fetching a search engine results page
        // In a real implementation, you'd use a proper search API
        let url = format!("https://html.duckduckgo.com/html/?q={}", urlencoding::encode(query));

        match self.client.get(&url).send().await {
            Ok(resp) => {
                let body = resp.text().await.unwrap_or_default();
                // Extract result snippets (simplified)
                let results: Vec<String> = body
                    .split("result__snippet")
                    .skip(1)
                    .take(5)
                    .filter_map(|chunk| {
                        let start = chunk.find('>')?;
                        let end = chunk.find("</a>")?;
                        if start < end {
                            Some(chunk[start + 1..end].trim().to_string())
                        } else {
                            None
                        }
                    })
                    .collect();

                if results.is_empty() {
                    Ok(ToolResult::success(format!("No results found for: {query}")))
                } else {
                    let result = results
                        .iter()
                        .enumerate()
                        .map(|(i, r)| format!("{i}: {r}"))
                        .collect::<Vec<_>>()
                        .join("\n\n");
                    Ok(ToolResult::success(result))
                }
            }
            Err(e) => Ok(ToolResult::error(format!("Search failed: {e}"))),
        }
    }
}
