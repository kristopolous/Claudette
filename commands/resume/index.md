# Resume Command Definition (`index`)

## Purpose
Defines the `resume` command (alias: `continue`) for resuming a previous conversation.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'resume'`
- `aliases`: `['continue']`
- `description`: `'Resume a previous conversation'`
- `argumentHint`: `'[conversation id or search term]'`
- `load`: Dynamic import of `./resume.js` (or `.tsx`)

## Exports
- `resume` (Command) - The command definition (exported as default)