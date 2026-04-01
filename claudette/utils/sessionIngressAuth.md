# utils/sessionIngressAuth

## Purpose
Provides session ingress token authentication via file descriptor or well-known file.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state, authFileDescriptor, debug, errors, fsOperations

## Logic
1. `getTokenFromFileDescriptor` - reads token via file descriptor with fallback
2. Uses global state to cache result (file descriptors can only be read once)
3. Checks cached token via getSessionIngressToken()
4. Checks CLAUDE_CODE_WEBSOCKET_AUTH_FILE_DESCRIPTOR env var
5. If no FD env var: tries well-known file (CLAUDE_SESSION_INGRESS_TOKEN_FILE or CCR_SESSION_INGRESS_TOKEN_PATH)
6. If FD env var set: parses fd number, reads from /dev/fd/{fd} (macOS/BSD) or /proc/self/fd/{fd} (Linux)
7. Validates token not empty, caches via setSessionIngressToken
8. Persists token for subprocesses via maybePersistTokenForSubprocesses
9. On FD read failure (typically subprocess inherited env var but not FD - ENXIO): falls back to well-known file
10. `getSessionIngressAuthToken` - gets session ingress auth token
11. Returns token from cache or reads via getTokenFromFileDescriptor
12. `clearSessionIngressTokenCache` - clears session ingress token cache

## Exports
- `getTokenFromFileDescriptor` - reads token from FD with fallback
- `getSessionIngressAuthToken` - gets session ingress auth token
- `clearSessionIngressTokenCache` - clears token cache
