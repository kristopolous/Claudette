## Purpose
Shows current context usage in non-interactive mode (slash command and SDK control request).

## Imports
- **Internal**: `AppState` type, `Tools`, `ToolUseContext`, `AgentDefinitionsResult`, `Message` type, `analyzeContextUsage`, `formatTokens`, `getMessagesAfterCompactBoundary`, `getSourceDisplayName`

## Logic
`collectContextData` is the shared data collection function: applies the same transforms as the interactive version (compact boundary, projectView, microcompact) then calls `analyzeContextUsage`. `call` invokes `collectContextData` and formats the result as a markdown table with `formatContextAsMarkdownTable`, returning a text result.

## Exports
- `collectContextData` - Shared function to collect context data
- `call` - Local command function returning markdown text
