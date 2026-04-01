# utils/claudeInChrome/common

## Purpose
Provides common utilities for Claude in Chrome browser integration.

## Imports
- **Stdlib**: `fs`, `fs/promises`, `os`, `path`
- **External**: (none)
- **Internal**: MCP normalization, debug, errors, execFileNoThrow, platform, which, setupPortable

## Logic
1. `CLAUDE_IN_CHROME_MCP_SERVER_NAME` - 'claude-in-chrome'
2. `ChromiumBrowser` type - chrome, brave, arc, chromium, edge, vivaldi, opera
3. `BrowserConfig` - name, macos, linux, windows configuration
4. `CHROMIUM_BROWSERS` - browser configurations with paths
5. macOS: appName, dataPath, nativeMessagingPath arrays
6. Linux: binaries array, dataPath, nativeMessagingPath arrays
7. Windows: dataPath, registryKey, useRoaming (Opera)
8. `getAllBrowserDataPaths` - gets all browser data paths
9. `getAllNativeMessagingHostsDirs` - gets all native messaging hosts dirs
10. `getAllWindowsRegistryKeys` - gets all Windows registry keys for native messaging
11. `openInChrome` - opens URL in Chrome browser
12. Platform detection via getPlatform
13. Binary detection via which command
14. File system access via stat, readdirSync
15. Supports multiple Chromium-based browsers

## Exports
- `CLAUDE_IN_CHROME_MCP_SERVER_NAME` - MCP server name constant
- `ChromiumBrowser` - browser type
- `CHROMIUM_BROWSERS` - browser configurations
- `getAllBrowserDataPaths` - gets all browser data paths
- `getAllNativeMessagingHostsDirs` - gets native messaging hosts dirs
- `getAllWindowsRegistryKeys` - gets Windows registry keys
- `openInChrome` - opens URL in Chrome
