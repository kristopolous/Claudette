use crate::types::{Message as AppMessage, ToolDefinition, Usage};
use anyhow::Result;
use reqwest::Client;
use reqwest_eventsource::EventSource;
use serde::{Deserialize, Serialize};
use tokio_util::sync::CancellationToken;
use tracing::{debug, info};

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum ApiProvider {
    Anthropic,
    OpenAI,
}

#[derive(Debug, Clone)]
pub struct ApiConfig {
    pub api_key: String,
    pub model: String,
    pub max_tokens: u64,
    pub base_url: String,
    pub temperature: Option<f64>,
    pub provider: ApiProvider,
}

impl Default for ApiConfig {
    fn default() -> Self {
        let provider = if std::env::var("OPENAI_API_KEY").is_ok() && std::env::var("ANTHROPIC_API_KEY").is_err() {
            ApiProvider::OpenAI
        } else {
            ApiProvider::Anthropic
        };

        let (api_key, base_url, model) = match provider {
            ApiProvider::Anthropic => (
                std::env::var("ANTHROPIC_API_KEY").unwrap_or_default(),
                "https://api.anthropic.com".to_string(),
                "claude-sonnet-4-20250514".to_string(),
            ),
            ApiProvider::OpenAI => (
                std::env::var("OPENAI_API_KEY").unwrap_or_default(),
                "https://api.openai.com".to_string(),
                "gpt-4o".to_string(),
            ),
        };

        Self {
            api_key,
            model,
            max_tokens: 8192,
            base_url,
            temperature: None,
            provider,
        }
    }
}

// Anthropic request/response types

#[derive(Debug, Clone, Serialize)]
struct AnthropicRequest {
    model: String,
    max_tokens: u64,
    messages: Vec<AnthropicMessage>,
    #[serde(skip_serializing_if = "Option::is_none")]
    system: Option<String>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    tools: Vec<AnthropicTool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    temperature: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    stream: Option<bool>,
}

#[derive(Debug, Clone, Serialize)]
struct AnthropicMessage {
    role: String,
    content: Vec<AnthropicContentBlock>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "type", rename_all = "snake_case")]
enum AnthropicContentBlock {
    Text { text: String },
    ToolUse { id: String, name: String, input: serde_json::Value },
    ToolResult { tool_use_id: String, content: Vec<AnthropicToolResultContent>, is_error: Option<bool> },
}

#[derive(Debug, Clone, Serialize)]
#[serde(tag = "type", rename_all = "snake_case")]
enum AnthropicToolResultContent {
    Text { text: String },
}

#[derive(Debug, Clone, Serialize)]
struct AnthropicTool {
    name: String,
    description: String,
    input_schema: serde_json::Value,
}

#[derive(Debug, Clone, Deserialize)]
struct AnthropicResponse {
    id: String,
    role: String,
    content: Vec<serde_json::Value>,
    model: String,
    #[serde(default)]
    stop_reason: Option<String>,
    #[serde(default)]
    usage: Option<serde_json::Value>,
}

// OpenAI request/response types

#[derive(Debug, Clone, Serialize)]
struct OpenAIRequest {
    model: String,
    messages: Vec<OpenAIMessage>,
    #[serde(skip_serializing_if = "Option::is_none")]
    max_tokens: Option<u64>,
    #[serde(skip_serializing_if = "Vec::is_empty")]
    tools: Vec<OpenAITool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    temperature: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    stream: Option<bool>,
}

#[derive(Debug, Clone, Serialize)]
struct OpenAIMessage {
    role: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    content: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    tool_calls: Option<Vec<OpenAIToolCall>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    tool_call_id: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
struct OpenAITool {
    #[serde(rename = "type")]
    tool_type: String,
    function: OpenAIFunction,
}

#[derive(Debug, Clone, Serialize)]
struct OpenAIFunction {
    name: String,
    description: String,
    parameters: serde_json::Value,
}

#[derive(Debug, Clone, Serialize)]
struct OpenAIToolCall {
    id: String,
    #[serde(rename = "type")]
    call_type: String,
    function: OpenAIFunctionCall,
}

#[derive(Debug, Clone, Serialize)]
struct OpenAIFunctionCall {
    name: String,
    arguments: String,
}

#[derive(Debug, Clone, Deserialize)]
struct OpenAIResponse {
    id: String,
    model: String,
    choices: Vec<OpenAIChoice>,
    #[serde(default)]
    usage: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Deserialize)]
