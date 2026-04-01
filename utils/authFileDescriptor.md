# utils/authFileDescriptor

## Purpose
Handles authentication token persistence and retrieval via file descriptors for CCR.

## Imports
- **Stdlib**: `fs`
- **External**: (none)
- **Internal**: bootstrap state, debug, envUtils, errors, fsOperations

## Logic
1. `CCR_TOKEN_DIR` - '/home/claude/.claude/remote'
2. `CCR_OAUTH_TOKEN_PATH`, `CCR_API_KEY_PATH`, `CCR_SESSION_INGRESS_TOKEN_PATH` - well-known token paths
3. Go environment-manager creates directory, this module writes files
4. Enables subprocess access without inheriting FD (pipe FDs don't cross tmux/shell)
5. `maybePersistTokenForSubprocesses` - writes token to well-known path
6. CCR-gated: only runs in CCR (CLAUDE_CODE_REMOTE env)
7. Creates directory with 0o700 mode, writes file with 0o600 mode
8. Logs success/failure for debugging
9. `readTokenFromWellKnownFile` - fallback read from well-known file
10. Expected ENOENT outside CCR (silent), other errors logged
11. Uses getFsImplementation for file operations
12. Trims whitespace from token content
13. Supports OAuth token, API key, session ingress token

## Exports
- `CCR_TOKEN_DIR` - CCR token directory constant
- `CCR_OAUTH_TOKEN_PATH` - OAuth token path constant
- `CCR_API_KEY_PATH` - API key path constant
- `CCR_SESSION_INGRESS_TOKEN_PATH` - session ingress token path
- `maybePersistTokenForSubprocesses` - persists token for subprocesses
- `readTokenFromWellKnownFile` - reads token from well-known file
