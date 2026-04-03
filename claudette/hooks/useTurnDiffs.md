# useTurnDiffs

## Purpose
Extracts turn-based file diffs from messages for display, processing only new messages incrementally.

## Imports
- **Stdlib**: `useMemo`, `useRef` from 'REACT'
- **External**: `diff` (StructuredPatchHunk)
- **Internal**: `FileEditOutput`, `FileWriteOutput`, `Message`

## Logic
1. Processes messages incrementally (only new since last call)
2. Detects turn boundaries on user prompts
3. Collects file edits from tool_use results
4. Generates synthetic hunks for new files
5. Computes line counts (added/removed) per file and turn
6. Returns turns in reverse order (most recent first)
7. Handles conversation rewinding by resetting cache

## Exports
- `useTurnDiffs` - Hook returning TurnDiff[] with file changes per turn
- `TurnFileDiff` - Type for per-file diff info
- `TurnDiff` - Type for per-turn diff summary
