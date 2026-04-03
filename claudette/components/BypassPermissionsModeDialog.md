## Purpose
A critical security dialog that warns the user about the risks associated with enabling "Bypass Permissions mode" and requires explicit acknowledgment before proceeding.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: `services/analytics`, `utils/gracefulShutdown`, `utils/settings/settings`, `components/CustomSelect`, `components/design-system/Dialog`

## Logic
1. **High-Risk Warning**:
    - Clearly articulates that enabling "Bypass Permissions mode" allows Claudette Code to execute potentially dangerous commands without requiring explicit user approval for each action.
    - Strongly advises users to operate this mode only within isolated and easily restorable environments (e.g., sandboxed containers or VMs).
2. **User Acknowledgment**:
    - Explicitly requires the user to accept responsibility for any actions taken while the dangerous mode is active.
    - Presents two clear choices: "Yes, I accept" to proceed, or "No, exit" to cancel the operation.
3. **State Persistence**: If the user accepts, the application updates global settings (`userSettings`) to persist the `skipDangerousModePermissionPrompt` flag, ensuring the warning is not shown again for this user.
4. **User Interaction**: Utilizes a `Select` component for clear, keyboard-driven decision-making, with "No, exit" as the default focus.
5. **Actionable Outcomes**:
    - **Accept**: Continues the workflow by calling the `onAccept` callback.
    - **Decline**: Initiates an immediate, graceful shutdown of the application via `gracefulShutdownSync`.
6. **Visual Emphasis**: Renders the dialog with an "error" color theme to underscore the potentially hazardous nature of the action being confirmed.

## Exports
- `BypassPermissionsModeDialog` - A functional component that manages the bypass permissions confirmation dialog.
