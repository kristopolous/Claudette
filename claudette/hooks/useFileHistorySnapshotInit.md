## Purpose
Restores file history from a previous session snapshot on first mount; ensures replay only occurs once.

## Imports
- **External**: REACT (useEffect, useRef)
- **Internal**:
  - `./utils/fileHistory` (FileHistorySnapshot type, FileHistoryState type, fileHistoryEnabled, fileHistoryRestoreStateFromLog)

## Logic
- Parameters: `initialFileHistorySnapshots` (from session log), `fileHistoryState` (current state), `onUpdateState` (state setter)
- Effect runs on mount and when deps change:
  - Skips if file history feature disabled or already initialized (via `initialized` ref)
  - If snapshots exist, calls `fileHistoryRestoreStateFromLog(snapshots, onUpdateState)` to reconstruct state
- Designed to be called once at app startup to resume file navigation history

## Exports
- `useFileHistorySnapshotInit` - Hook `(initialFileHistorySnapshots: FileHistorySnapshot[] | undefined, fileHistoryState: FileHistoryState, onUpdateState: (newState: FileHistoryState) => void) => void`
