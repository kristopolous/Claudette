# Status Command Definition (`index`)

## Purpose
Defines the `status` command, which shows Claude Code status information (version, model, account, API connectivity, tool statuses). The command executes immediately when typed.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'status'`
- `description`: `'Show Claude Code status including version, model, account, API connectivity, and tool statuses'`
- `immediate`: `true` (executes immediately)
- `load`: Dynamic import of `./status.js` (or `.tsx`)

## Exports
- `status` (Command) - The command definition (exported as default)