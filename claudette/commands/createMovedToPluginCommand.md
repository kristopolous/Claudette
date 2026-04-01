## Purpose
Creates a command that redirects users to a plugin when functionality has been moved.

## Imports
- **Internal**: `Command` type, `createMovedToPluginCommand`

## Logic
Factory function that generates a command wrapper which detects when the old command is invoked and informs the user that the functionality has moved to a plugin. Provides instructions to enable the plugin. Useful for deprecating built-in commands in favor of modular plugins.

## Exports
- `createMovedToPluginCommand` - Function that creates redirect command objects
