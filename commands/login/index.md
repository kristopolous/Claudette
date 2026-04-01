## Purpose
Provides lazy-loaded command metadata for the `login` command with dynamic description.

## Imports
- **Internal**: Command type, login implementation, auth utils (hasAnthropicApiKeyAuth), envUtils

## Logic
1. Returns a Command object (factory function returning object)
2. Type: 'local-jsx'
3. Name: 'login'
4. Dynamic description based on current auth state:
   - If hasAnthropicApiKeyAuth(): "Switch Anthropic accounts"
   - Else: "Sign in with your Anthropic account"
5. `isEnabled` returns true unless DISABLE_LOGIN_COMMAND env is truthy
6. Lazy loads via `load: () => import('./login.js')`
7. Handles OAuth flow and post-login refreshes

## Exports
- `default` - Command object from factory
