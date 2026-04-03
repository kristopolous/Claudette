## Purpose
Dialog shown when settings files have validation errors, allowing users to continue without invalid settings or exit to fix them.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ../ink (Text), ./utils/settings/validation (ValidationError), ./CustomSelect/index (Select), ./design-system/Dialog (Dialog), ./ValidationErrorsList (ValidationErrorsList)

## Logic
Displays a warning dialog with a list of validation errors from settings files. Informs users that files with errors are skipped entirely, not just the invalid settings. Provides two options: exit to fix errors manually, or continue without the invalid settings. Canceling the dialog triggers the exit action.

## Exports
- `InvalidSettingsDialog` - Dialog that presents settings validation errors and lets users choose to continue or exit
