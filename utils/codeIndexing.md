# utils/codeIndexing

## Purpose
Provides utilities for detecting code indexing tool usage (Sourcegraph, Cody, etc.).

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `CodeIndexingTool` - union of known tool identifiers
2. Code search engines: sourcegraph, hound, seagoat, bloop, gitloop
3. AI coding assistants: cody, aider, continue, github-copilot, cursor, tabby, codeium, tabnine, augment, windsurf, aide, pieces, qodo, amazon-q, gemini
4. MCP code indexing servers: claude-context, code-index-mcp, local-code-search, autodev-codebase
5. Context providers: openctx
6. `CLI_COMMAND_MAPPING` - maps CLI command prefixes to tools
7. Maps: src→sourcegraph, cody→cody, aider→aider, tabby→tabby, etc.
8. `MCP_SERVER_PATTERNS` - maps MCP server name patterns to tools
9. Patterns matched case-insensitively
10. `detectCodeIndexingTool` - detects tool from CLI command
11. `detectCodeIndexingFromMcpServer` - detects from MCP server name
12. Used for analytics tracking of code indexing usage

## Exports
- `CodeIndexingTool` - code indexing tool type
- `CLI_COMMAND_MAPPING` - CLI command to tool mapping
- `MCP_SERVER_PATTERNS` - MCP server pattern mapping
- `detectCodeIndexingTool` - detects tool from command
- `detectCodeIndexingFromMcpServer` - detects from MCP server
