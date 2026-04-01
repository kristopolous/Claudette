## Purpose
Provides lazy-loaded command metadata for the `files` command.

## Imports
- **Internal**: Command type, implementation from files.js

## Logic
1. Command with type 'local'
2. Name: 'files', description: 'List all files currently in context'
3. `isEnabled` returns true only for Ant users (internal debugging command)
4. `supportsNonInteractive: true` (works in headless mode)
5. Lazy loads via `load: () => import('./files.js')`
6. Lists files that have been read into context via @ mentions, Read tool, etc.

## Exports
- `default` - Command object
