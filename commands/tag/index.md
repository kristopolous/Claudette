# Tag Command Definition (`index`)

## Purpose
Defines the `tag` command for toggling a searchable tag on the current session. Enabled only for `USER_TYPE='ant'` (internal).

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'tag'`
- `description`: `'Toggle a searchable tag on the current session'`
- `isEnabled`: Returns true only if `process.env.USER_TYPE === 'ant'`.
- `argumentHint`: `'<tag-name>'`
- `load`: Dynamic import of `./tag.js` (or `.tsx`)

## Exports
- `tag` (Command) - The command definition (exported as default)