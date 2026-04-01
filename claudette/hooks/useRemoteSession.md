# useRemoteSession

## Purpose
Manages a remote CCR (Claudette Remote) session via WebSocket, handling messaging, permissions, and session lifecycle.

## Imports
- **Stdlib**: `useCallback`, `useEffect`, `useMemo`, `useRef` from 'react'
- **External**: None
- **Internal**: `BoundedUUIDSet`, `ToolUseConfirm`, `SpinnerMode`, `RemotePermissionResponse`, `RemoteSessionConfig`, `RemoteSessionManager`, `createSyntheticAssistantMessage`, `createToolStub`, `convertSDKMessage`, `isSessionEndMessage`, `useSetAppState`, `AppState`, `Tool`, `findToolByName`, `Message`, `PermissionAskDecision`, `logForDebugging`, `truncateToWidth`, `createSystemMessage`, `extractTextContent`, `handleMessageFromStream`, `StreamingToolUse`, `generateSessionTitle`, `updateSessionTitle`, `RemoteMessageContent`

## Logic
1. Manages WebSocket connection to CCR with heartbeat timeout (60s, 3min during compaction)
2. Filters echoed user messages using BoundedUUIDSet
3. Tracks remote subagent lifecycle for "N in background" counter
4. Handles streaming tool uses and in-progress tool_use IDs
5. Manages permission request/response flow
6. Updates session title after first message (unless viewerOnly)
7. Tracks compaction state for extended timeouts
8. Handles reconnection with status updates

## Exports
- `useRemoteSession` - Hook returning isRemoteMode, sendMessage, cancelRequest, disconnect