struct OpenAIChoice {
    message: OpenAIResponseMessage,
    #[serde(default)]
    finish_reason: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
struct OpenAIResponseMessage {
    #[serde(default)]
    role: Option<String>,
    #[serde(default)]
    content: Option<String>,
    #[serde(default)]
    reasoning: Option<String>,
    #[serde(default)]
    tool_calls: Option<Vec<OpenAIResponseToolCall>>,
}

#[derive(Debug, Clone, Deserialize)]
struct OpenAIResponseToolCall {
    id: String,
    #[serde(rename = "type")]
    call_type: String,
    function: OpenAIResponseFunctionCall,
}

#[derive(Debug, Clone, Deserialize)]
struct OpenAIResponseFunctionCall {
    name: String,
    arguments: String,
}

// Message conversion helpers

fn app_messages_to_anthropic(messages: &[AppMessage]) -> Vec<AnthropicMessage> {
    messages.iter().map(|msg| match msg {
        AppMessage::User { content } => AnthropicMessage {
            role: "user".to_string(),
            content: content.iter().map(|c| match c {
                crate::types::message::ContentBlock::Text { text } => AnthropicContentBlock::Text { text: text.clone() },
                crate::types::message::ContentBlock::ToolUse { id, name, input } => {
                    AnthropicContentBlock::ToolUse { id: id.clone(), name: name.clone(), input: input.clone() }
                }
                crate::types::message::ContentBlock::ToolResult { tool_use_id, content, is_error } => {
                    AnthropicContentBlock::ToolResult {
                        tool_use_id: tool_use_id.clone(),
                        content: content.iter().filter_map(|c| match c {
                            crate::types::message::ToolResultContent::Text { text } => Some(AnthropicToolResultContent::Text { text: text.clone() }),
                            _ => None,
                        }).collect(),
                        is_error: *is_error,
                    }
                }
                _ => AnthropicContentBlock::Text { text: String::new() },
            }).collect(),
        },
        AppMessage::Assistant { content } => AnthropicMessage {
            role: "assistant".to_string(),
            content: content.iter().map(|c| match c {
                crate::types::message::ContentBlock::Text { text } => AnthropicContentBlock::Text { text: text.clone() },
                crate::types::message::ContentBlock::ToolUse { id, name, input } => {
                    AnthropicContentBlock::ToolUse { id: id.clone(), name: name.clone(), input: input.clone() }
                }
                _ => AnthropicContentBlock::Text { text: String::new() },
            }).collect(),
        },
        AppMessage::System { content } => AnthropicMessage {
            role: "user".to_string(),
            content: content.iter().filter_map(|c| match c {
                crate::types::message::ContentBlock::Text { text } => Some(AnthropicContentBlock::Text { text: text.clone() }),
                _ => None,
            }).collect(),
        },
    }).collect()
}

fn app_messages_to_openai(messages: &[AppMessage], system_prompt: Option<String>) -> Vec<OpenAIMessage> {
    let mut result = Vec::new();

    if let Some(sys) = system_prompt {
        result.push(OpenAIMessage {
            role: "system".to_string(),
            content: Some(sys),
            tool_calls: None,
            tool_call_id: None,
        });
    }

    for msg in messages {
        match msg {
            AppMessage::User { content } => {
                let text = content.iter().filter_map(|c| match c {
                    crate::types::message::ContentBlock::Text { text } => Some(text.clone()),
                    _ => None,
                }).collect::<Vec<_>>().join("\n");
                result.push(OpenAIMessage { role: "user".to_string(), content: Some(text), tool_calls: None, tool_call_id: None });
            }
            AppMessage::Assistant { content } => {
                let text = content.iter().filter_map(|c| match c {
                    crate::types::message::ContentBlock::Text { text } => Some(text.clone()),
                    _ => None,
                }).collect::<Vec<_>>().join("\n");

                let tool_calls: Vec<OpenAIToolCall> = content.iter().filter_map(|c| match c {
                    crate::types::message::ContentBlock::ToolUse { id, name, input } => Some(OpenAIToolCall {
                        id: id.clone(),
                        call_type: "function".to_string(),
                        function: OpenAIFunctionCall {
                            name: name.clone(),
                            arguments: serde_json::to_string(input).unwrap_or_default(),
                        },
                    }),
                    _ => None,
                }).collect();

                result.push(OpenAIMessage {
                    role: "assistant".to_string(),
                    content: if text.is_empty() { None } else { Some(text) },
                    tool_calls: if tool_calls.is_empty() { None } else { Some(tool_calls) },
                    tool_call_id: None,
                });
            }
            AppMessage::System { content } => {
                let text = content.iter().filter_map(|c| match c {
                    crate::types::message::ContentBlock::Text { text } => Some(text.clone()),
                    _ => None,
                }).collect::<Vec<_>>().join("\n");
                result.push(OpenAIMessage { role: "system".to_string(), content: Some(text), tool_calls: None, tool_call_id: None });
            }
        }
    }

    result
}

fn tools_to_anthropic(tools: &[ToolDefinition]) -> Vec<AnthropicTool> {
    tools.iter().map(|t| AnthropicTool {
        name: t.name.clone(),
        description: t.description.clone(),
        input_schema: t.input_schema.clone(),
    }).collect()
}

fn tools_to_openai(tools: &[ToolDefinition]) -> Vec<OpenAITool> {
    tools.iter().map(|t| OpenAITool {
        tool_type: "function".to_string(),
        function: OpenAIFunction {
            name: t.name.clone(),
            description: t.description.clone(),
            parameters: t.input_schema.clone(),
        },
    }).collect()
}

fn anthropic_response_to_content(response: &AnthropicResponse) -> Vec<serde_json::Value> {
    response.content.clone()
}

fn anthropic_response_to_usage(response: &AnthropicResponse) -> Usage {
    response.usage.as_ref().map(|u| Usage {
        input_tokens: u["input_tokens"].as_u64().unwrap_or(0),
        output_tokens: u["output_tokens"].as_u64().unwrap_or(0),
        cache_creation_input_tokens: u["cache_creation_input_tokens"].as_u64().unwrap_or(0),
        cache_read_input_tokens: u["cache_read_input_tokens"].as_u64().unwrap_or(0),
    }).unwrap_or_default()
}

fn openai_response_to_content(response: &OpenAIResponse) -> Vec<serde_json::Value> {
    let mut blocks = Vec::new();

    if let Some(choice) = response.choices.first() {
        if let Some(reasoning) = &choice.message.reasoning {
            if !reasoning.is_empty() {
                blocks.push(serde_json::json!({ "type": "text", "text": format!("<thinking>\n{}\n</thinking>\n", reasoning) }));
            }
        }

        if let Some(text) = &choice.message.content {
            if !text.is_empty() {
                blocks.push(serde_json::json!({ "type": "text", "text": text }));
            }
        }

        if let Some(tool_calls) = &choice.message.tool_calls {
            for tc in tool_calls {
                if let Ok(input) = serde_json::from_str::<serde_json::Value>(&tc.function.arguments) {
                    blocks.push(serde_json::json!({
                        "type": "tool_use",
                        "id": tc.id,
                        "name": tc.function.name,
                        "input": input,
                    }));
                }
            }
        }
    }

    blocks
}

fn openai_response_to_usage(response: &OpenAIResponse) -> Usage {
    response.usage.as_ref().map(|u| Usage {
        input_tokens: u["prompt_tokens"].as_u64().unwrap_or(0),
        output_tokens: u["completion_tokens"].as_u64().unwrap_or(0),
        cache_creation_input_tokens: 0,
        cache_read_input_tokens: 0,
    }).unwrap_or_default()
}

pub struct LlmClient {
    client: Client,
    config: ApiConfig,
}

impl LlmClient {
    pub fn new(config: ApiConfig) -> Self {
        Self {
            client: Client::builder()
                .timeout(std::time::Duration::from_secs(300))
                .build()
                .expect("Failed to create HTTP client"),
            config,
        }
    }

