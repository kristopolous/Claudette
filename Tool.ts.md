# Tool.ts

## Purpose
Defines the Tool interface and ToolUseContext for Claude Code's tool system, including tool execution, permissions, and progress tracking.

## Imports
- **External**: `@anthropic-ai/sdk`, `@modelcontextprotocol/sdk/types`, `zod`
- **Internal**: Various types from `./commands`, `./hooks`, `./types`, `./services/mcp`, `./utils/*`

## Tool Interface Definition

The `Tool` type represents a callable tool with the following properties:

### Core Properties
- `name: string` - Unique identifier for the tool
- `description(input, options)` - Returns a human-readable description for the model
- `inputSchema` - Zod schema defining the tool's input parameters
- `call(args, context, canUseTool, parentMessage, onProgress)` - Executes the tool

### Optional Properties
- `aliases?: string[]` - Alternative names for backwards compatibility
- `searchHint?: string` - Keyword hint for ToolSearch keyword matching
- `inputJSONSchema?: ToolInputJSONSchema` - JSON Schema format for MCP tools
- `outputSchema?: z.ZodType` - Zod schema for tool output
- `isConcurrencySafe(input): boolean` - Whether tool can run concurrently
- `isEnabled(): boolean` - Whether tool is currently enabled
- `isReadOnly(input): boolean` - Whether tool only reads data
- `isDestructive?(input): boolean` - Whether tool performs irreversible operations
- `interruptBehavior?(): 'cancel' | 'block'` - How to handle new messages during execution
- `isSearchOrReadCommand?(input)` - Indicates if tool is a search/read/list operation
- `isOpenWorld?(input): boolean` - Whether tool contacts external services
- `requiresUserInteraction?(): boolean` - Whether tool needs user input
- `isMcp?: boolean` - Whether this is an MCP tool
- `isLsp?: boolean` - Whether this is an LSP tool
- `shouldDefer?: boolean` - Tool requires ToolSearch before calling
- `alwaysLoad?: boolean` - Never defer this tool
- `mcpInfo?: { serverName, toolName }` - MCP server and tool names
- `maxResultSizeChars: number` - Max result size before persisting to disk
- `strict?: boolean` - Enable strict mode for tool instructions

### Methods
- `backfillObservableInput?(input)` - Mutate tool input before observers see it
- `validateInput?(input, context)` - Check if tool is allowed with this input
- `checkPermissions(input, context)` - Determine if user permission is needed
- `getPath?(input): string` - Get file path for path-based tools
- `preparePermissionMatcher?(input)` - Create matcher for hook permission rules
- `prompt(options)` - Generate the tool's system prompt section
- `userFacingName(input)` - Short display name for the tool
- `userFacingNameBackgroundColor?(input)` - Theme color for display
- `isTransparentWrapper?()` - Whether REPL delegates all rendering
- `getToolUseSummary?(input)` - Short summary for compact views
- `getActivityDescription?(input)` - Activity description for spinner
- `toAutoClassifierInput(input)` - Input for auto-mode security classifier
- `mapToolResultToToolResultBlockParam(content, toolUseID)` - Convert result to API format
- `renderToolResultMessage?(content, progressMessages, options)` - Render result for UI
- `getTranscriptText?(content)` - Flattened text for transcript search indexing

## ToolUseContext

Context passed to tools when they are executed:

### options
- `commands: Command[]` - Available CLI commands
- `debug: boolean` - Debug mode flag
- `mainLoopModel: string` - Current model being used
- `tools: Tools` - All available tools
- `verbose: boolean` - Verbose output flag
- `thinkingConfig: ThinkingConfig` - Extended thinking configuration
- `mcpClients: MCPServerConnection[]` - Connected MCP servers
- `mcpResources: Record<string, ServerResource[]>` - MCP server resources
- `isNonInteractiveSession: boolean` - Non-interactive mode flag
- `agentDefinitions: AgentDefinitionsResult` - Available agent definitions
- `maxBudgetUsd?: number` - Optional budget limit
- `customSystemPrompt?: string` - Override system prompt
- `appendSystemPrompt?: string` - Additional system prompt
- `querySource?: QuerySource` - Query origin for analytics
- `refreshTools?: () => Tools` - Callback to get latest tools

### Other Properties
- `abortController: AbortController` - For cancelling operations
- `readFileState: FileStateCache` - File state cache
- `getAppState(): AppState` - Get current application state
- `setAppState(f)` - Update application state
- `setAppStateForTasks?(f)` - State setter for background tasks
- `handleElicitation?()` - Handler for URL elicitations
- `setToolJSX?()` - Set JSX output for REPL
- `addNotification?()` - Add a notification
- `appendSystemMessage?()` - Add system message to REPL
- `sendOSNotification?()` - Send OS-level notification
- `messages: Message[]` - Conversation history
- `setInProgressToolUseIDs(f)` - Track tool executions
- `setResponseLength(f)` - Track response length
- `updateFileHistoryState(f)` - Update file history
- `updateAttributionState(f)` - Update commit attribution state
- `setConversationId?(id)` - Set conversation ID
- `agentId?: AgentId` - Subagent identifier
- `toolDecisions?: Map<string, { source, decision, timestamp }>` - Tool permission decisions
- `queryTracking?: QueryChainTracking` - Query chain tracking
- `requestPrompt?()` - Request interactive prompts
- `contentReplacementState?` - Tool result budget state
- `renderedSystemPrompt?` - Frozen system prompt for subagents

## ToolPermissionContext

Permission context for tools (DeepImmutable):

- `mode: PermissionMode` - Current permission mode
- `additionalWorkingDirectories: Map<string, AdditionalWorkingDirectory>` - Extra allowed directories
- `alwaysAllowRules: ToolPermissionRulesBySource` - Rules that auto-allow
- `alwaysDenyRules: ToolPermissionRulesBySource` - Rules that auto-deny
- `alwaysAskRules: ToolPermissionRulesBySource` - Rules that prompt
- `isBypassPermissionsModeAvailable: boolean` - Whether bypass mode is available
- `isAutoModeAvailable?: boolean` - Whether auto mode is available
- `strippedDangerousRules?: ToolPermissionRulesBySource` - Dangerous rules removed
- `shouldAvoidPermissionPrompts?: boolean` - Auto-denied prompts (background agents)
- `awaitAutomatedChecksBeforeDialog?: boolean` - Await classifier/hooks before dialog
- `prePlanMode?: PermissionMode` - Permission mode before plan mode

## ToolProgress and Results

### Progress Tracking
- `ToolProgress<P>` - Progress event with `toolUseID` and `data: P`
- `ToolCallProgress<P>` - Callback type for progress updates
- `Progress = ToolProgressData | HookProgress` - Union of all progress types

### Tool Results
- `ToolResult<T>` - Tool execution result containing:
  - `data: T` - The result data
  - `newMessages?` - Additional messages to add to conversation
  - `contextModifier?` - Modify context for non-concurrency-safe tools
  - `mcpMeta?` - MCP protocol metadata

## Exports
- `Tool` - Tool interface type
- `Tools` - Array of Tool type
- `ToolUseContext` - Execution context for tools
- `ToolPermissionContext` - Permission rules and mode
- `ToolResult<T>` - Result wrapper type
- `ToolProgress<P>` - Progress event type
- `getEmptyToolPermissionContext()` - Factory for empty permission context
- `toolMatchesName()` - Check if tool matches name or alias
- `findToolByName()` - Find tool by name from array
- `filterToolProgressMessages()` - Filter progress messages
