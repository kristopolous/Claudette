## Purpose
Clears `skipAutoPermissionPrompt` for users who accepted the old auto mode dialog but do not have auto as their default, re-surfacing the updated dialog.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS (feature)
- **Internal**: `services/analytics` (logEvent), `utils/config` (getGlobalConfig, saveGlobalConfig), `utils/log` (logError), `utils/permissions/permissionSetup` (getAutoModeEnabledState), `utils/settings/settings` (getSettingsForSource, updateSettingsForSource)

## Logic
1. Returns early if the `TRANSCRIPT_CLASSIFIER` feature flag is not enabled
2. Returns early if migration has already run (tracked by `hasResetAutoModeOptInForDefaultOffer` flag)
3. Returns early if auto mode enabled state is not `enabled`
4. Checks if user has skipped the auto permission prompt but does not have auto as default mode
5. Clears `skipAutoPermissionPrompt` in userSettings to re-show the dialog
6. Marks migration as complete in global config
7. Wraps operations in try/catch with error logging

## Exports
- `resetAutoModeOptInForDefaultOffer` - Re-surfaces the auto mode dialog for users who need to see the new default option
