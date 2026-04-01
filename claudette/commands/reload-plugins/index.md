# Reload Plugins Command Definition (`index`)

## Purpose
Defines the `reload-plugins` command, which activates pending plugin changes in the current session. Not intended for SDK non-interactive use.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local'` (non-JSX, returns structured text)
- `name`: `'reload-plugins'`
- `description`: `'Activate pending plugin changes in the current session'`
- `supportsNonInteractive`: `false` (should not be used in non-interactive mode)
- `load`: Dynamic import of `./reload-plugins.js` (or `.ts`)

Comment notes that SDK callers should use `query.reloadPlugins()` (a control request) for structured data instead of a text prompt.

## Exports
- `reloadPlugins` (Command) - The command definition (exported as default)