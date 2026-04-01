## Purpose
Sign in with your Anthropic account or switch accounts.

## Imports
- **External**: React, React Compiler runtime, feature flags
- **Internal**: Login component, ConsoleOAuthFlow, resetCostState, trust device management, cache clearing, analytics, policy refresh, user cache, main loop model hook, message stripping, permission killswitch checks, auto-mode gates, AppState updates

## Logic
1. Local-jsx command that renders Login dialog
2. Login component wraps ConsoleOAuthFlow in a Dialog
3. On successful login:
   - Triggers context.onChangeAPIKey() to update auth state
   - Strips signature blocks from messages (bound to old API key)
   - Resets cost state
   - Refreshes remote managed settings (non-blocking)
   - Refreshes policy limits (non-blocking)
   - Clears user cache before GrowthBook refresh
   - Refreshes GrowthBook for updated feature flags
   - Clears old trusted device token, enrolls new trusted device
   - Resets bypass permissions and auto-mode gate checks
   - Increments authVersion in AppState to trigger re-fetch of auth-dependent data (MCP servers)
4. Description dynamic: if already has API key auth, shows "Switch Anthropic accounts", else "Sign in with your Anthropic account"
5. Disabled by DISABLE_LOGIN_COMMAND environment variable
6. Command type: 'local-jsx'

## Exports
- `call` - async LocalJSXCommandCall returning Login React component
- `Login` - React component with Dialog and OAuth flow
- Uses useMainLoopModel hook
