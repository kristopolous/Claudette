## Purpose
Provides lazy-loaded command metadata for the `clear` command to reduce startup time.

## Imports
- **Internal**: Command type, implementation from clear.js

## Logic
1. Defines command metadata with type 'local'
2. Description: "Clear conversation history and free up context"
3. Aliases: ['reset', 'new']
4. `supportsNonInteractive: false` (should create new session instead)
5. Uses lazy loading via `load: () => import('./clear.js')`
6. Actual implementation imported from clear.ts which calls clearConversation

## Exports
- `default` - Command object with metadata and lazy loader
