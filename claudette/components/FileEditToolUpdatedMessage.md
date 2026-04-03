## Purpose
Renders a message displaying file edit results with addition/removal counts and an optional structured diff view.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER, `diff`
- **Internal**: `hooks/useTerminalSize`, `ink`, `utils/array`, `components/MessageResponse`, `components/StructuredDiffList`

## Logic
1. Counts added and removed lines from structured patch hunks
2. Renders a summary text of additions and removals
3. In condensed non-verbose mode with a preview hint, shows the hint dimmed
4. In condensed non-verbose mode without a hint, shows only the summary text
5. Otherwise renders the summary text alongside a full structured diff list within a MessageResponse container

## Exports
- `FileEditToolUpdatedMessage` - displays file edit results with line change counts and optional diff visualization
