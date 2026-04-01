# Vim Command Definition (`index`)

## Purpose
Defines the `vim` command to toggle between Vim and Normal editing modes.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local'` (non-JSX, returns text)
- `name`: `'vim'`
- `description`: `'Toggle between Vim and Normal editing modes'`
- `supportsNonInteractive`: `false` (requires interactive environment to show result)
- `load`: Dynamic import of `./vim.js` (or `.ts`)

## Exports
- `command` (Command) - The command definition (exported as default)