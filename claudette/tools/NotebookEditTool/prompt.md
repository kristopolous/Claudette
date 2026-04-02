# tools/NotebookEditTool/prompt.ts

## Purpose
Provides tool name, description, and prompt for NotebookEdit, used to replace cell contents in Jupyter notebooks.

## Imports
- None

## Logic
Exports:
- `DESCRIPTION` = 'Replace the contents of a specific cell in a Jupyter notebook.'
- `PROMPT`: Short string explaining that the tool completely replaces cell contents; notes that notebook_path must be absolute; cell_number is 0-indexed; edit_mode options: 'insert' to add new cell at index, 'delete' to delete cell at index.

The prompt is concise and focuses on usage parameters.

## Exports
- `DESCRIPTION` (string)
- `PROMPT` (string)
