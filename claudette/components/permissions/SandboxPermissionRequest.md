## Purpose
Handles permission requests for network connections outside the sandbox environment.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `ink`, `utils/sandbox/sandbox-adapter`, `services/analytics`, `CustomSelect/select`, `PermissionDialog`

## Logic
Extracts the host pattern from props and presents yes/no options for allowing the network connection. Conditionally shows a "don't ask again" option based on whether managed sandbox domains are enforced. Logs analytics events and returns the user's allow/persist decision through the callback.

## Exports
- `SandboxPermissionRequest` - component for approving or denying outbound network connections
- `SandboxPermissionRequestProps` - type defining the host pattern and user response callback
