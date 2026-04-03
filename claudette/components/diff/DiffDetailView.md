## Purpose
Displays the detailed diff content for a single selected file using word-level diffing and syntax highlighting.

## Imports
- **Stdlib**: `path` (resolve)
- **External**: REACT_COMPILER, `diff` (StructuredPatchHunk type), REACT
- **Internal**: `../../hooks/useTerminalSize`, `.././ink`, `.././utils/cwd`, `../../utils/file`, `../design-system/Divider`, `../StructuredDiff`

## Logic
1. Reads the file content from disk using the current working directory and file path
2. Extracts the first line for context in the diff rendering
3. Renders specialized views for untracked files, binary files, and large files with appropriate messages
4. For normal files, renders each patch hunk using the StructuredDiff component for word-level diffing
5. Shows a truncated warning when diff content exceeds the 400 line parsing limit

## Exports
- `DiffDetailView` - renders the full diff content for a single file with syntax highlighting and special handling for edge cases
