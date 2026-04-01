## Purpose
Registers the /add-dir command.

## Imports
- **External**: Command type
- **Internal**: add-dir.jsx (lazy-loaded UI)

## Logic
Defines 'add-dir' command as local-jsx with:
- argumentHint: '<path>' (optional directory path)
- Loads './add-dir.js' dynamically

Command allows adding a new working directory to permissions, either via argument or interactive prompt.

## Exports
- `default` - Command object for /add-dir
