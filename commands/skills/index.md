# Skills Command Definition (`index`)

## Purpose
Defines the `skills` command to list available skills.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'skills'`
- `description`: `'List available skills'`
- `load`: Dynamic import of `./skills.js` (or `.tsx`)

## Exports
- `skills` (Command) - The command definition (exported as default)