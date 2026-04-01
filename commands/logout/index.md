## Purpose
Registers the logout command metadata and lazy-loads the JSX implementation.

## Imports
- **Internal**: `Command` type, `isEnvTruthy`

## Logic
Defines a 'local-jsx' command named 'logout' with description "Sign out from your Anthropic account". The command is disabled if `DISABLE_LOGOUT_COMMAND` environment variable is truthy. The actual implementation is loaded dynamically from './logout.js' when the command is invoked.

## Exports
- `default` - The logout command object
