## Purpose
Registers the hooks command metadata and lazy-loads the implementation.

## Imports
- **Internal**: `Command` type

## Logic
Defines a 'local-jsx' command named 'hooks' with description "View hook configurations for tool events". The command has `immediate: true` and loads its implementation from './hooks.js' on demand.

## Exports
- `default` - The hooks command object
