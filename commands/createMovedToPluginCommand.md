## Purpose
Factory function that creates command objects that redirect to plugin marketplace commands.

## Imports
- **External**: `@anthropic-ai/sdk` (ContentBlockParam type)
- **Internal**: Command type, ToolUseContext type

## Logic
1. Takes options: name, description, progressMessage, pluginName, pluginCommand, getPromptWhileMarketplaceIsPrivate
2. Returns Command object with type 'prompt'
3. For Ant users (internal): returns message instructing user to install plugin from marketplace
4. For external users: calls getPromptWhileMarketplaceIsPrivate to provide working prompt (while marketplace is private/external)
5. Designed to replace commands that have been migrated to plugins
6. Provides graceful degradation and migration path

## Exports
- `createMovedToPluginCommand` - function that creates redirect-style commands
- Used by commands like security-review that moved to plugin