    pub fn provider(&self) -> &ApiProvider {
        &self.config.provider
    }

    pub fn model(&self) -> &str {
        &self.config.model
    }

    pub async fn send_message(
        &self,
        messages: Vec<AppMessage>,
        system_prompt: Option<String>,
        tools: Vec<ToolDefinition>,
        _cancel_token: CancellationToken,
    ) -> Result<(Vec<serde_json::Value>, Usage)> {
        match self.config.provider {
            ApiProvider::Anthropic => self.send_anthropic(messages, system_prompt, tools).await,
            ApiProvider::OpenAI => self.send_openai(messages, system_prompt, tools).await,
        }
    }

    async fn send_anthropic(
        &self,
        messages: Vec<AppMessage>,
        system_prompt: Option<String>,
        tools: Vec<ToolDefinition>,
    ) -> Result<(Vec<serde_json::Value>, Usage)> {
        let anthropic_tools = tools_to_anthropic(&tools);
        let anthropic_messages = app_messages_to_anthropic(&messages);

        // Extract system messages from the messages array for Anthropic's system field
        let system = system_prompt.or_else(|| {
            messages.iter().find_map(|m| match m {
                AppMessage::System { content } => Some(content.iter().filter_map(|c| match c {
                    crate::types::message::ContentBlock::Text { text } => Some(text.clone()),
                    _ => None,
                }).collect::<Vec<_>>().join("\n")),
                _ => None,
            })
        });

        let request = AnthropicRequest {
            model: self.config.model.clone(),
            max_tokens: self.config.max_tokens,
            messages: anthropic_messages,
            system,
            tools: anthropic_tools,
            temperature: self.config.temperature,
            stream: Some(false),
        };

        debug!("Sending request to Anthropic API");

        let resp = self.client
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
        let content = anthropic_response_to_content(&body);
        let usage = anthropic_response_to_usage(&body);

        info!("API response: {} tokens in, {} tokens out", usage.input_tokens, usage.output_tokens);

        Ok((content, usage))
    }

