# useDirectConnect

## Purpose
Manages a direct WebSocket connection to a CLI server process (claude --direct-connect).

## Imports
- **Stdlib**: `useCallback`, `useEffect`, `useMemo`, `useRef` from 'REACT'
- **External**: None
- **Internal**: `ToolUseConfirm`, `createSyntheticAssistantMessage`, `createToolStub`, `convertSDKMessage`, `isSessionEndMessage`, `DirectConnectConfig`, `DirectConnectSessionManager`, `Tool`, `findToolByName`, `Message`, `PermissionAskDecision`, `RemotePermissionResponse`, `logForDebugging`, `gracefulShutdown`, `RemoteMessageContent`

## Logic
1. Creates DirectConnectSessionManager with message, permission, connected, disconnected, error handlers
2. Converts SDK messages to REPL messages
3. Creates synthetic messages for permission requests
4. Handles permission responses (allow/deny/abort)
5. Manages WebSocket lifecycle and reconnection
6. Writes to stderr on connection failure/disconnect

## Exports
- `useDirectConnect` - Hook returning isRemoteMode, sendMessage, cancelRequest, disconnect
