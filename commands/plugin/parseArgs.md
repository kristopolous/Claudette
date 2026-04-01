## Purpose
Parses plugin command arguments into structured command objects for routing.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic
Converts string arguments into typed command structures:
- 'menu' - show main menu
- 'help' - show usage
- 'install [target]' - install plugin or marketplace
- 'manage' - show installed plugins
- 'uninstall [plugin]' - remove plugin
- 'enable/disable [plugin]' - toggle plugin state
- 'validate [path]' - validate manifest
- 'marketplace [action] [target]' - marketplace management

Handles targets like 'plugin@marketplace', URLs, and paths. Flexible parsing for CLI and interactive use.

## Exports
- `ParsedCommand` - Union type for all command variants
- `parsePluginArgs` - Function that parses args string into ParsedCommand
