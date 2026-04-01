# utils/claudeInChrome/setup

## Purpose
Provides Claude in Chrome extension setup and configuration.

## Imports
- **Stdlib**: `fs/promises`, `os`, `path`, `url`
- **External**: `@ant/claude-for-chrome-mcp`
- **Internal**: bootstrap state, growthbook, MCP types, bundledMode, config, debug, envUtils, execFileNoThrow, platform, JSON utils, claudeInChrome common/prompt/setupPortable

## Logic
1. `CHROME_EXTENSION_RECONNECT_URL` - 'https://clau.de/chrome/reconnect'
2. `NATIVE_HOST_IDENTIFIER` - 'com.anthropic.claude_code_browser_extension'
3. `NATIVE_HOST_MANIFEST_NAME` - native host manifest filename
4. `shouldEnableClaudeInChrome` - checks if Claude in Chrome should be enabled
5. Disabled by default in non-interactive sessions unless chromeFlag=true
6. Checks CLI flags, env vars (CLAUDE_CODE_ENABLE_CFC), config settings
7. `shouldAutoEnableClaudeInChrome` - checks if should auto-enable
8. Requires interactive mode, extension installed, ant user or GrowthBook gate
9. Caches result in shouldAutoEnable variable
10. `installChromeExtension` - installs Chrome extension
11. `setupNativeMessagingHost` - sets up native messaging host
12. Writes manifest JSON to native messaging hosts directory
13. Supports macOS, Linux, Windows platforms
14. `getChromeSystemPrompt` - gets Chrome system prompt
15. `getAllBrowserDataPaths` - gets all browser data paths
16. `getAllNativeMessagingHostsDirs` - gets all native messaging hosts dirs
17. `getAllWindowsRegistryKeys` - gets all Windows registry keys
18. `openInChrome` - opens URL in Chrome browser

## Exports
- `shouldEnableClaudeInChrome` - checks if Claude in Chrome enabled
- `shouldAutoEnableClaudeInChrome` - checks if should auto-enable
- (Setup and configuration functions)
