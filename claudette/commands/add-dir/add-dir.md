## Purpose
Command handler for /add-dir - adds a directory to the workspace/permissions.

## Imports
- **External**: React, STYLER, figures
- **Internal**: Bootstrap state, permissions utils, sandbox manager, validation, UI components

## Logic
Validates provided directory path (or shows input form if no path). Checks:
- Path exists and is a directory
- Not already in working directory hierarchy

If valid, applies permission update to session context and optionally persists to localSettings. Updates sandbox config and notifies user. Shows AddWorkspaceDirectory UI for confirmation/input.

## Exports
- `call` - LocalJSXCommandCall that adds directory and returns result message
