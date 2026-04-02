use crate::types::{Command, CommandHandler};
use anyhow::Result;
use async_trait::async_trait;

pub struct ModelHandler {
    current_model: String,
}

impl ModelHandler {
    pub fn new(model: String) -> Self {
        Self { current_model: model }
    }
}

#[async_trait]
impl CommandHandler for ModelHandler {
    async fn execute(&self, args: &str) -> Result<String> {
        let args = args.trim();
        if args.is_empty() {
            Ok(format!("Current model: {}", self.current_model))
        } else {
            Ok(format!("Model changed to: {args}\n(Note: model switching not yet implemented)"))
        }
    }
}

pub fn model_command(model: String) -> Command {
    Command {
        name: "model".to_string(),
        description: "Show or change the current model".to_string(),
        aliases: vec!["m".to_string()],
        handler: Box::new(ModelHandler::new(model)),
    }
}
