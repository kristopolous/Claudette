# utils/cachePaths

## Purpose
Provides cache directory paths for Claude CLI with project-specific isolation.

## Imports
- **Stdlib**: `path`
- **External**: `env-paths`
- **Internal**: fsOperations, hash

## Logic
1. Uses envPaths('claude-cli') for base cache directory
2. `sanitizePath` - local sanitize using djb2Hash (NOT Bun.hash)
3. MAX_SANITIZED_LENGTH (200) - max path length before hash suffix
4. Replaces non-alphanumeric with dashes
5. Appends hash suffix if exceeds max length
6. Cache directory names must remain stable across upgrades
7. Prevents orphaning existing cache data (error logs, MCP logs)
8. `getProjectDir` - sanitizes cwd for project isolation
9. `CACHE_PATHS` object with path generators:
   - baseLogs: {cache}/{project}
   - errors: {cache}/{project}/errors
   - messages: {cache}/{project}/messages
   - mcpLogs: {cache}/{project}/mcp-logs-{serverName}
10. Sanitizes server names for Windows compatibility (colons reserved)
11. Uses getFsImplementation().cwd() for current directory

## Exports
- `CACHE_PATHS` - cache paths object with generators
- `sanitizePath` - path sanitization function
- `getProjectDir` - gets project directory name
