# tools/AgentTool/UI

## Purpose
Provides React components for rendering agent tool messages and progress.

## Imports
- **Stdlib**: (none)
- **External**: `react/compiler-runtime`, `@anthropic-ai/sdk`, `react`, `zod/v4`
- **Internal**: ConfigurableShortcutHint, CtrlOToExpand, design-system components, FallbackToolUse components, Markdown, Message components, ToolUseLoader, ink components, API dumpPrompts, Tool, message types, tools types, array utils, collapseReadSearch, file, format, messages, model agent/aliases, theme, AgentTool types/schemas, agentColorManager, built-in agents

## Logic
1. `MAX_PROGRESS_MESSAGES_TO_SHOW` (3) - max progress messages visible
2. `hasProgressMessage` - guards progress data has message field
3. Filters out bash_progress forwarded from sub-agents
4. `getSearchOrReadInfo` - checks if progress is search/read/REPL operation
5. Uses toolUseByID map for tool_result messages
6. Returns { isSearch, isRead, isREPL } or null
7. `userFacingName` - gets user-facing agent type name
8. `userFacingNameBackgroundColor` - gets background color for name
9. `renderToolUseMessage` - renders agent tool use
10. `renderToolUseTag` - renders tool use tag with color
11. `renderToolUseRejectedMessage` - renders rejected tool use
12. `renderToolUseErrorMessage` - renders error message with fallback
13. `renderToolUseProgressMessage` - renders progress with collapse
14. `renderToolResultMessage` - renders tool result
15. `renderGroupedAgentToolUse` - renders grouped agent tool uses
16. AgentProgressLine component for progress display
17. SubAgentProvider for agent context
18. Ctrl+O to expand shortcut hint

## Exports
- `MAX_PROGRESS_MESSAGES_TO_SHOW` - max progress messages constant
- `hasProgressMessage` - progress message guard
- `getSearchOrReadInfo` - gets search/read info from progress
- `userFacingName` - gets user-facing agent name
- `userFacingNameBackgroundColor` - gets name background color
- `renderToolUseMessage` - renders tool use
- `renderToolUseTag` - renders tool use tag
- `renderToolUseRejectedMessage` - renders rejected tool use
- `renderToolUseErrorMessage` - renders error message
- `renderToolUseProgressMessage` - renders progress
- `renderToolResultMessage` - renders tool result
- `renderGroupedAgentToolUse` - renders grouped tool uses
