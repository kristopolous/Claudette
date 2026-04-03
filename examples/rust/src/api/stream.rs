use crate::api::{LlmClient, ApiProvider};
use crate::types::message::ContentBlock;
use crate::types::{Message, StreamEvent as AppStreamEvent, ToolRegistry, ToolResult, Usage};
use crate::types::permission::{PermissionContext, PermissionDecision};
use anyhow::Result;
use futures::StreamExt;
use reqwest_eventsource::Event;
use serde_json;
use tokio_util::sync::CancellationToken;
use tracing::{debug, info};

pub struct QueryEngine {
    messages: Vec<Message>,
    tool_registry: ToolRegistry,
    system_prompt: String,
    client: LlmClient,
    total_usage: Usage,
    max_turns: usize,
    permission_ctx: PermissionContext,
    read_only: bool,
}

impl QueryEngine {
    pub fn new(
        tool_registry: ToolRegistry,
        system_prompt: String,
        client: LlmClient,
        max_turns: usize,
        permission_ctx: PermissionContext,
        read_only: bool,
    ) -> Self {
        Self {
            messages: Vec::new(),
            tool_registry,
            system_prompt,
            client,
            total_usage: Usage::default(),
            max_turns,
            permission_ctx,
            read_only,
        }
    }

    pub fn add_message(&mut self, message: Message) {
        self.messages.push(message);
    }

    pub fn get_messages(&self) -> &[Message] {
        &self.messages
    }

    pub fn get_usage(&self) -> &Usage {
        &self.total_usage
    }

