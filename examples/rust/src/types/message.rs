use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "role", rename_all = "lowercase")]
pub enum Message {
    User { content: Vec<ContentBlock> },
    Assistant { content: Vec<ContentBlock> },
    System { content: Vec<ContentBlock> },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum ContentBlock {
    Text {
        text: String,
    },
    ToolUse {
        id: String,
        name: String,
        input: serde_json::Value,
    },
    ToolResult {
        tool_use_id: String,
        content: Vec<ToolResultContent>,
        #[serde(skip_serializing_if = "Option::is_none")]
        is_error: Option<bool>,
    },
    Image {
        source: ImageSource,
    },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum ToolResultContent {
    Text { text: String },
    Image { source: ImageSource },
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ImageSource {
    #[serde(rename = "type")]
    pub source_type: String,
    pub media_type: String,
    pub data: String,
}

impl Message {
    pub fn user_text(text: impl Into<String>) -> Self {
        Message::User {
            content: vec![ContentBlock::Text { text: text.into() }],
        }
    }

    pub fn assistant_text(text: impl Into<String>) -> Self {
        Message::Assistant {
            content: vec![ContentBlock::Text { text: text.into() }],
        }
    }

    pub fn tool_result(tool_use_id: String, output: String, is_error: bool) -> Self {
        Message::User {
            content: vec![ContentBlock::ToolResult {
                tool_use_id,
                content: vec![ToolResultContent::Text { text: output }],
                is_error: Some(is_error),
            }],
        }
    }

    pub fn system_text(text: impl Into<String>) -> Self {
        Message::System {
            content: vec![ContentBlock::Text { text: text.into() }],
        }
    }

    pub fn is_user(&self) -> bool {
        matches!(self, Message::User { .. })
    }

    pub fn is_assistant(&self) -> bool {
        matches!(self, Message::Assistant { .. })
    }

    pub fn extract_text(&self) -> String {
        match self {
            Message::User { content }
            | Message::Assistant { content }
            | Message::System { content } => content
                .iter()
                .filter_map(|block| match block {
                    ContentBlock::Text { text } => Some(text.clone()),
                    _ => None,
                })
                .collect::<Vec<_>>()
                .join("\n"),
        }
    }

    pub fn extract_tool_uses(&self) -> Vec<(&str, &str, &serde_json::Value)> {
        match self {
            Message::Assistant { content } => content
                .iter()
                .filter_map(|block| match block {
                    ContentBlock::ToolUse { id, name, input } => {
                        Some((id.as_str(), name.as_str(), input))
                    }
                    _ => None,
                })
                .collect(),
            _ => vec![],
        }
    }
}
