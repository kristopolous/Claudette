## Purpose
Renders a tab for managing workspace directories that Claudette can access, allowing users to add or remove directories from the workspace.

## Imports
- **Stdlib**: None
- **External**: `figures`, REACT
- **Internal**: `bootstrap/state`, `commands`, `components/CustomSelect/select`, `ink`, `Tool`, `design-system/Tabs`

## Logic
Displays the original working directory and a list of additional workspace directories in a selectable list. Provides options to add a new directory or remove an existing one via a dropdown select component. Handles focus management for tab headers and notifies the parent component of selection changes.

## Exports
- `WorkspaceTab` - renders the workspace directory management tab with a list of directories and controls to add or remove them
