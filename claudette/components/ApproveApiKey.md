## Purpose
A security-sensitive dialog component that prompts the user to explicitly approve or reject the use of a custom inference provider API key detected in their environment.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `../ink`, `../utils/config`, `./CustomSelect/index`, `./design-system/Dialog`

## Logic
1. **Security Prompting**:
    - Triggered when the application detects an API key (e.g., `ANTHROPIC_API_KEY`) in the environment that has not been previously authorized by the user.
    - Displays a truncated version of the detected key to allow the user to identify it without exposing the full secret in the terminal output.
2. **User Decision Persistence**:
    - **Approval**: If the user selects "Yes," the truncated key identifier is added to a persistent "approved" list in the global configuration, allowing the application to use it automatically in the future.
    - **Rejection**: If the user selects "No" (the recommended default), the truncated key is added to a "rejected" list, ensuring the user is not prompted for this specific key again.
3. **Interactive Flow**:
    - Employs a `Select` component for a clear, keyboard-driven choice.
    - Defaults the focus to the "No" option to promote a secure-by-default posture.
4. **Lifecycle Management**: Triggers a completion callback (`onDone`) with the boolean result of the user's decision, allowing the application's authentication logic to proceed with the chosen key or fall back to standard authentication.
5. **Visual Styling**: Uses a `Dialog` component with a "warning" color theme to signal that the interaction involves a security-sensitive configuration choice.

## Exports
- `ApproveApiKey` - A functional component that manages the API key authorization dialog.
