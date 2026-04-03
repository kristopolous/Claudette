## Purpose
Initializes the upstream proxy for CCR session containers by reading session tokens, securing the process, downloading CA certificates, and starting a local CONNECT-to-WebSocket relay.

## Imports
- **Stdlib**: `fs/promises` (mkdir, readFile, unlink, writeFile), `os` (homedir), `path` (join)
- **External**: FFI (for prctl syscall on Linux)
- **Internal**: `utils/cleanupRegistry`, `utils/debug`, `utils/envUtils`, `utils/errors`, `upstreamproxy/relay`

## Logic
1. Checks if remote mode and upstream proxy are enabled via environment variables
2. Reads the session token from disk
3. Sets the process as non-dumpable via prctl to block ptrace-based heap scraping
4. Downloads the upstream proxy CA certificate and concatenates it with the system CA bundle
5. Starts a local WebSocket relay that tunnels CONNECT requests
6. Unlinks the token file after the relay is confirmed running
7. Exposes proxy environment variables (HTTPS_PROXY, SSL_CERT_FILE, NO_PROXY, etc.) for all agent subprocesses
8. Every step fails open — errors disable the proxy without breaking the session

## Exports
- `initUpstreamProxy` - initializes the upstream proxy; returns state indicating if enabled, port, and CA bundle path
- `getUpstreamProxyEnv` - returns environment variables to merge into agent subprocesses for proxy routing
- `resetUpstreamProxyForTests` - resets module state between test cases
- `SESSION_TOKEN_PATH` - constant for the default session token file path
