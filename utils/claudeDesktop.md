# utils/claudeDesktop

## Purpose
Provides Claude Desktop integration config path detection for macOS and WSL.

## Imports
- **Stdlib**: `fs/promises`, `os`, `path`
- **External**: (none)
- **Internal**: MCP types, errors, json, log, platform

## Logic
1. `getClaudeDesktopConfigPath` - gets Claude Desktop config path
2. Throws error on unsupported platforms (only macOS and WSL supported)
3. macOS path: ~/Library/Application Support/Claude/claude_desktop_config.json
4. WSL path: /mnt/c/Users/{user}/AppData/Roaming/Claude/claude_desktop_config.json
5. Uses USERPROFILE env var for Windows home detection
6. Converts Windows backslashes to forward slashes
7. Removes drive letter and converts to WSL path format
8. Checks file existence via stat before returning
9. Falls back to scanning /mnt/c/Users for user directories
10. Skips system directories (Public, Default, Default User, All Users)
11. Returns first found config path or throws error
12. Supports McpServerConfig and McpStdioServerConfigSchema types

## Exports
- `getClaudeDesktopConfigPath` - gets Claude Desktop config path
