## Purpose
Provides lazy-loaded command metadata for the `logout` command.

## Imports
- **Internal**: Command type, logout implementation, envUtils

## Logic
1. Command with type 'local-jsx'
2. Name: 'logout', description: 'Sign out from your Anthropic account'
3. `isEnabled` returns false if DISABLE_LOGOUT_COMMAND env is truthy
4. Lazy loads via `load: () => import('./logout.js')`
5. Performs full logout: clears credentials, caches, and exits

## Exports
- `default` - Command object
