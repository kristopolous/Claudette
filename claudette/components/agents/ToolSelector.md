## Purpose
A sophisticated, interactive multi-select component used to assign specific capabilities (tools) to an agent, featuring logical categorization and dynamic support for external tool providers.

## Imports
- **Stdlib**: None
- **External**: `figures`, `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `services/mcp/mcpStringUtils`, `services/mcp/utils`, `Tool`, `tools/AgentTool/agentToolUtils`, `tools/AgentTool/constants`, `tools/BashTool/BashTool`, `tools/FileEditTool/FileEditTool`, `tools/FileReadTool/FileReadTool`, `tools/WebSearchTool/WebSearchTool` (and other tool definitions), `keybindings/useKeybinding`, `utils/array`, `utils/stringUtils`, `components/design-system/Divider`

## Logic
1. **Tool Categorization (Bucketing)**: 
    - Organizes available tools into predefined functional categories: **Read-only** (e.g., file reading, searching), **Edit** (e.g., file modification), **Execution** (e.g., terminal commands), and **Other**.
    - Dynamically identifies and groups tools provided by external **Model Context Protocol (MCP)** servers, allowing users to manage them by their source server.
2. **Selection Hierarchies**:
    - **Global Selection**: A master toggle to select or deselect all available tools at once.
    - **Category Toggles**: Allows users to enable or disable entire functional groups (e.g., "all Read-only tools").
    - **Advanced Individual Selection**: Provides a granular list of every tool, categorized by category or MCP server, hidden behind an "Advanced options" toggle to maintain a clean interface for simple configurations.
3. **Interactive Terminal Navigation**:
    - Implements a custom focus management system for keyboard-driven navigation (`up`/`down` arrows) within the CLI environment.
    - Intelligent navigation logic automatically skips non-interactive elements like headers and dividers.
    - Uses the `Enter` key to toggle selections or confirm actions.
4. **State and Persistence**:
    - Maintains local state for current selections, focus position, and section expansion.
    - Maps the final selection back to a list of tool identifiers.
    - Implements an "All Tools" optimization: if every possible tool is selected, it returns `undefined` to signal that the agent has unrestricted access.
5. **UI and Feedback**:
    - Uses standard CLI symbols (e.g., `[x]`, `[ ]`, pointers) to indicate selection and focus states.
    - Displays a live count of selected tools versus the total available.

## Exports
- `ToolSelector` - A functional component that provides the interactive tool assignment interface for agent configuration.
