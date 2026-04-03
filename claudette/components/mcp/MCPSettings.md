## Purpose
Serves as the main MCP settings component that manages view state and routes between different MCP management views.

## Imports
- **Stdlib**: None
- **External**: REACT (useEffect, useMemo), REACT_COMPILER
- **Internal**: `commands` (CommandResultDisplay), `services/mcp/auth` (ClaudeAuthProvider), `services/mcp/types` (McpClaudeAIProxyServerConfig, McpHTTPServerConfig, McpSSEServerConfig, McpStdioServerConfig), `services/mcp/utils` (extractAgentMcpServers, filterToolsByServer), `state/AppState` (useAppState), `utils/sessionIngressAuth` (getSessionIngressAuthToken), `MCPAgentServerMenu`, `MCPListPanel`, `MCPRemoteServerMenu`, `MCPStdioServerMenu`, `MCPToolDetailView`, `MCPToolListView`, `types` (AgentMcpServerInfo, MCPViewState, ServerInfo)

## Logic
1. Manages view state machine with states: list, server-menu, server-tools, server-tool-detail, agent-server-menu
2. Prepares server info objects on mount by filtering clients and determining authentication status
3. Routes to appropriate sub-component based on current view state
4. List view shows MCPListPanel with all servers
5. Server-menu view shows MCPStdioServerMenu or MCPRemoteServerMenu based on transport type
6. Server-tools view shows MCPToolListView for the selected server
7. Server-tool-detail view shows MCPToolDetailView for the selected tool
8. Agent-server-menu view shows MCPAgentServerMenu for agent-specific servers

## Exports
- `MCPSettings` - main MCP settings component that orchestrates all MCP management views
