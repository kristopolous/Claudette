## Purpose
Entry point that registers the 'plugin' command and loads the plugin management UI.

## Imports
- **External**: `Command` type from project types
- **Internal**: `plugin` from ./plugin.js (lazy-loaded)

## Logic
Defines the plugin command with:
- Type: 'local-jsx' (React Ink UI)
- Name: 'plugin' with aliases ['plugins', 'marketplace']
- Description: 'Manage Claude Code plugins'
- immediate: true (shows UI immediately)
- load: dynamically imports ./plugin.js

## Exports
- `default` - Command object for the plugin management interface
