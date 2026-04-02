use crate::types::{Command, CommandHandler};
use anyhow::Result;
use async_trait::async_trait;

pub struct HelpHandler {
    command_names: Vec<String>,
}

impl HelpHandler {
    pub fn new(command_names: Vec<String>) -> Self {
        Self { command_names }
    }
}

#[async_trait]
impl CommandHandler for HelpHandler {
    async fn execute(&self, _args: &str) -> Result<String> {
        let mut result = String::from("Available commands:\n\n");

        let builtins = [
            ("/help", "Show this help message"),
            ("/clear", "Clear the conversation history"),
            ("/model", "Show or change the current model"),
            ("/cost", "Show usage and cost statistics"),
            ("/quit", "Exit the application"),
        ];

        for (cmd, desc) in builtins {
            result.push_str(&format!("  {:<15} {}\n", cmd, desc));
        }

        if !self.command_names.is_empty() {
            result.push_str("\nTools available:\n");
            for name in &self.command_names {
                result.push_str(&format!("  - {name}\n"));
            }
        }

        Ok(result)
    }
}

pub fn help_command(names: Vec<String>) -> Command {
    Command {
        name: "help".to_string(),
        description: "Show available commands and help".to_string(),
        aliases: vec!["h".to_string()],
        handler: Box::new(HelpHandler::new(names)),
    }
}
