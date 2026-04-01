# Permissions Command Definition (`index`)

## Purpose
Defines the `permissions` command (alias: `allowed-tools`) for managing tool permission allow/deny rules.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'permissions'`
- `aliases`: `['allowed-tools']`
- `description`: `'Manage allow & deny tool permission rules'`
- `load`: Dynamic import of `./permissions.js` (or `.tsx`)

## Exports
- `permissions` (Command) - The command definition (exported as default)