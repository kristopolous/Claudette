# utils/collapseReadSearch

## Purpose
Provides read/search operation collapsing for UI display optimization.

## Imports
- **Stdlib**: `crypto`
- **External**: BUILDFLAGS
- **Internal**: Tool, BashTool commentLabel/toolName, FileEditTool, FileWriteTool, REPLTool/primitiveTools, gitOperationTracking, ToolSearchTool, message types, file, fullscreen, memoryFileDetection, teamMemoryOps, SnipTool

## Logic
1. `SearchOrReadResult` - { isCollapsible, isSearch, isRead, isList, isREPL, isMemoryWrite, isAbsorbedSilently, mcpServerName, isBash }
2. `isAbsorbedSilently` - true for meta-operations (Snip, ToolSearch) that don't increment counts
3. `getFilePathFromToolInput` - extracts file/directory path from tool input
4. Handles file_path (Read/Write/Edit), path (Grep/Glob), pattern, glob
5. `isSearchOrReadToolUse` - checks if tool use is search/read operation
6. `getSearchOrReadFromContent` - extracts search/read info from content block
7. `getSearchReadSummaryText` - generates summary text for collapsed group
8. `collapseReadSearchGroups` - collapses consecutive read/search operations
9. Handles memory file detection for auto-managed memory
10. Handles REPL primitive tools
11. Handles git operation tracking (branch/PR actions)
12. Handles fullscreen mode for bash commands
13. TEAMMEM feature-gated team memory operations
14. HISTORY_SNIP feature-gated SnipTool

## Exports
- `SearchOrReadResult` - search/read result type
- `getFilePathFromToolInput` - extracts file path
- `isSearchOrReadToolUse` - checks search/read tool use
- `getSearchOrReadFromContent` - extracts from content
- `getSearchReadSummaryText` - generates summary text
- `collapseReadSearchGroups` - collapses groups
