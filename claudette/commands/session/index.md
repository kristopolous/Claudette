# Session Command Definition (`index`)

## Purpose
Defines the `session` command (alias: `remote`) to show the remote session URL and QR code. Only available when running in remote mode.

## Imports
### Internal
- `getIsRemoteMode` from `../../bootstrap/state.js`
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'session'`
- `aliases`: `['remote']`
- `description`: `'Show remote session URL and QR code'`
- `isEnabled`: Returns `getIsRemoteMode()` (only enabled in remote mode).
- `isHidden`: Getter returns `!getIsRemoteMode()` (hides command when not in remote mode).
- `load`: Dynamic import of `./session.js` (or `.tsx`)

## Exports
- `session` (Command) - The command definition (exported as default)