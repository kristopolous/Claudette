## Purpose
Renders a message indicating that a notebook edit tool use was rejected by the user, showing the operation type, notebook path, cell ID, and the rejected source code.

## Imports
- **Stdlib**: `path`
- **External**: REACT, REACT_COMPILER
- **Internal**: `utils/cwd`, `ink`, `components/HighlightedCode`, `components/MessageResponse`

## Logic
1. Determines the operation description based on edit mode (delete, replace, insert)
2. Displays the notebook path either as absolute (verbose mode) or relative to current working directory
3. Shows the cell ID if available
4. Renders the rejected source code using syntax-highlighted code display, except for delete operations

## Exports
- `NotebookEditToolUseRejectedMessage` - UI component that displays a rejection message for notebook edit tool uses with path, cell ID, and source code context
