# utils/claudeInChrome/chromeNativeHost

## Purpose
Provides Chrome native messaging host functionality in pure TypeScript.

## Imports
- **Stdlib**: `fs/promises`, `net`, `os`, `path`
- **External**: `zod/v4`
- **Internal**: lazySchema, JSON utils, claudeInChrome common

## Logic
1. `VERSION` - '1.0.0' native host version
2. `MAX_MESSAGE_SIZE` (1MB) - max message size for Chrome
3. `LOG_FILE` - debug log path for ant users (~/.claude/debug/chrome-native-host.txt)
4. `log` - appends to log file (fire-and-forget) and console.error
5. `sendChromeMessage` - sends message via stdout with length prefix (native messaging protocol)
6. Writes 4-byte little-endian length prefix, then JSON bytes
7. `runChromeNativeHost` - main entry point for native host
8. Creates ChromeNativeHost server instance
9. Creates ChromeMessageReader for stdin reading
10. Processes messages from Chrome until stdin closes
11. Handles messages via host.handleMessage
12. Stops server on Chrome disconnect
13. Uses Unix socket for communication (getSecureSocketPath, getSocketDir)
14. Supports platform detection (homedir, platform)
15. JSON schema validation for message format

## Exports
- `VERSION` - native host version constant
- `MAX_MESSAGE_SIZE` - max message size constant
- `sendChromeMessage` - sends message to Chrome via stdout
- `runChromeNativeHost` - runs Chrome native host server
