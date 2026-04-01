## Purpose
Dialog for selecting multiple GitHub workflows to install, with validation that at least one workflow is selected.

## Imports
- **Stdlib**: none
- **External**: react, react/compiler-runtime
- **Internal**: ../commands/install-github-app/types.js (Workflow), ../hooks/useExitOnCtrlCDWithKeybindings.js (ExitState), ../ink.js (Box, Link, Text), ./ConfigurableShortcutHint.js (ConfigurableShortcutHint), ./CustomSelect/SelectMulti.js (SelectMulti), ./design-system/Byline.js (Byline), ./design-system/Dialog.js (Dialog), ./design-system/KeyboardShortcutHint.js (KeyboardShortcutHint)

## Logic
Presents a multi-select dialog with predefined workflow options for Claudette Code and Claudette Code Review. Tracks error state when no workflows are selected on submit. On valid submission, calls onSubmit with the selected workflow values. Renders navigation hints showing keyboard shortcuts for navigate, toggle, confirm, and cancel actions. Includes a link to additional workflow examples documentation.

## Exports
- `WorkflowMultiselectDialog` - Dialog that allows users to select one or more GitHub workflows to install