    async fn send_openai(
        &self,
        messages: Vec<AppMessage>,
        system_prompt: Option<String>,
        tools: Vec<ToolDefinition>,
    ) -> Result<(Vec<serde_json::Value>, Usage)> {
        let openai_tools = tools_to_openai(&tools);
        let openai_messages = app_messages_to_openai(&messages, system_prompt);

        let request = OpenAIRequest {
            model: self.config.model.clone(),
            messages: openai_messages,
            max_tokens: Some(self.config.max_tokens),
            tools: openai_tools,
            temperature: self.config.temperature,
            stream: Some(false),
        };

        debug!("Sending request to OpenAI-compatible API");

        let base = self.config.base_url.trim_end_matches('/');
        let base = base.strip_suffix("/v1").unwrap_or(base);
        let url = format!("{}/v1/chat/completions", base);

        let resp = self.client
            .post(&url)
            .header("Authorization", format!("Bearer {}", self.config.api_key))
            .header("content-type", "application/json")
            .json(&request)
            .send()
            .await?;

        if !resp.status().is_success() {
            let status = resp.status();
            let body = resp.text().await.unwrap_or_default();
            return Err(anyhow::anyhow!("API error {status}: {body}"));
        }

        let body: OpenAIResponse = resp.json().await?;
        let content = openai_response_to_content(&body);
        let usage = openai_response_to_usage(&body);

        info!("API response: {} tokens in, {} tokens out", usage.input_tokens, usage.output_tokens);

        Ok((content, usage))
    }

    pub fn create_stream(
        &self,
        messages: Vec<AppMessage>,
        system_prompt: Option<String>,
        tools: Vec<ToolDefinition>,
    ) -> EventSource {
        match self.config.provider {
            ApiProvider::Anthropic => self.create_anthropic_stream(messages, system_prompt, tools),
            ApiProvider::OpenAI => self.create_openai_stream(messages, system_prompt, tools),
        }
    }

    fn create_anthropic_stream(
        &self,
        messages: Vec<AppMessage>,
        system_prompt: Option<String>,
        tools: Vec<ToolDefinition>,
    ) -> EventSource {
        let anthropic_tools = tools_to_anthropic(&tools);
        let anthropic_messages = app_messages_to_anthropic(&messages);

        let system = system_prompt;

        let request = AnthropicRequest {
            model: self.config.model.clone(),
            max_tokens: self.config.max_tokens,
            messages: anthropic_messages,
            system,
            tools: anthropic_tools,
            temperature: self.config.temperature,
            stream: Some(true),
        };

        let builder = self.client
            .post(format!("{}/v1/messages", self.config.base_url))
            .header("x-api-key", &self.config.api_key)
            .header("anthropic-version", "2023-06-01")
            .header("content-type", "application/json")
            .header("accept", "text/event-stream")
            .json(&request);

        EventSource::new(builder).expect("Failed to create event source")
    }

    fn create_openai_stream(
        &self,
        messages: Vec<AppMessage>,
        system_prompt: Option<String>,
        tools: Vec<ToolDefinition>,
    ) -> EventSource {
        let openai_tools = tools_to_openai(&tools);
        let openai_messages = app_messages_to_openai(&messages, system_prompt);

        let request = OpenAIRequest {
            model: self.config.model.clone(),
            messages: openai_messages,
            max_tokens: Some(self.config.max_tokens),
            tools: openai_tools,
            temperature: self.config.temperature,
            stream: Some(true),
        };

        let base = self.config.base_url.trim_end_matches('/');
        let base = base.strip_suffix("/v1").unwrap_or(base);
        let url = format!("{}/v1/chat/completions", base);

        let builder = self.client
            .post(&url)
            .header("Authorization", format!("Bearer {}", self.config.api_key))
            .header("content-type", "application/json")
            .header("accept", "text/event-stream")
            .json(&request);

        EventSource::new(builder).expect("Failed to create event source")
    }
}
