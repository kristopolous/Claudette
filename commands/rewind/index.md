# Rewind Command Definition (`index`)

## Purpose
Defines the `rewind` command (alias: `checkpoint`) for restoring the code and/or conversation to a previous point.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `description`: `'Restore the code and/or conversation to a previous point'`
- `name`: `'rewind'`
- `aliases`: `['checkpoint']`
- `argumentHint`: `''` (no arguments)
- `type`: `'local'` (non-JSX, returns a skip result)
- `supportsNonInteractive`: `false` (requires interactive UI)
- `load`: Dynamic import of `./rewind.js` (or `.ts`)

## Exports
- `rewind` (Command) - The command definition (exported as default)