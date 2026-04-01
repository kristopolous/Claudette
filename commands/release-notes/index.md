# Release Notes Command Definition (`index`)

## Purpose
Defines the `release-notes` command for viewing the changelog. Supports non-interactive usage.

## Imports
### Internal
- `Command` type from `../../commands.js`

## Logic
Creates a command object:
- `type`: `'local'` (non-JSX command)
- `name`: `'release-notes'`
- `description`: `'View release notes'`
- `supportsNonInteractive`: `true` (can be used in scripts)
- `load`: Dynamic import of `./release-notes.js` (or `.ts`)

## Exports
- `releaseNotes` (Command) - The command definition (exported as default)