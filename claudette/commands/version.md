## Purpose
Displays the current version of Claude Code and exits.

## Imports
- **Internal**: `Command` type, `getVersionString`

## Logic
Simple 'local' command that retrieves the version string from package.json (or build info) and displays it to the user. For external builds, shows CHANGELOG.md link; for internal builds, shows git SHA.

## Exports
- `default` - The version command object with `call` function
