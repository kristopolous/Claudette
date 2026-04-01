## Purpose
Registers the ide command metadata and lazy-loads the JSX implementation.

## Imports
- **Internal**: `Command` type

## Logic
Defines a 'local-jsx' command named 'ide' with description "Manage IDE integrations and show status". Accepts an optional '[open]' argument to directly open the project. The implementation is loaded from './ide.js' when invoked.

## Exports
- `default` - The ide command object
