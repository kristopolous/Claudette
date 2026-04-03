## Purpose
Manages the interactive permission dialog for tool use, racing local hooks, classifier, bridge (Remote Control), and channel relays (Telegram/iMessage) to produce a single decision, while keeping the permission UI queue in sync.

## Imports
- **Stdlib**: `crypto.randomUUID`
- **External**: BUILDFLAGS (`feature`), `@anthropic-ai/sdk` (`ContentBlockParam` type)
- **Internal** (selected):
  - `bootstrap/state` - `getAllowedChannels`, classifier approval setters
  - `bridge/bridgePermissionCallbacks` - `BridgePermissionCallbacks`
  - `ink/terminal-focus-state` - `getTerminalFocused`
  - `services/mcp/channelNotification` - `CHANNEL_PERMISSION_REQUEST_METHOD`, types
  - `services/mcp/channelPermissions` - helpers
  - `tools/BashTool/bashPermissions` - `executeAsyncClassifierCheck`
  - `tools/BashTool/toolName` - `BASH_TOOL_NAME`
  - `utils/classifierApprovals` - classifier state setters
  - `utils/errors` - `errorMessage`
  - `utils/permissions/PermissionResult` - `PermissionDecision`
  - utils/permissions/permissions` - `hasPermissionsToUseTool`
  - `hooks/toolPermission/PermissionContext` - `PermissionContext`, `createResolveOnce`

## Logic
- `handleInteractivePermission(params, resolve)`:
  - Creates a `resolveOnce` guard to ensure a single resolution. Tracks `userInteracted` and a checkmark transition timer.
  - Pushes a `ToolUseConfirm` to the permission queue with callbacks:
    - `onUserInteraction`: Clears classifier state after 200ms grace; sets `userInteracted`.
    - `onDismissCheckmark`: Clears timer and abort handler, removes the queue entry.
    - `onAbort`: Logs cancellation, sends bridge cancel if present, resolves with `cancelAndAbort`.
    - `onAllow`: Sends bridge allow response, resolves via `handleUserAllow`.
    - `onReject`: Sends bridge deny response, resolves with `cancelAndAbort`.
    - `recheckPermission`: Re-runs `hasPermissionsToUseTool`; if now allowed by config, resolves and cancels bridge prompt.
  - Bridge race: Sends request via `bridgeCallbacks`; response resolves allow/deny and logs.
  - Channel relay: If KAIROS feature flag and channels present, sends permission requests via MCP `send_message`; response resolves allow/deny and cancels bridge.
  - Hooks: If `!awaitAutomatedChecksBeforeDialog`, runs `runHooks` async; if resolves first, cleans up and resolves.
  - Bash classifier: If applicable, runs `executeAsyncClassifierCheck`; on allow, may (a) persist classifier approval, (b) show checkmark for 3s (focused) or 1s (unfocused) before auto-removing, (c) resolve with `buildAllow(decisionReason)`; errors are logged only.
- Each racer uses `claim()` to ensure only the first winner resolves.

## Exports
- `handleInteractivePermission` - function
- `InteractivePermissionParams` - type
