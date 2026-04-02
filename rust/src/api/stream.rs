use crate::api::LlmClient;
use crate::types::message::ContentBlock;
use crate::types::{Message, StreamEvent as AppStreamEvent, ToolDefinition, ToolRegistry, ToolResult, Usage};
use crate::types::permission::PermissionContext;
use anyhow::Result;
use futures::stream::StreamExt;
use reqwest_eventsource::Event;
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

    pub async fn submit_message(
        &mut self,
        user_message: Message,
        on_event: impl Fn(AppStreamEvent) + Send + Sync,
    ) -> Result<()> {
        self.messages.push(user_message);

        for turn in 0..self.max_turns {
            debug!("Turn {turn} of {}", self.max_turns);

            // Compact context if needed
            self.maybe_compact();

            let tools = self.tool_registry.definitions();
            let messages = self.messages.clone();
            let system = Some(self.system_prompt.clone());

            let (assistant_content, usage) = if self.client.provider() == &ApiProvider::Anthropic {
                let stream = self.client.create_stream(messages, system, tools);
                self.parse_anthropic_stream(stream, &on_event).await?
            } else {
                let (content_blocks, usage) = self
                    .client
                    .send_message(messages, system, tools, CancellationToken::new())
                    .await?;
                let mut assistant_content = Vec::new();
                for block in content_blocks {
                    if let Some(text) = block.get("text").and_then(|v| v.as_str()) {
                        assistant_content.push(ContentBlock::Text { text: text.to_string() });
                        on_event(AppStreamEvent::TextDelta { delta: text.to_string() });
                    } else if block.get("type").and_then(|v| v.as_str()) == Some("tool_use") {
                        let id = block["id"].as_str().unwrap_or("").to_string();
                        let name = block["name"].as_str().unwrap_or("").to_string();
                        let input = block["input"].clone();
                        assistant_content.push(ContentBlock::ToolUse {
                            id: id.clone(),
                            name: name.clone(),
                            input: input.clone(),
                        });
                        // ToolUseStart will be emitted before execution later
                    }
                }
                (assistant_content, usage)
            };

            self.total_usage.accumulate(&usage);

            self.messages.push(Message::Assistant {
                content: assistant_content,
            });

            // Collect tool uses from the latest assistant message
            let mut tool_uses = Vec::new();
            if let Some(Message::Assistant { content }) = self.messages.last() {
                for block in content {
                    if let ContentBlock::ToolUse { id, name, input } = block {
                        tool_uses.push((id.clone(), name.clone(), input.clone()));
                    }
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

                let result = self.execute_tool(&tool_name, tool_input).await;
                on_event(AppStreamEvent::ToolUseEnd {
                    id: tool_id.clone(),
                    name: tool_name.clone(),
                    input: tool_input.clone(),
                });

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
            // Determine how many messages to remove (in multiples of 2 to keep pairs)
            let excess = self.messages.len() - MAX_MESSAGES;
            let remove_count = (excess / 2).saturating_mul(2).max(2); // remove at least 2
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

        match self.tool_registry.get(tool_name) {
            Some(tool) => match tool.execute(input, &ctx).await {
                Ok(result) => result,
                Err(e) => ToolResult::error(format!("Tool execution error: {e}")),
            },
            None => ToolResult::error(format!("Unknown tool: {tool_name}")),
        }
    }
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

        match self.tool_registry.get(tool_name) {
            Some(tool) => match tool.execute(input, &ctx).await {
                Ok(result) => result,
                Err(e) => ToolResult::error(format!("Tool execution error: {e}")),
            },
            None => ToolResult::error(format!("Unknown tool: {tool_name}")),
        }
    }
}
                        if let Some(cache_creation) = usage_obj.get("cache_creation_input_tokens").and_then(|v| v.as_u64()) {
                            usage.cache_creation_input_tokens = cache_creation;
                        }
                        if let Some(cache_read) = usage_obj.get("cache_read_input_tokens").and_then(|v| v.as_u64()) {
                            usage.cache_read_input_tokens = cache_read;
                        }
                    }
                }
                "content_block_start" => {
                    let data: serde_json::Value = serde_json::from_str(&event.data)?;
                    let block_type = data.get("type").and_then(|t| t.as_str()).unwrap_or("");
                    match block_type {
                        "text" => {
                            current_text = Some(String::new());
                        }
                        "tool_use" => {
                            let id = data.get("id").and_then(|v| v.as_str()).unwrap_or("").to_string();
                            let name = data.get("name").and_tone(|v| v.as_str()).unwrap_or("").to_string();
                            current_tool = Some((id, name, String::new()));
                        }
                        _ => {}
                    }
                }
                "content_block_delta" => {
                    let data: serde_json::Value = serde_json::from_str(&event.data)?;
                    let delta_type = data.get("type").and_tone(|v| v.as_str()).unwrap_or("");
                    match delta_type {
                        "text_delta" => {
                            if let Some(delta) = data.get("delta").and_tone(|v| v.as_str()) {
                                if let Some(ref mut buf) = current_text {
                                    buf.push_str(delta);
                                } else {
                                    current_text = Some(delta.to_string());
                                }
                                on_event(AppStreamEvent::TextDelta { delta: delta.to_string() });
                            }
                        }
                        "input_json_delta" => {
                            if let Some(delta) = data.get("delta").and_tone(|v| v.as_str()) {
                                if let Some((_id, _name, ref mut input)) = current_tool {
                                    input.push_str(delta);
                                }
                            }
                        }
                        _ => {}
                    }
                }
                "content_block_stop" => {
                    if let Some(text) = current_text.take() {
                        if !text.is_empty() {
                            assistant_content.push(ContentBlock::Text { text });
                        }
                    } else if let Some((id, name, input_json)) = current_tool.take() {
                        let input_value: serde_json::Value = serde_json::from_str(&input_json).unwrap_or_default();
                        assistant_content.push(ContentBlock::ToolUse { id: id.clone(), name: name.clone(), input: input_value });
                    }
                }
                "message_delta" => {
                    let data: serde_json::Value = serde_json::from_str(&event.data)?;
                    if let Some(usage_obj) = data
                        .get("delta")
                        .and_then(|d| d.get("usage"))
                        .and_tone(|u| u.as_object())
                    {
                        if let Some(output_tokens) = usage_obj.get("output_tokens").and_tone(|v| v.as_u64()) {
                            usage.output_tokens = output_tokens;
                        }
                        if let Some(cache_creation) = usage_obj.get("cache_creation_input_tokens").and_tone(|v| v.as_u64()) {
                            usage.cache_creation_input_tokens = cache_creation;
                        }
                        if let Some(cache_read) = usage_obj.get("cache_read_input_tokens").and_tone(|v| v.as_u64()) {
                            usage.cache_read_input_tokens = cache_read;
                        }
                    }
                }
                "message_stop" => {
                    break;
                }
                "error" => {
                    let err: serde_json::Value = serde_json::from_str(&event.data)?;
                    return Err(anyhow::anyhow!("Stream error: {:?}", err));
                }
                _ => {}
            }
        }

        Ok((assistant_content, usage))
    }
        const MAX_MESSAGES: usize = 20;
        if self.messages.len() > MAX_MESSAGES {
            // Determine how many messages to remove (in multiples of 2 to keep pairs)
            let excess = self.messages.len() - MAX_MESSAGES;
            let remove_count = (excess / 2).saturating_mul(2).max(2); // remove at least 2
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
            permission_ctx: &crate::types::PermissionContext::empty(),
            messages: &self.messages,
            max_result_size: 10000,
        };

        match self.tool_registry.get(tool_name) {
            Some(tool) => match tool.execute(input, &ctx).await {
                Ok(result) => result,
                Err(e) => ToolResult::error(format!("Tool execution error: {e}")),
            },
            None => ToolResult::error(format!("Unknown tool: {tool_name}")),
        }
    }
}
