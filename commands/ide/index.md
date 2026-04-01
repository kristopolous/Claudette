## Purpose
Provides lazy-loaded command metadata for the `ide` management command.

## Imports
- **Internal**: Command type, ide.tsx implementation

## Logic
1. Command with type 'local-jsx'
2. Name: 'ide', description: 'Manage IDE integrations and show status'
3. Argument hint: '[open]' (potential future usage)
4. Lazy loads via `load: () => import('./ide.js')`
5. Renders IDE management UI for connecting/disconnecting from embedded editor experiences (JetBrains, etc.)

## Exports
- `default` - Command object
