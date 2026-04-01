# state/AppState

## Purpose
React context provider and re-exports for application state management, providing a centralized store for UI state, permissions, MCP connections, tasks, and plugins.

## Imports
- **Stdlib**: `crypto` (UUID)
- **External**: `react`, `zod`
- **Internal**: `MailboxProvider`, `VoiceProvider`, `useSettingsChange`, `createStore`, `AppStateStore`, tools, permissions, settings utilities

## AppState Type

Application state is defined in `AppStateStore.ts` as a DeepImmutable type with the following sections:

### Settings & Display
- `settings: SettingsJson` - User settings
- `verbose: boolean` - Verbose mode
- `mainLoopModel: ModelSetting` - Primary model
- `mainLoopModelForSession: ModelSetting` - Session model override
- `statusLineText: string | undefined` - Status line text
- `expandedView: 'none' | 'tasks' | 'teammates'` - Current expanded view
- `isBriefOnly: boolean` - Brief-only mode
- `showTeammateMessagePreview?: boolean` - Agent preview (ANT-only)
- `selectedIPAgentIndex: number` - Selected agent index
- `coordinatorTaskIndex: number` - Coordinator task selection (-1=pill, 0=main, 1+=agent rows)
- `viewSelectionMode: 'none' | 'selecting-agent' | 'viewing-agent'` - View selection mode
- `footerSelection: FooterItem | null` - Footer pill focus

### Permissions
- `toolPermissionContext: ToolPermissionContext` - Tool permission rules and mode
- `spinnerTip?: string` - Spinner tip text

### Session & Agent
- `agent: string | undefined` - Agent name from CLI flag
- `kairosEnabled: boolean` - Assistant mode enabled
- `remoteSessionUrl: string | undefined` - Remote session URL

### Remote Bridge State
- `remoteConnectionStatus: 'connecting' | 'connected' | 'reconnecting' | 'disconnected'`
- `remoteBackgroundTaskCount: number` - Background tasks in remote daemon
- `replBridgeEnabled: boolean` - Bridge enabled
- `replBridgeExplicit: boolean` - Bridge explicitly activated
- `replBridgeOutboundOnly: boolean` - Outbound-only mode
- `replBridgeConnected: boolean` - Bridge environment registered
- `replBridgeSessionActive: boolean` - Bridge WS open
- `replBridgeReconnecting: boolean` - Bridge in error backoff
- `replBridgeConnectUrl: string | undefined` - Bridge connect URL
- `replBridgeSessionUrl: string | undefined` - Bridge session URL
- `replBridgeEnvironmentId: string | undefined` - Bridge environment ID
- `replBridgeSessionId: string | undefined` - Bridge session ID
- `replBridgeError: string | undefined` - Bridge error message
- `replBridgeInitialName: string | undefined` - Bridge session name
- `showRemoteCallout: boolean` - First-time remote dialog pending

### Tasks & Agents
```typescript
tasks: { [taskId: string]: TaskState }
agentNameRegistry: Map<string, AgentId>
foregroundedTaskId?: string
viewingAgentTaskId?: string
```

### MCP State
```typescript
mcp: {
  clients: MCPServerConnection[]
  tools: Tool[]
  commands: Command[]
  resources: Record<string, ServerResource[]>
  pluginReconnectKey: number
}
```

### Plugins
```typescript
plugins: {
  enabled: LoadedPlugin[]
  disabled: LoadedPlugin[]
  commands: Command[]
  errors: PluginError[]
  installationStatus: {
    marketplaces: Array<{
      name: string
      status: 'pending' | 'installing' | 'installed' | 'failed'
      error?: string
    }>
  }
}
```

## State Tracked

### 1. UI State
- View selection modes (none, selecting-agent, viewing-agent)
- Expanded view states (none, tasks, teammates)
- Footer selection for keyboard navigation
- Spinner tips

### 2. Permission State
- Tool permission context with rules (alwaysAllow, alwaysDeny, alwaysAsk)
- Permission mode (default, bypass, auto, etc.)
- Additional working directories

### 3. Session State
- Model configuration per session
- Remote session URLs and connection status
- Conversation IDs

### 4. Task/Agent State
- Running tasks by ID
- Agent name registry for routing
- Foregrounded task for message display
- Viewing state for teammate transcripts

### 5. MCP/Plugin State
- MCP client connections
- MCP tools and resources
- Plugin loading status and errors
- Plugin marketplace installation state

### 6. Bridge State
- Always-on bridge connection state
- Session URLs and IDs
- Error states and reconnection status

## AppStateProvider Component

```typescript
type Props = {
  children: React.ReactNode
  initialState?: AppState
  onChangeAppState?: (args: { newState: AppState; oldState: AppState }) => void
}
```

- Wraps children with MailboxProvider and VoiceProvider
- Creates a Zustand-style store via `createStore()`
- Handles bypass permissions mode setup
- Integrates with settings change system

## Exports
- `AppStoreContext` - React context for store access
- `AppStateProvider` - Provider component
- `AppState` - Application state type
- `AppStateStore` - Store interface type
- `getDefaultAppState()` - Factory for default state
- `IDLE_SPECULATION_STATE` - Speculation idle state constant
- `SpeculationResult`, `SpeculationState` - Speculation types
- `CompletionBoundary` - Task completion type
