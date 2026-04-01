pub struct Command {
    pub name: String,
    pub description: String,
    pub aliases: Vec<String>,
    pub handler: Box<dyn CommandHandler>,
}

#[async_trait::async_trait]
pub trait CommandHandler: Send + Sync {
    async fn execute(&self, args: &str) -> anyhow::Result<String>;
}

impl std::fmt::Display for Command {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "/{} - {}", self.name, self.description)
    }
}

impl Command {
    pub fn matches(&self, input: &str) -> bool {
        let input = input.trim_start_matches('/');
        input == self.name || self.aliases.iter().any(|a| a == input)
    }
}

pub struct CommandRegistry {
    commands: Vec<Command>,
}

impl CommandRegistry {
    pub fn new() -> Self {
        Self { commands: Vec::new() }
    }

    pub fn register(&mut self, command: Command) {
        self.commands.push(command);
    }

    pub fn find(&self, input: &str) -> Option<&Command> {
        self.commands.iter().find(|c| c.matches(input))
    }

    pub fn names(&self) -> Vec<&str> {
        self.commands.iter().map(|c| c.name.as_str()).collect()
    }
}

impl Default for CommandRegistry {
    fn default() -> Self {
        Self::new()
    }
}
