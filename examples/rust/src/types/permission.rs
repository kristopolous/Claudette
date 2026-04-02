#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PermissionMode {
    Default,
    Auto,
    Bypass,
}

#[derive(Debug, Clone)]
pub struct ToolPermissionRule {
    pub tool_name: String,
    pub pattern: Option<String>,
}

#[derive(Debug, Clone)]
pub struct PermissionContext {
    pub mode: PermissionMode,
    pub always_allow: Vec<ToolPermissionRule>,
    pub always_deny: Vec<ToolPermissionRule>,
    pub always_ask: Vec<ToolPermissionRule>,
}

impl PermissionContext {
    pub fn new(mode: PermissionMode) -> Self {
        Self {
            mode,
            always_allow: Vec::new(),
            always_deny: Vec::new(),
            always_ask: Vec::new(),
        }
    }

    pub fn empty() -> Self {
        Self::new(PermissionMode::Default)
    }

    pub fn is_tool_allowed(&self, tool_name: &str) -> PermissionDecision {
        if self.mode == PermissionMode::Bypass {
            return PermissionDecision::Allow;
        }

        for rule in &self.always_deny {
            if rule.tool_name == tool_name {
                return PermissionDecision::Deny;
            }
        }

        for rule in &self.always_allow {
            if rule.tool_name == tool_name {
                return PermissionDecision::Allow;
            }
        }

        if self.mode == PermissionMode::Auto {
            return PermissionDecision::Allow;
        }

        PermissionDecision::Ask
    }

    pub fn add_always_allow(&mut self, tool_name: &str) {
        self.always_allow.push(ToolPermissionRule {
            tool_name: tool_name.to_string(),
            pattern: None,
        });
    }

    pub fn add_always_deny(&mut self, tool_name: &str) {
        self.always_deny.push(ToolPermissionRule {
            tool_name: tool_name.to_string(),
            pattern: None,
        });
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PermissionDecision {
    Allow,
    Deny,
    Ask,
}
