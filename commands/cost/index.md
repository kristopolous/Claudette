## Purpose
Provides lazy-loaded command metadata for the `cost` command to reduce startup time.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `isClaudeAISubscriber` (from utils/auth.js), `cost` implementation (from cost.js)

## Logic
1. Defines command metadata with type 'local'
2. Configures `isHidden` to hide from regular subscribers but show for Ant users
3. Uses lazy loading via `load: () => import('./cost.js')` to defer implementation loading
4. Command shows session cost and duration when invoked

## Exports
- `default` - Command object with metadata and lazy loader
