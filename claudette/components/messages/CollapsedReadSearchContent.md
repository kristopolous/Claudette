## Purpose
Renders a collapsed summary of grouped read/search tool operations with live progress hints and optional verbose detail.

## Imports
- **Stdlib**: path (basename)
- **External**: REACT, BUILDFLAGS
- **Internal**: ink (Ansi, Box, Text, useTheme), Tool, useMinDisplayTime, useSelectedMessageBg, CtrlOToExpand, PrBadge, ToolUseLoader, messageActions, collapseReadSearch utils, file utils, format utils, fullscreen utils, messages utils, array utils, teamMemCollapsed (feature-gated)

## Logic
1. Extracts counts for search, read, list, repl, memory, MCP, and bash operations from the collapsed group
2. Uses max refs to prevent count jitter during streaming
3. Determines the current display hint from the latest operation or active REPL progress
4. In verbose mode, renders each tool use with its result summary, hook info, and recalled memories
5. In non-verbose mode, builds a comma-separated summary of operations (git ops, search, read, list, repl, MCP, bash, memory) with proper tense based on active/completed state
6. Shows shell progress suffix for long-running bash commands (after 2s)
7. Displays a minimum-duration hint row with ⎿ prefix for the current operation

## Exports
- `CollapsedReadSearchContent` - UI component rendering collapsed read/search group summaries
