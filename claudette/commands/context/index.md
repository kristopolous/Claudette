## Purpose
Registers both interactive and non-interactive context commands.

## Imports
- **Internal**: `getIsNonInteractiveSession`, `Command` type

## Logic
Exports two command objects:
- `context`: type 'local-jsx', enabled in interactive sessions, loads './context.js' which renders the colored grid UI.
- `contextNonInteractive`: type 'local', enabled in non-interactive sessions, loads './context-noninteractive.js' which outputs markdown.
Both toggle visibility based on `getIsNonInteractiveSession()`.

## Exports
- `context` - Interactive command
- `contextNonInteractive` - Non-interactive command
