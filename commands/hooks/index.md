## Purpose
Provides lazy-loaded command metadata for the `hooks` configuration command.

## Imports
- **Internal**: Command type, hooks.tsx implementation

## Logic
1. Command with type 'local-jsx'
2. Name: 'hooks', description: 'View hook configurations for tool events'
3. `immediate: true` (no confirmation needed)
4. Lazy loads via `load: () => import('./hooks.js')`
5. Renders HooksConfigMenu UI for managing tool event hooks

## Exports
- `default` - Command object
