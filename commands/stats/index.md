# Stats Command Definition (`index`)

## Purpose
Defines the `stats` command for showing Claude Code usage statistics and activity.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'stats'`
- `description`: `'Show your Claude Code usage statistics and activity'`
- `load`: Dynamic import of `./stats.js` (or `.tsx`)

## Exports
- `stats` (Command) - The command definition (exported as default)