## Purpose
Provides lazy-loaded command metadata for the `exit` command with immediate execution.

## Imports
- **Internal**: Command type, implementation from exit.js

## Logic
1. Command with type 'local-jsx'
2. Name: 'exit', description: 'Exit the REPL'
3. Aliases: ['quit']
4. `immediate: true` - no confirmation prompt needed
5. Lazy loads via `load: () => import('./exit.js')`
6. Handles immediate exit (or tmux detach in bg mode) with goodbye

## Exports
- `default` - Command object
