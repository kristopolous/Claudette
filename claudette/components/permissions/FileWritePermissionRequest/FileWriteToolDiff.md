## Purpose
Renders a diff view for file write operations, showing either a structured diff against existing content or the new content as highlighted code for new files.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: hooks/useTerminalSize, ink, utils/array, utils/diff, HighlightedCode, StructuredDiff

## Logic
1. Get the terminal width for layout constraints
2. If the file exists, compute a patch display from the old content to the new content using getPatchForDisplay
3. If the file does not exist, skip diff computation and show the new content directly
4. Render either a StructuredDiff for each hunk with ellipsis separators, or a HighlightedCode block for new files
5. Wrap the output in a bordered box with dashed styling

## Exports
- `FileWriteToolDiff` - component that displays the diff between existing file content and the proposed new content, or shows the full content for new files
