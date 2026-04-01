# mcp/headersHelper

## Purpose
Gets dynamic headers for MCP servers via external helper script execution.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: bootstrap state, config, debug, errors, execFileNoThrow, log, JSON utils, analytics, MCP types

## Logic
1. `isMcpServerFromProjectOrLocalSettings` - checks if config from project/local scope
2. `getMcpHeadersFromHelper` - executes headersHelper script for dynamic headers
3. Returns null if headersHelper not configured
4. Security check: requires trust dialog acceptance for project/local settings
5. Skips trust check in non-interactive mode (CI/CD, automation)
6. Logs error if headersHelper executed before trust confirmed
7. Executes helper with 10s timeout, shell: true
8. Passes CLAUDE_CODE_MCP_SERVER_NAME and CLAUDE_CODE_MCP_SERVER_URL env vars
9. Parses JSON output from helper script
10. Validates headers is Record<string, string>
11. Logs debug info for header retrieval

## Exports
- `isMcpServerFromProjectOrLocalSettings` - checks config scope
- `getMcpHeadersFromHelper` - executes helper script for dynamic headers
