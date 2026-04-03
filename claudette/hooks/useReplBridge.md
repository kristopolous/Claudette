## Purpose
Manages the persistent WebSocket bridge connection to claude.ai (Remote Control), relaying messages back and forth, handling tool permission requests, and maintaining connection lifecycle (init, reconnection, teardown).

## Imports
- **Stdlib**: None
- **External**: BUILDFLAGS (`feature`), REACT (`useCallback`, `useEffect`, `useRef`)
- **Internal** (selected):
  - `bootstrap/state` - `setMainLoopModelOverride`
  - `bridge/*` - init, permission callbacks, status utils, inbound handling
  - `commands` - `Command`, `getSlashCommandToolSkills`, `isBridgeSafeCommand`
  - `constants/product` - `getRemoteSessionUrl`
  - `context/notifications` - `useNotifications`
  - `entrypoints/agentSdkTypes` - `PermissionMode`, `SDKMessage`, `SDKControlResponse`
  - `ink` - `Text`
  - `services/analytics/growthbook` - `getFeatureValue_CACHED_MAY_BE_STALE`
  - `state/AppState` - `useAppState`, `useAppStateStore`, `useSetAppState`
  - `types/message` - `Message`
  - `utils/cwd` - `getCwd`
  - `utils/debug` - `logForDebugging`
  - `utils/errors` - `errorMessage`
  - `utils/messageQueueManager` - `enqueue`
  - `utils/messages` - message builders
  - `utils/permissions/permissionSetup` - permission mode guards/transitions
  - `utils/swarm/leaderPermissionBridge` - `getLeaderToolUseConfirmQueue`

## Logic
- Feature-gated by `BRIDGE_MODE`. When enabled, subscribes to `replBridgeEnabled`, `replBridgeConnected`, `replBridgeOutboundOnly`, `replBridgeInitialName`.
- First effect: when enabled, initializes bridge via `initReplBridge` (dynamic import). Handles:
  - Premption: waits for prior teardown to avoid race.
  - Assistant mode (KAIROS) perpetual session.
  - Inbound message injection: resolves attachments, sanitizes webhooks, enqueues user messages.
  - State change handler: updates AppState for `ready`, `connected`, `reconnecting`, `failed` states; sends system/init on `connected` if feature enabled; manages failure notifications and 10s auto-disable; caps consecutive failures at 3 to prevent 401 spam.
  - Permission callbacks: bridges tool permission requests to the server and routes responses.
  - On success: sets `handleRef`, stores in `replBridgeHandle`, updates AppState with URLs/IDs, inserts bridge status into transcript.
  - On failure: logs, sets error, schedules auto-disable after 10s; shows system message (unless outboundOnly).
  - Cleanup: tears down handle, clears AppState bridge fields.
- Second effect: when connected, forwards new `user`/`assistant`/`system:local_command` messages to bridge via `handle.writeMessages`. Tracks `lastWrittenIndexRef` to avoid duplicates and handles array compaction.
- `sendBridgeResult` callback: invokes `handle.sendResult()` (e.g., for tool result forwarding).
- Uses multiple refs (`messagesRef`, `commandsRef`, `mainLoopModelRef`) to capture latest values without triggering effects.

## Exports
- `useReplBridge` - hook accepting `(messages, setMessages, abortControllerRef, commands, mainLoopModel)` and returning `{ sendBridgeResult }`
- `BRIDGE_FAILURE_DISMISS_MS` - constant (10000)
- `MAX_CONSECUTIVE_INIT_FAILURES` - constant (3)
