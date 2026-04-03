## Purpose
Manages feedback-mode state and handlers for shell permission dialogs including Bash and PowerShell.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `services/analytics`, `services/analytics/metadata`, `state/AppState`, `PermissionRequest`, `utils`

## Logic
Maintains separate input mode and feedback state for yes/no options. Handles Tab key toggling between selection and feedback input modes, tracks whether the user entered feedback mode for analytics, and processes reject actions with optional feedback text. Notifies the parent of user interactions and manages escape count attribution.

## Exports
- `useShellPermissionFeedback` - hook providing input mode state, feedback text, focus tracking, and reject handling for shell permission dialogs
