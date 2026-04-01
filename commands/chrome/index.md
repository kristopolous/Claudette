# Chrome Command Definition (`index`)

## Purpose
Registers the `chrome` command, which opens the Claude in Chrome settings dialog. The command is only available in claude-ai mode and when not in a non-interactive session.

## Imports
### Internal
- `getIsNonInteractiveSession` from `../../bootstrap/state.js`
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `name`: `'chrome'`
- `description`: `'Claude in Chrome (Beta) settings'`
- `availability`: `['claude-ai']` (restricts to claude-ai mode)
- `isEnabled`: Returns false if in a non-interactive session, true otherwise
- `type`: `'local-jsx'` (renders a React component)
- `load`: Dynamic import of `./chrome.js` (or `.tsx`)

## Exports
- `command` (Command) - The command definition (exported as default)