## Purpose
Renders conversation messages with virtualization, grouping, collapsing, and streaming support for the terminal UI.

## Imports
- **Stdlib**: None
- **External**: `react`, `chalk`
- **Internal**: `ink`, `MessageRow`, `VirtualMessageList`, `StreamingMarkdown`, `LogoV2`, `StatusNotices`, `Divider`, `AssistantThinkingMessage`, `OffscreenFreeze`, message utilities, collapse utilities, grouping utilities, terminal hooks, keybinding hooks, permission components

## Logic
1. Normalizes and filters messages through multiple stages (compact boundary, grouping, collapsing of hooks/read-search/teammate shutdowns/bash notifications)
2. Applies a safety cap for non-virtualized rendering using UUID-based slice anchors to prevent scrollback shifts
3. Supports brief-only mode that filters to only Brief tool output and user input
4. Handles streaming tool uses and thinking blocks with deterministic React keys
5. Renders either via VirtualMessageList (fullscreen with virtual scroll) or flat map of MessageRow components
6. Implements custom memo comparator to prevent unnecessary re-renders during streaming
7. Tracks search text cache for transcript search with tool-specific extraction

## Exports
- `Messages` - memoized component that renders the full message list with streaming, virtualization, and grouping support
- `filterForBriefTool` - filters messages to show only Brief tool_use blocks, their results, and real user input
- `dropTextInBriefTurns` - drops assistant text in turns where Brief tool was called to avoid redundancy
- `computeSliceStart` - calculates the starting index for the non-virtualized message cap slice using UUID anchors
- `shouldRenderStatically` - determines if a message can be rendered statically (not streaming/in-progress)
