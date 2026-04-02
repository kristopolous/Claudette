use crate::commands::*;
use crate::types::{CommandRegistry, CostTracker};
use parking_lot::Mutex;
use std::sync::Arc;

pub fn register_builtin_commands(
    registry: &mut CommandRegistry,
    model: &str,
    cost_tracker: Arc<Mutex<CostTracker>>,
    tool_names: Vec<String>,
) {
    registry.register(help_command(tool_names));
    registry.register(clear_command());
    registry.register(model_command(model.to_string()));
    registry.register(cost_command(cost_tracker));
}
