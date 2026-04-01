# Stickers Command Definition (`index`)

## Purpose
Defines the `stickers` command for ordering Claude Code stickers.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local'` (non-JSX, returns text result)
- `name`: `'stickers'`
- `description`: `'Order Claude Code stickers'`
- `supportsNonInteractive`: `false` (requires interactive environment to open browser)
- `load`: Dynamic import of `./stickers.js` (or `.ts`)

## Exports
- `stickers` (Command) - The command definition (exported as default)