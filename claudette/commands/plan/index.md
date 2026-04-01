# Plan Command Definition (`index`)

## Purpose
Defines the `plan` command, which enables plan mode or views the current session plan.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'plan'`
- `description`: `'Enable plan mode or view the current session plan'`
- `argumentHint`: `'[open|<description>]'`
- `load`: Dynamic import of `./plan.js` (or `.tsx`)

## Exports
- `plan` (Command) - The command definition (exported as default)