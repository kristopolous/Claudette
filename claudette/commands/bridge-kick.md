## Purpose
Removes the current user's authentication credentials and logs them out.

## Imports
- **Internal**: `Command` type, `deleteCredential`, `deleteAuthHeader`

## Logic
Simple 'local' command that deletes stored credentials (API key) and auth headers from both persistent storage and in-memory state. Asks for confirmation if user is in a managed workspace. Needs /login or /key to set credentials again.

## Exports
- `default` - The bridge-kick command object with `call` function
