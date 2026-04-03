## Purpose
Manages session backgrounding via Ctrl+B: backgrounds the current query, re-backgrounds a foregrounded task, and syncs the foregrounded task's messages and loading state to the main view.

## Imports
- **Stdlib**: None
- **External**: REACT (`useCallback`, `useEffect`, `useRef`)
- **Internal**:
  - `state/AppState` - `useAppState`, `useSetAppState`
  - `types/message` - `Message` type

## Logic
- Accepts props: `setMessages`, `setIsLoading`, `resetLoadingState`, `setAbortController`, `onBackgroundQuery`.
- Reads `foregroundedTaskId` and the corresponding `foregroundedTask` from AppState.
- `handleBackgroundSession`:
  - If a task is already foregrounded, marks it as `isBackgrounded: true`, clears the foreground, resets the UI, and clears the abort controller.
  - Otherwise, calls `onBackgroundQuery` to spawn a background task from the current query.
- Effect (depends on `foregroundedTaskId` and `foregroundedTask`):
  - Resets sync when no foregrounded task.
  - If the foregrounded task is not a `local_agent`, clears the foreground state.
  - Syncs `task.messages` to main view via `setMessages` if the length changed (tracked by `lastSyncedMessagesLengthRef`).
  - While task is `running`:
    - If the task's abort controller signal is aborted (Escape pressed), re-backgrounds the task and resets UI.
    - Sets loading state and propagates the task's abort controller.
  - When task completes (`status` not running), marks it as backgrounded and clears foreground state.
- Uses refs (`lastSyncedMessagesLengthRef`) to avoid redundant message updates.

## Exports
- `useSessionBackgrounding` - hook returning `{ handleBackgroundSession }`
