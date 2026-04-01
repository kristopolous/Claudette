## Purpose
A critical security warning dialog that forces user acknowledgment before loading unverified development-mode plugins or server-side extensions.

## Imports
- **Internal**: 
    - UI: `ink`, `CustomSelect/index`, `design-system/Dialog`
    - Logic/State: `bootstrap/state`, `utils/gracefulShutdown`

## Logic
1. **Security Enforcement**: Displays a prominent error-themed warning explaining the risks of using the `--dangerously-load-development-channels` flag with untrusted content.
2. **Resource Listing**: Iterates through the list of targeted development channels and formats them for display (e.g., prefixing with "plugin:" or "server:") so the user knows exactly what is being loaded.
3. **Choice Management**:
    - **Accept**: Continues the application lifecycle with the development channels enabled.
    - **Exit**: Triggers an immediate, graceful system shutdown with a non-zero exit code to prevent further execution.
4. **Cancellation Handling**: Maps escape/cancel interactions directly to a graceful shutdown, treating any non-acceptance as a directive to stop.

## Exports
- `DevChannelsDialog` - The security component used to block execution until development channel risks are acknowledged.
