# client.ts

## Purpose
Manages MCP (Model Context Protocol) server connections, tool fetching, and tool execution. Handles multiple transport types (stdio, SSE, HTTP, WebSocket) and provides authentication, session management, and result processing.

## Imports
- **Stdlib**: `fs/promises`, `path`, `child_process`
- **External**: `@modelcontextprotocol/sdk/client`, `@modelcontextprotocol/sdk/client/sse`, `@modelcontextprotocol/sdk/client/stdio`, `@modelcontextprotocol/sdk/client/streamableHttp`, `@modelcontextprotocol/sdk/types`, `lodash-es`, `p-map`, `@anthropic-ai/sdk`
- **Internal**: Various MCP-related utilities from `./elicitationHandler`, `./auth`, `./config`, `./types`, tool implementations (`MCPTool`, `ListMcpResourcesTool`, etc.), and utility functions from `../../utils/*`

## Connection Management

### Server Connection (`connectToServer`)
The core function that establishes connections to MCP servers with support for multiple transport types:

**Transport Types:**
- **`stdio`** - Local subprocess communication via StdioClientTransport
- **`sse`** - Server-Sent Events via SSEClientTransport with OAuth/auth support
- **`http`** - Streamable HTTP via StreamableHTTPClientTransport
- **`ws`** - WebSocket communication via custom WebSocketTransport
- **`sse-ide`** - IDE SSE connections (no auth required)
- **`ws-ide`** - IDE WebSocket connections with auth token header
- **`claudeai-proxy`** - Claude.ai proxy for MCP servers via StreamableHTTPClientTransport
- **`sdk`** - In-process SDK servers

**Connection Features:**
- Configurable timeout (default 30s, via `MCP_TIMEOUT` env var)
- Stderr logging for stdio transports (capped at 64MB)
- Session ingress token support for remote connections
- OAuth token handling with automatic refresh
- Proxy and TLS configuration support
- In-process server support for Chrome and Computer Use MCP servers

### Session Management
- **McpSessionExpiredError** - Thrown when MCP session is invalid (HTTP 404 + JSON-RPC -32001)
- **isMcpSessionExpiredError()** - Detects expired sessions by checking error code and message
- **clearServerCache()** - Clears connection and fetch caches for a server
- **ensureConnectedClient()** - Returns cached client or reconnects if cache was cleared

### Auth Cache
- 15-minute TTL cache for servers that returned 401 (`MCP_AUTH_CACHE_TTL_MS`)
- Prevents repeated connection attempts to servers that need authentication
- Path: `~/.claude/mcp-needs-auth-cache.json`

## Tool Fetching

### fetchToolsForClient
Fetches and transforms MCP tools into the Tool interface:
- Converts MCP tool names to fully qualified names (`mcp__serverName__toolName`)
- Extracts `searchHint` and `alwaysLoad` from `_meta` annotations
- Truncates descriptions exceeding 2048 characters
- Respects `CLAUDE_AGENT_SDK_MCP_NO_PREFIX` for SDK servers
- Supports tool-specific features: concurrency safety, read-only hints, destructive flags

### fetchResourcesForClient
Fetches available resources from an MCP server:
- Returns resources with server name attached
- Schema: `{ uri, name, description?, mimeType?, ... }`

### fetchCommandsForClient
Fetches MCP prompts as CLI commands:
- Converts prompts to `Command` interface
- Namespaced as `mcp__serverName__promptName`
- Supports dynamic prompt retrieval with arguments

## Tool Execution

### callMCPTool
Low-level tool call implementation:
- Timeout support (default ~27.8 hours via `MCP_TOOL_TIMEOUT`)
- Progress tracking every 30 seconds for long-running tools
- Error wrapping for telemetry (McpError codes, session expiry)
- 401 handling for expired tokens
- Session expiry detection and cache clearing

### callMCPToolWithUrlElicitationRetry
Handles URL elicitation errors (-32042):
- Retries up to 3 times on URL elicitation
- Supports hook-based resolution via `runElicitationHooks`
- Two-phase flow: consent dialog, then waiting state
- Handles accept/decline/cancel actions

### callIdeRpc
Direct RPC call for IDE tools without full result processing.

## Result Processing

### processMCPResult
Handles large tool results:
- Truncates content exceeding token limits
- Persists large outputs to disk when `ENABLE_MCP_LARGE_OUTPUT_FILES` is enabled
- Falls back to truncation for image content or persist failures

### transformMCPResult
Normalizes MCP response formats:
- `toolResult` - Direct string content
- `structuredContent` - JSON structure with inferred schema
- `contentArray` - Array of content blocks (text, images, audio, resources)

### transformResultContent
Transforms PromptMessage content to ContentBlockParam:
- `text` - Direct text blocks
- `audio` - Base64 audio persisted to file
- `image` - Base64 images resized/compressed
- `resource` - Resources (text, blob, or image)
- `resource_link` - Resource links

## Batch Processing

### getMcpToolsCommandsAndResources
Connects to all configured MCP servers with batching:
- Local servers (stdio/sdk): batch size 3 (via `MCP_SERVER_CONNECTION_BATCH_SIZE`)
- Remote servers (SSE/HTTP/WS): batch size 20 (via `MCP_REMOTE_SERVER_CONNECTION_BATCH_SIZE`)
- Skips servers in needs-auth cache
- Adds ListMcpResourcesTool and ReadMcpResourceTool once if resources are supported

### prefetchAllMcpResources
Preloads all MCP resources at startup:
- Collects all clients, tools, and commands
- Logs telemetry event with counts and metadata length

## SDK MCP Clients

### setupSdkMcpClients
Creates in-process MCP server connections:
- Uses SdkControlClientTransport for message routing
- Returns connected clients and their tools
- Handles connection failures gracefully

## Error Classes

- **McpAuthError** - Authentication failure (401)
- **McpSessionExpiredError** - Session expired during tool call
- **McpToolCallError** - Tool returned `isError: true`

## Exports
- `McpAuthError` - Auth error class
- `McpToolCallError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` - Tool call error class
- `isMcpSessionExpiredError()` - Check for session expiry
- `connectToServer` - Connect to an MCP server
- `clearServerCache()` - Clear caches for a server
- `ensureConnectedClient()` - Get valid connected client
- `areMcpConfigsEqual()` - Compare server configs
- `fetchToolsForClient` - Fetch tools from a server
- `fetchResourcesForClient` - Fetch resources from a server
- `fetchCommandsForClient` - Fetch commands/prompts from a server
- `callIdeRpc()` - Call IDE tool directly
- `reconnectMcpServerImpl()` - Reconnect and refetch resources
- `getMcpToolsCommandsAndResources()` - Batch connect all servers
- `prefetchAllMcpResources()` - Prefetch all resources
- `transformResultContent()` - Transform content blocks
- `transformMCPResult()` - Normalize tool results
- `processMCPResult()` - Process and truncate results
- `setupSdkMcpClients()` - Set up SDK in-process servers
- `mcpToolInputToAutoClassifierInput()` - Encode tool input for classifier
- `mcpBaseUrlAnalytics()` - Get analytics-safe base URL
- `wrapFetchWithTimeout()` - Wrap fetch with timeout
- `createClaudeAiProxyFetch()` - Create auth-aware proxy fetch
- `clearMcpAuthCache()` - Clear auth cache
