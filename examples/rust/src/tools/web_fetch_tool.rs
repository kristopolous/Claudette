use crate::types::{Tool, ToolResult, ToolUseContext};
use anyhow::Result;
use async_trait::async_trait;
use reqwest::Client;
use serde_json::json;

pub struct WebFetchTool {
    client: Client,
}

impl WebFetchTool {
    pub fn new() -> Self {
        Self {
            client: Client::builder()
                .timeout(std::time::Duration::from_secs(30))
                .build()
                .expect("Failed to create HTTP client"),
        }
    }
}

impl Default for WebFetchTool {
    fn default() -> Self {
        Self::new()
    }
}

#[async_trait]
impl Tool for WebFetchTool {
    fn name(&self) -> &str {
        "WebFetch"
    }

    fn description(&self) -> &str {
        "Fetches the content from a specified URL and returns it as text. Use this for reading web pages, API responses, etc."
    }

    fn input_schema(&self) -> serde_json::Value {
        json!({
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "description": "The URL to fetch content from"
                }
            },
            "required": ["url"]
        })
    }

    async fn execute(&self, input: serde_json::Value, _ctx: &ToolUseContext<'_>) -> Result<ToolResult> {
        let url = input["url"]
            .as_str()
            .ok_or_else(|| anyhow::anyhow!("Missing 'url' field"))?;

        match self.client.get(url).send().await {
            Ok(resp) => {
                let status = resp.status();
                let body = resp.text().await.unwrap_or_default();

                if status.is_success() {
                    // Truncate large responses
                    let max_size = 10000;
                    let truncated = if body.len() > max_size {
                        format!("{}... [truncated]", &body[..max_size])
                    } else {
                        body
                    };
                    Ok(ToolResult::success(truncated))
                } else {
                    Ok(ToolResult::error(format!("HTTP {status}: {body}")))
                }
            }
            Err(e) => Ok(ToolResult::error(format!("Failed to fetch URL: {e}"))),
        }
    }
}
