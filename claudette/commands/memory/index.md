# Memory Command Definition (`index`)

## Purpose
Defines the `memory` command for editing Claude memory files via a dialog interface.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'memory'`
- `description`: `'Edit Claude memory files'`
- `load`: Dynamic import of `./memory.js` (or `.tsx`)

## Exports
- `memory` (Command) - The command definition (exported as default)