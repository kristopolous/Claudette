## Purpose
Renders a scrollable, paginated list of changed files with selection highlighting and per-file change statistics.

## Imports
- **Stdlib**: none
- **External**: REACT_COMPILER, `figures`, REACT
- **Internal**: `../../hooks/useDiffData`, `.././hooks/useTerminalSize`, `../../ink`, `../../utils/format`, `../../utils/stringUtils`

## Logic
1. Calculates a visible window of files (max 5) centered around the selected index
2. Adjusts the window bounds when selection is near the start or end of the list
3. Renders pagination indicators when the file list exceeds the visible window
4. Each file item displays a pointer indicator for selection, a truncated file path, and stats (lines added/removed, or type indicators for binary/large/untracked files)
5. File paths are truncated to fit within available terminal width

## Exports
- `DiffFileList` - renders a paginated list of changed files with selection state
