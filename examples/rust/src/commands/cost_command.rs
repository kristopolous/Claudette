use crate::types::{Command, CommandHandler, CostTracker};
use anyhow::Result;
use async_trait::async_trait;
use std::sync::Arc;
use parking_lot::Mutex;

pub struct CostHandler {
    tracker: Arc<Mutex<CostTracker>>,
}

impl CostHandler {
    pub fn new(tracker: Arc<Mutex<CostTracker>>) -> Self {
        Self { tracker }
    }
}

#[async_trait]
impl CommandHandler for CostHandler {
    async fn execute(&self, _args: &str) -> Result<String> {
        let tracker = self.tracker.lock();
        Ok(tracker.format_summary())
    }
}

pub fn cost_command(tracker: Arc<Mutex<CostTracker>>) -> Command {
    Command {
        name: "cost".to_string(),
        description: "Show usage and cost statistics".to_string(),
        aliases: vec!["usage".to_string()],
        handler: Box::new(CostHandler::new(tracker)),
    }
}
