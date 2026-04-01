# Mobile Command Definition (`index`)

## Purpose
Defines the `mobile` command (with aliases `ios` and `android`) that displays QR codes for downloading the Claude mobile app.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'mobile'`
- `aliases`: `['ios', 'android']`
- `description`: `'Show QR code to download the Claude mobile app'`
- `load`: Dynamic import of `./mobile.js` (or `.tsx`)

## Exports
- `mobile` (Command) - The command definition (exported as default)