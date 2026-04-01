# Output-Style Command Definition (`index`)

## Purpose
Defines the `output-style` command (deprecated and hidden). Users should use `/config` instead.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'output-style'`
- `description`: `'Deprecated: use /config to change output style'`
- `isHidden`: `true` (command is not shown in help)
- `load`: Dynamic import of `./output-style.js` (or `.tsx`)

## Exports
- `outputStyle` (Command) - The deprecated command definition (exported as default)