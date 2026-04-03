# remoteManagedSettings/securityCheck

## Purpose
Checks if new remote managed settings contain dangerous settings requiring user approval.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: bootstrap state, ManagedSettingsSecurityDialog, dialog utils, ink render, keybindings, state, gracefulShutdown, renderOptions, settings types, analytics

## Logic
1. `SecurityCheckResult` - union: approved, rejected, no_check_needed
2. `checkManagedSettingsSecurity` - main check function
3. Returns no_check_needed if new settings have no dangerous settings
4. Returns no_check_needed if dangerous settings haven't changed
5. Returns no_check_needed in non-interactive mode
6. Shows blocking ManagedSettingsSecurityDialog for dangerous changes
7. Logs dialog_shown, dialog_accepted, dialog_rejected events
8. `handleSecurityCheckResult` - handles result by exiting if rejected
9. Returns true to continue, false to stop
10. Calls gracefulShutdownSync(1) on rejection

## Exports
- `SecurityCheckResult` - security check result type
- `checkManagedSettingsSecurity` - checks settings for dangerous changes
- `handleSecurityCheckResult` - handles check result