    pub async fn submit_message<F>(
        &mut self,
        user_message: Message,
        on_event: F,
    ) -> Result<()>
    where
        F: Fn(AppStreamEvent) + Send + Sync,
    {
        self.messages.push(user_message);
        on_event(AppStreamEvent::StreamStart);

        for turn in 0..self.max_turns {
            debug!("Turn {turn} of {}", self.max_turns);

            // Compact context if needed
            self.maybe_compact();

            let tools = self.tool_registry.definitions();
            let messages = self.messages.clone();
            let system = Some(self.system_prompt.clone());

            let mut assistant_content = Vec::new();
            let mut tool_uses = Vec::new();

            match *self.client.provider() {
                ApiProvider::Anthropic => {
                    // Streaming implementation for Anthropic
                    let stream = self.client.create_stream(messages, system, tools);
                    let mut event_stream = stream;

                    let mut current_text = String::new();
                    let mut stream_usage: Option<Usage> = None;

                    while let Some(event_result) = event_stream.next().await {
                        let msg = match event_result {
                            Ok(Event::Message(msg)) => msg,
                            Ok(Event::Open) => continue,
                            Err(e) => {
                                on_event(AppStreamEvent::Error {
                                    message: format!("Stream error: {e}"),
                                    retryable: true,
                                });
                                return Err(anyhow::anyhow!("Stream error: {e}"));
                            }
                        };

                        let data: serde_json::Value = match serde_json::from_str(&msg.data) {
                            Ok(v) => v,
                            Err(e) => {
                                on_event(AppStreamEvent::Error {
                                    message: format!("JSON parse error: {e}"),
                                    retryable: false,
                                });
                                continue;
                            }
                        };

                        match msg.event.as_str() {
                            "content_block_delta" => {
                                if let Some(delta) = data.get("delta") {
                                    if let Some(text) = delta.get("text").and_then(|t: &serde_json::Value| t.as_str()) {
                                        current_text.push_str(text);
                                        on_event(AppStreamEvent::TextDelta { delta: text.to_string() });
                                    }
                                }
                            }
                            "content_block_start" => {
                                if !current_text.is_empty() {
                                    assistant_content.push(ContentBlock::Text { text: current_text.clone() });
                                    current_text.clear();
                                }
                                if let Some(content_block) = data.get("content_block") {
                                    if content_block.get("type").and_then(|t: &serde_json::Value| t.as_str()) == Some("tool_use") {
                                        let id = content_block.get("id").and_then(|i| i.as_str()).unwrap_or("").to_string();
                                        let name = content_block.get("name").and_then(|n| n.as_str()).unwrap_or("").to_string();
                                        let input = content_block.get("input").cloned().unwrap_or(serde_json::json!({}));
                                        assistant_content.push(ContentBlock::ToolUse {
                                            id: id.clone(),
                                            name: name.clone(),
                                            input: input.clone(),
                                        });
                                        tool_uses.push((id, name, input));
                                    }
                                }
                            }
                            "message_stop" => {
                                if !current_text.is_empty() {
                                    assistant_content.push(ContentBlock::Text { text: current_text.clone() });
                                    current_text.clear();
                                }
                                let usage = data.get("usage").and_then(|u| {
                                    Some(Usage {
                                        input_tokens: u.get("input_tokens").and_then(|t| t.as_u64()).unwrap_or(0),
                                        output_tokens: u.get("output_tokens").and_then(|t| t.as_u64()).unwrap_or(0),
                                        cache_creation_input_tokens: u.get("cache_creation_input_tokens").and_then(|t| t.as_u64()).unwrap_or(0),
                                        cache_read_input_tokens: u.get("cache_read_input_tokens").and_then(|t| t.as_u64()).unwrap_or(0),
                                    })
                                }).unwrap_or_default();
                                stream_usage = Some(usage);
                                break;
                            }
                            _ => {}
                        }
                    }

                    if let Some(usage) = stream_usage {
                        self.total_usage.accumulate(&usage);
                    } else {
                        return Err(anyhow::anyhow!("Stream ended without message_stop event"));
                    }

                    self.messages.push(Message::Assistant {
                        content: assistant_content,
                    });
                }
                ApiProvider::OpenAI => {
                    // Streaming implementation for OpenAI
                    let stream = self.client.create_stream(messages, system, tools);
                    let mut event_stream = stream;

                    let mut current_text = String::new();
                    let mut stream_usage: Option<Usage> = None;
                    // Track tool calls: index -> (id, name, accumulated_args)
                    let mut tool_calls: std::collections::HashMap<usize, (String, String, String)> = std::collections::HashMap::new();
                    let mut tool_call_indices_seen = std::collections::HashSet::new();

                    while let Some(event_result) = event_stream.next().await {
                        let msg = match event_result {
                            Ok(Event::Message(msg)) => msg,
                            Ok(Event::Open) => continue,
                            Err(e) => {
                                on_event(AppStreamEvent::Error {
                                    message: format!("Stream error: {e}"),
                                    retryable: true,
                                });
                                return Err(anyhow::anyhow!("Stream error: {e}"));
                            }
                        };

                        // Check for [DONE] sentinel (some endpoints)
                        if msg.data.trim() == "[DONE]" {
                            break;
                        }

                        let data: serde_json::Value = match serde_json::from_str(&msg.data) {
                            Ok(v) => v,
                            Err(e) => {
                                on_event(AppStreamEvent::Error {
                                    message: format!("JSON parse error: {e}"),
                                    retryable: false,
                                });
                                continue;
                            }
                        };

                        // OpenAI sends data in structure: choices[0].delta
                        if let Some(choices) = data.get("choices").and_then(|c| c.as_array()) {
                            if let Some(first) = choices.first() {
                                let delta = first.get("delta");
                                if let Some(delta_obj) = delta {
                                    // Text delta
                                    if let Some(text) = delta_obj.get("content").and_then(|t| t.as_str()) {
                                        if !text.is_empty() {
                                            current_text.push_str(text);
                                            on_event(AppStreamEvent::TextDelta { delta: text.to_string() });
                                        }
                                    }
                                    // Tool calls delta
                                    if let Some(tool_calls_delta) = delta_obj.get("tool_calls").and_then(|t| t.as_array()) {
                                        for tc in tool_calls_delta {
                                            let index = tc.get("index").and_then(|i| i.as_u64()).unwrap_or(0) as usize;
                                            let entry = tool_calls.entry(index).or_insert_with(|| (String::new(), String::new(), String::new()));
                                            // Update id if present
                                            if let Some(id) = tc.get("id").and_then(|i| i.as_str()) {
                                                entry.0 = id.to_string();
                                            }
                                            // Update function name
                                            if let Some(function) = tc.get("function") {
                                                if let Some(name) = function.get("name").and_then(|n| n.as_str()) {
                                                    entry.1 = name.to_string();
                                                }
                                                // Append arguments
                                                if let Some(arguments) = function.get("arguments").and_then(|a| a.as_str()) {
                                                    entry.2.push_str(arguments);
                                                }
                                            }
                                            tool_call_indices_seen.insert(index);
                                        }
                                    }
                                }
                            }
                        }

                        // Usage and final event
                        if let Some(usage_data) = data.get("usage") {
                            let usage = Usage {
                                input_tokens: usage_data.get("prompt_tokens").and_then(|t| t.as_u64()).unwrap_or(0),
                                output_tokens: usage_data.get("completion_tokens").and_then(|t| t.as_u64()).unwrap_or(0),
                                cache_creation_input_tokens: 0,
                                cache_read_input_tokens: 0,
                            };
                            stream_usage = Some(usage);
                            break;
                        }

                        // Check for finish reason
                        if let Some(choices) = data.get("choices").and_then(|c| c.as_array()) {
                            if let Some(first) = choices.first() {
                                if first.get("finish_reason").is_some() {
                                    // Could break early if needed
                                }
                            }
                        }
                    }

                    // Flush any remaining text
                    if !current_text.is_empty() {
                        assistant_content.push(ContentBlock::Text { text: current_text.clone() });
                        current_text.clear();
                    }

                    // Convert accumulated tool calls into tool_use blocks
                    // Sort by index to maintain order
                    let mut sorted_indices: Vec<_> = tool_call_indices_seen.iter().collect();
                    sorted_indices.sort();
                    for idx in sorted_indices {
                        if let Some((id, name, arguments_str)) = tool_calls.remove(idx) {
                            // Parse accumulated arguments JSON
                            let input: serde_json::Value = if arguments_str.is_empty() {
                                serde_json::json!({})
                            } else {
                                serde_json::from_str(&arguments_str).unwrap_or_else(|_| serde_json::json!({"raw": arguments_str}))
                            };
                            assistant_content.push(ContentBlock::ToolUse {
                                id: id.clone(),
                                name: name.clone(),
                                input: input.clone(),
                            });
                            tool_uses.push((id, name, input));
                        }
                    }

                    if let Some(usage) = stream_usage {
                        self.total_usage.accumulate(&usage);
                    } else {
                        // Some endpoints may not provide usage; continue without it
                        debug!("Stream ended without usage information");
                    }

                    self.messages.push(Message::Assistant {
                        content: assistant_content,
                    });
                }
            }

            if tool_uses.is_empty() {
                break;
            }

            for (tool_id, tool_name, tool_input) in tool_uses {
                info!("Executing tool: {tool_name}");
                on_event(AppStreamEvent::ToolUseStart {
                    id: tool_id.clone(),
                    name: tool_name.clone(),
                });

                let input_for_exec = tool_input.clone();
                let result = self.execute_tool(&tool_name, input_for_exec).await;

                on_event(AppStreamEvent::ToolUseEnd {
                    id: tool_id.clone(),
                    name: tool_name.clone(),
                    input: tool_input.clone(),
                });

                // Emit tool result content to the UI for display
                if !result.content.is_empty() {
                    on_event(AppStreamEvent::TextDelta {
                        delta: result.content.clone(),
                    });
                }

                let result_msg = Message::tool_result(
                    tool_id,
                    result.content.clone(),
                    result.is_error,
                );

                on_event(AppStreamEvent::TextDelta {
                    delta: format!("\n[Tool result: {}]", if result.is_error { "error" } else { "ok" }),
                });

                self.messages.push(result_msg);
            }
        }

        Ok(())
    }

