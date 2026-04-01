## Purpose
Provides lazy-loaded command metadata for the `help` command.

## Imports
- **Internal**: Command type, help.tsx implementation

## Logic
1. Command with type 'local-jsx'
2. Name: 'help', description: 'Show help and available commands'
3. Lazy loads via `load: () => import('./help.js')`
4. Renders HelpV2 interactive help screen with command listing

## Exports
- `default` - Command object
