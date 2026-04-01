# Theme Command Definition (`index`)

## Purpose
Defines the `theme` command for changing the UI theme.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'theme'`
- `description`: `'Change the theme'`
- `load`: Dynamic import of `./theme.js` (or `.tsx`)

## Exports
- `theme` (Command) - The command definition (exported as default)