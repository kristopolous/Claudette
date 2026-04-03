## Purpose
Handles teleport (remote session) errors by detecting and resolving login requirements and git stash conflicts.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `ink`, `Dialog`, `Select`, `ConsoleOAuthFlow`, `TeleportStash`, remote preconditions utilities, graceful shutdown

## Logic
1. On mount, checks for teleport errors (needs login, needs git stash) and filters out ignored errors
2. If no errors remain after filtering, calls the completion callback immediately
3. For "needsGitStash" errors, renders the TeleportStash component to handle stashing uncommitted changes
4. For "needsLogin" errors, either shows a login prompt dialog with options to log in or exit, or initiates the OAuth flow
5. After login or stash completion, re-checks errors to ensure all issues are resolved
6. Uses a module-level sentinel for empty errors set to prevent unnecessary re-renders

## Exports
- `TeleportError` - renders error resolution UI for teleport sessions, handling login and git stash requirements
- `getTeleportErrors` - asynchronously checks for login and git cleanliness preconditions, returning a set of error types
- `TeleportLocalErrorType` - type alias for the possible teleport error types: "needsLogin" or "needsGitStash"
