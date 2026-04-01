## Purpose
Classifies MCP tools as search or read operations for UI collapsing behavior, using explicit allowlists of common MCP server tool names.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic
Maintains two large sets of tool names: SEARCH_TOOLS for search operations and READ_TOOLS for read/list operations across many MCP servers including Slack, GitHub, Linear, Datadog, Sentry, Notion, Gmail, Google services, Atlassian, Asana, filesystem, memory, databases, search engines, and more. Normalizes tool names by converting camelCase and kebab-case to snake_case before matching. Unknown tool names are conservatively not classified as search or read, preventing incorrect collapsing.

## Exports
- `classifyMcpToolForCollapse` - returns whether a tool is a search or read operation based on its name
