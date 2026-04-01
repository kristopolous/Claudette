## Purpose
Visualize current context usage as a colored grid showing token distribution.

## Imports
- **External**: React, feature flags
- **Internal**: ContextVisualization component, microcompact service, analyzeContextUsage, renderToAnsiString, context transforms (getMessagesAfterCompactBoundary, projectView)

## Logic
1. Local-jsx command that renders context visualization in terminal
2. Applies same context transforms as query API:
   - Filters to messages after compact boundary
   - Applies projectView (if CONTEXT_COLLAPSE feature enabled)
   - Runs microcompactMessages to get final representation
3. Calls analyzeContextUsage with compacted messages to get token breakdown by category
4. Renders ContextVisualization React component
5. Converts to ANSI string to preserve colors (like local commands)
6. Passes result to onDone and returns null
7. Shows comprehensive breakdown: tokens by category, MCP tools, custom agents, memory files, skills, message categories (ant-only)

## Exports
- `call` - async LocalJSXCommandCall returning null (output via onDone)
