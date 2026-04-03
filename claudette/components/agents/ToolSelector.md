## Purpose
Provides an interactive UI component for selecting which tools an agent can access.

## Imports
- **External**: figures, REACT, REACT/compiler-runtime
- **Internal**: src/services/mcp/mcpStringUtils,src/services/mcp/utils,src/Tool,src/tools/AgentTool/agentToolUtils,src/tools/AgentTool/constants, various tool modules (BashTool, ExitPlanModeV2Tool, FileEditTool, FileReadTool, FileWriteTool, GlobTool, GrepTool, ListMcpResourcesTool, NotebookEditTool, ReadMcpResourceTool, TaskOutputTool, TaskStopTool, TodoWriteTool, TungstenTool, WebFetchTool, WebSearchTool), ink/events/keyboardevent,ink,keybindings/useKeybinding, utils/array, utils/stringUtils, design-system/Divider

## Logic
Categorizes available tools into buckets (read-only, edit, execution, MCP, other) and renders a navigable list with checkboxes. Supports bulk selection by category, individual tool toggling, MCP server grouping, keyboard navigation, and returns the final selection or undefined for "all tools".

## Exports
- `ToolSelector` - renders an interactive tool selection interface with categorized buckets and keyboard navigation
