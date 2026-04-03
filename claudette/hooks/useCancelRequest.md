# useCancelRequest

## Purpose
Handles cancel/escape keybindings for the REPL, managing task cancellation, queue popping, and agent termination.

## Imports
- **Stdlib**: `useCallback`, `useRef` from 'REACT'
- **External**: None
- **Internal**: `logEvent`, `useAppState`, `useAppStateStore`, `useSetAppState`, `isVimModeEnabled`, `ToolUseConfirm`, `SpinnerMode`, `useNotifications`, `useIsOverlayActive`, `useCommandQueue`, `getShortcutDisplay`, `useKeybinding`, `Screen`, `exitTeammateView`, `killAllRunningAgentTasks`, `markAgentsNotified`, `PromptInputMode`, `VimMode`, `clearCommandQueue`, `enqueuePendingNotification`, `hasCommandsInQueue`, `emitTaskTerminatedSdk`

## Logic
1. Handles Escape (chat:cancel) with priority: cancel task > pop queue > fallback
2. Handles Ctrl+C (app:interrupt) with two-press pattern to kill all agents
3. Context guards: inactive when other screens/overlays own escape
4. teammate-view mode: Ctrl+C kills agents and exits view
5. Uses useKeybinding for registration with proper context/isActive

## Exports
- `CancelRequestHandler` - Component that registers cancel keybindings (renders null)