    fn maybe_compact(&mut self) {
        const MAX_MESSAGES: usize = 20;
        if self.messages.len() > MAX_MESSAGES {
            let excess = self.messages.len() - MAX_MESSAGES;
            let remove_count = (excess / 2).saturating_mul(2).max(2);
            if remove_count > 0 {
                let removed = self.messages.drain(0..remove_count).collect::<Vec<_>>();
                let placeholder = Message::Assistant {
                    content: vec![ContentBlock::Text {
                        text: format!("[Compacted {} earlier messages]", removed.len()),
                    }],
                };
                self.messages.insert(0, placeholder);
            }
        }
    }

    async fn execute_tool(&self, tool_name: &str, input: serde_json::Value) -> ToolResult {
        let ctx = crate::types::ToolUseContext {
            cwd: std::env::current_dir().unwrap_or_default(),
            abort_signal: CancellationToken::new(),
            tools: &self.tool_registry,
            permission_ctx: &self.permission_ctx,
            messages: &self.messages,
            max_result_size: 10000,
        };

        // Check read-only restriction
        if self.read_only {
            if let Some(tool) = self.tool_registry.get(tool_name) {
                if tool.is_destructive() {
                    return ToolResult::error(format!("Cannot execute destructive tool '{}' in read-only mode", tool_name));
                }
            }
        }

        // Check permission context
        match self.permission_ctx.is_tool_allowed(tool_name) {
            PermissionDecision::Allow => {}
            PermissionDecision::Deny => {
                return ToolResult::error(format!("Tool '{}' is denied by permission context", tool_name));
            }
            PermissionDecision::Ask => {
                return ToolResult::error(format!("Tool '{}' requires explicit permission (ask mode not supported in non-interactive context)", tool_name));
            }
        }

        match self.tool_registry.get(tool_name) {
            Some(tool) => match tool.execute(input, &ctx).await {
                Ok(result) => result,
                Err(e) => ToolResult::error(format!("Tool execution error: {e}")),
            },
            None => ToolResult::error(format!("Unknown tool: {tool_name}")),
        }
    }
}