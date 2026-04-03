# mcp/config

## Purpose
Manages MCP server configuration loading from multiple sources (user, project, local, managed, plugins, claude.ai).

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: BUILDFLAGS, `lodash-es/mapValues/memoize`
- **Internal**: platform, plugin types, claudeInChrome, config, cwd, debug, errors, fsOperations, JSON utils, log, plugins, settings, analytics, claudeai, envExpansion, types, utils

## Logic
1. `getEnterpriseMcpFilePath` - returns managed MCP config path
2. `addScopeToServers` - adds scope to server configs
3. Loads from multiple sources: user (~/claude/settingson), project, local, managed, plugins, claude.ai
4. `McpJsonConfigSchema` - validates claude/mcpon format
5. `McpServerConfigSchema` - validates individual server config
6. Supports stdio, SSE, HTTP, WebSocket server types
7. Environment variable expansion in config values
8. Plugin MCP servers via getPluginMcpServers
9. Claude.ai org-managed servers via fetchClaudeAIMcpConfigsIfEligible
10. Settings validation with ValidationError reporting
11. Respects isSettingSourceEnabled for source filtering
12. isRestrictedToPluginOnly policy check
13. getProjectMcpServerStatus for status tracking
14. Memoized loading for performance

## Exports
- `getEnterpriseMcpFilePath` - gets managed MCP config path
- `addScopeToServers` - adds scope to server configs
- (Additional config loading and validation functions)
