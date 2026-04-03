## Purpose
Renders a diff view for notebook cell edit operations, showing structured diffs for replacements, highlighted code for insertions, or the old source for deletions.

## Imports
- **Stdlib**: path
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink, types/notebook, utils/array, utils/cwd, utils/diff, utils/fsOperations, utils/json, utils/notebook, HighlightedCode, StructuredDiff

## Logic
1. Asynchronously read and parse the notebook file content as JSON
2. Use Suspense with a promise-based data fetch, returning null on parse failure
3. In the inner component, extract the old source from the target cell by cell_id
4. Determine the edit type as insert, delete, or replace based on edit_mode
5. For replace edits, compute a structured diff patch; for insert/delete, skip diff computation
6. Render the appropriate view: highlighted code of old source for deletions, highlighted code of new source for insertions, or structured diff hunks for replacements
7. Display the notebook path, edit type description, and cell information

## Exports
- `NotebookEditToolDiff` - component that displays the diff for notebook cell edits, handling insert, delete, and replace modes
