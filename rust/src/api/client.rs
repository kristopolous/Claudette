use crate::types::{Message, ToolDefinition, Usage};
use anyhow::Result;
use reqwest::Client;
use reqwest_eventsource::{Event, EventSource};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tokio_util::sync::CancellationToken;
use tracing::{debug, error, info};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AnthropicRequest {
    pub model: String,
    pub max_tokens: u64,
    pub messages: Vec<Message>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub system: Option<String>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    pub tools: Vec<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub temperature: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub stream: Option<bool>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct AnthropicResponse {
    pub id: String,
    #[serde(rename = "type")]
    pub response_type: String,
    pub role: String,
    pub content: Vec<serde_json::Value>,
    pub model: String,
    #[serde(default)]
    pub stop_reason: Option<String>,
    #[serde(default)]
    pub usage: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct StreamEvent {
    #[serde(rename = "type")]
    pub event_type: String,
    #[serde(default)]
    pub index: Option<usize>,
    #[serde(default)]
    pub delta: Option<serde_json::Value>,
    #[serde(default)]
    pub content_block: Option<serde_json::Value>,
    #[serde(default)]
    pub message: Option<serde_json::Value>,
    #[serde(default)]
    pub usage: Option<serde_json::Value>,
    #[serde(default)]
    pub error: Option<serde_json::Value>,
}

#[derive(Debug, Clone)]
pub struct ApiConfig {
    pub api_key: String,
    pub model: String,
    pub max_tokens: u64,
    pub base_url: String,
    pub temperature: Option<f64>,
}

impl Default for ApiConfig {
    fn default() -> Self {
        Self {
            api_key: std::env::var("ANTHROPIC_API_KEY").unwrap_or_default(),
            model: "claude-sonnet-4-20250514".to_string(),
            max_tokens: 8192,
            base_url: "https://api.anthropic.com".to_string(),
            temperature: None,
        }
    }
}

pub struct AnthropicClient {
    client: Client,
    config: ApiConfig,
}

impl AnthropicClient {
    pub fn new(config: ApiConfig) -> Self {
        Self {
            client: Client::builder()
                .timeout(std::time::Duration::from_secs(300))
                .build()
                .expect("Failed to create HTTP client"),
            config,
        }
    }

    pub async fn send_message(
        &self,
        messages: Vec<Message>,
        system_prompt: Option<String>,
        tools: Vec<ToolDefinition>,
        cancel_token: CancellationToken,
    ) -> Result<(Vec<serde_json::Value>, Usage)> {
        let api_tools: Vec<serde_json::Value> = tools
            .iter()
            .map(|t| {
                serde_json::json!({
                    "name": t.name,
                    "description": t.description,
                    "input_schema": t.input_schema,
                })
            })
            .collect();

        let request = AnthropicRequest {
            model: self.config.model.clone(),
            max_tokens: self.config.max_tokens,
            messages,
            system: system_prompt,
            tools: api_tools,
            temperature: self.config.temperature,
            stream: Some(false),
        };

        debug!("Sending non-streaming request to Anthropic API");

        let resp = self
            .client
            .post(format!("{}/v1/messages", self.config.base_url))
            .header("x-api-key", &self.config.api_key)
            .header("anthropic-version", "2023-06-01")
            .header("content-type", "application/json")
            .json(&request)
            .send()
            .await?;

        if !resp.status().is_success() {
            let status = resp.status();
            let body = resp.text().await.unwrap_or_default();
            return Err(anyhow::anyhow!("API error {status}: {body}"));
        }

        let body: AnthropicResponse = resp.json().await?;

        let usage = body
            .usage
            .as_ref()
            .map(|u| Usage {
                input_tokens: u["input_tokens"].as_u64().unwrap_or(0),
                output_tokens: u["output_tokens"].as_u64().unwrap_or(0),
                cache_creation_input_tokens: u["cache_creation_input_tokens"].as_u64().unwrap_or(0),
                cache_read_input_tokens: u["cache_read_input_tokens"].as_u64().unwrap_or(0),
            })
            .unwrap_or_default();

        info!("API response: {} tokens in, {} tokens out", usage.input_tokens, usage.output_tokens);

        Ok((body.content, usage))
    }

    pub fn create_stream(
        &self,
        messages: Vec<Message>,
        system_prompt: Option<String>,
        tools: Vec<ToolDefinition>,
    ) -> EventSource {
        let api_tools: Vec<serde_json::Value> = tools
            .iter()
            .map(|t| {
                serde_json::json!({
                    "name": t.name,
                    "description": t.description,
                    "input_schema": t.input_schema,
                })
            })
            .collect();

        let request = AnthropicRequest {
            model: self.config.model.clone(),
            max_tokens: self.config.max_tokens,
            messages,
            system: system_prompt,
            tools: api_tools,
            temperature: self.config.temperature,
            stream: Some(true),
        };

        let builder = self
            .client
            .post(format!("{}/v1/messages", self.config.base_url))
            .header("x-api-key", &self.config.api_key)
            .header("anthropic-version", "2023-06-01")
            .header("content-type", "application/json")
            .header("accept", "text/event-stream")
            .json(&request);

        EventSource::new(builder).expect("Failed to create event source")
    }
}
