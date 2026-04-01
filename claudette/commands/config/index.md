## Purpose
Provides lazy-loaded command metadata for the `config` (settings) command.

## Imports
- **Internal**: Command type, implementation from config.js

## Logic
1. Defines command with type 'local-jsx'
2. Name: 'config', description: 'Open config panel'
3. Aliases: ['settings']
4. Lazy loads implementation via `load: () => import('./config.js')`
5. Renders interactive Settings UI component

## Exports
- `default` - Command object
