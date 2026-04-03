# useSSHSession

## Purpose
REPL integration hook for `claude ssh` sessions, managing SSH child process lifecycle and messaging.

## Imports
- **Stdlib**: `randomUUID` from 'crypto', `useCallback`, `useEffect`, `useMemo`, `useRef` from 'REACT'
- **External**: None
- **Internal**: `ToolUseConfirm`, `createSyntheticAssistantMessage`, `createToolStub`, `convertSDKMessage`, `isSessionEndMessage`, `SSHSession`, `SSHSessionManager`, `Tool`, `findToolByName`, `Message`, `PermissionAskDecision`, `logForDebugging`, `gracefulShutdown`, `RemoteMessageContent`

## Logic
1. Creates SSH session manager with message, permission, connected, reconnecting, disconnected, error handlers
2. Converts SDK messages to REPL messages for display
3. Creates synthetic assistant messages for permission requests
4. Handles permission request flow via ToolUseConfirm queue
5. Shows transient system messages on reconnection
6. Surfaces remote stderr on disconnect
7. Manages cleanup of SSH process and auth proxy

## Exports
- `useSSHSession` - Hook returning isRemoteMode, sendMessage, cancelRequest, disconnect
