use std::collections::HashMap;

#[derive(Debug, Clone, Default)]
pub struct ModelUsage {
    pub input_tokens: u64,
    pub output_tokens: u64,
    pub cache_creation_input_tokens: u64,
    pub cache_read_input_tokens: u64,
    pub total_cost_usd: f64,
    pub web_search_requests: u64,
}

impl ModelUsage {
    pub fn accumulate(&mut self, input: u64, output: u64, cache_create: u64, cache_read: u64) {
        self.input_tokens += input;
        self.output_tokens += output;
        self.cache_creation_input_tokens += cache_create;
        self.cache_read_input_tokens += cache_read;
    }
}

#[derive(Debug, Clone, Default)]
pub struct CostTracker {
    pub model_usage: HashMap<String, ModelUsage>,
    pub total_cost_usd: f64,
    pub total_input_tokens: u64,
    pub total_output_tokens: u64,
    pub total_cache_creation_tokens: u64,
    pub total_cache_read_tokens: u64,
    pub total_duration_ms: u64,
    pub total_api_duration_ms: u64,
    pub lines_added: u64,
    pub lines_removed: u64,
}

impl CostTracker {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn add_usage(&mut self, model: &str, usage: &crate::types::event::Usage) {
        let model_usage = self.model_usage.entry(model.to_string()).or_default();
        model_usage.accumulate(
            usage.input_tokens,
            usage.output_tokens,
            usage.cache_creation_input_tokens,
            usage.cache_read_input_tokens,
        );

        self.total_input_tokens += usage.input_tokens;
        self.total_output_tokens += usage.output_tokens;
        self.total_cache_creation_tokens += usage.cache_creation_input_tokens;
        self.total_cache_read_tokens += usage.cache_read_input_tokens;
    }

    pub fn format_summary(&self) -> String {
        format!(
            "Total cost: ${:.2}\nTokens: {} in / {} out\nCache: {} created / {} read",
            self.total_cost_usd,
            self.total_input_tokens,
            self.total_output_tokens,
            self.total_cache_creation_tokens,
            self.total_cache_read_tokens,
        )
    }
}
