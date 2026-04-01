## Purpose
Show current context usage in non-interactive/headless mode as markdown table.

## Imports
- **Internal**: microcompact service, analyzeContextUsage, message helpers, formatting, settings constants

## Logic
1. Defines type `CollectContextDataInput` with messages, getAppState, options
2. `collectContextData` async function:
   - Applies same transforms as interactive version (compact boundary, projectView, microcompact)
   - Calls analyzeContextUsage to get ContextData with token breakdown
3. `call` async function:
   - Calls collectContextData with ToolUseContext
   - Returns text response with formatContextAsMarkdownTable(data)
4. formatContextAsMarkdownTable builds detailed markdown showing:
   - Model, tokens, percentage
   - Context collapse status (if enabled)
   - Estimated usage by category table
   - MCP tools, system tools (Ant), system prompt sections (Ant)
   - Custom agents, memory files, skills
   - Message breakdown with top tools/attachments (Ant)
5. Command type: 'local' (returns text, not JSX)

## Exports
- `call` - async function returning { type: 'text', value: string }
