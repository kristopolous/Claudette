## Purpose
Renders a structured diff view for file edits showing hunks with context lines in the terminal.

## Imports
- **Stdlib**: None
- **External**: REACT, `diff`
- **Internal**: `ink`, `StructuredDiffList`, `useTerminalSize`, file edit tool types and utilities, diff utilities, read/edit context utilities, string utilities, logging

## Logic
1. Creates a promise that loads diff data by scanning the file and computing patch hunks
2. Uses Suspense to show a placeholder while diff data loads asynchronously
3. Attempts to scan file context around the edit location for efficient diffing; falls back to full-file or tool-inputs-only diffing
4. Normalizes edits by finding actual string matches and preserving quote styles
5. Adjusts hunk line numbers based on scan offset for accurate display
6. Renders the diff within a dashed border frame, with placeholder state during loading

## Exports
- `FileEditToolDiff` - renders a diff view for file edits using Suspense-based async loading and structured patch display
