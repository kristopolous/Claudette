use crate::types::{Command, CommandHandler};
use anyhow::Result;
use async_trait::async_trait;

pub struct ClearHandler;

#[async_trait]
impl CommandHandler for ClearHandler {
    async fn execute(&self, _args: &str) -> Result<String> {
        Ok("CLEAR_SESSION".to_string())
    }
}

pub fn clear_command() -> Command {
    Command {
        name: "clear".to_string(),
        description: "Clear the conversation history".to_string(),
        aliases: vec!["cls".to_string()],
        handler: Box::new(ClearHandler),
    }
}
