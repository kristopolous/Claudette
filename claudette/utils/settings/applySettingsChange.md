# applySettingsChange

## Purpose
Applies a settings change to app state by re-reading settings from disk, reloading permissions and hooks, and pushing the new state. Used by both interactive (AppState.tsx via useSettingsChange) and headless/SDK (print.ts direct subscribe) paths so managed-settings/policy changes are fully applied in both modes.

## Imports
- **Internal**: `../../state/AppState.js` (AppState), `../debug.js` (logForDebugging), `../hooks/hooksConfigSnapshot.js` (updateHooksConfigSnapshot), `../permissions/permissionSetup.js` (createDisabledBypassPermissionsContext, findOverlyBroadBashPermissions, isBypassPermissionsModeDisabled, removeDangerousPermissions, transitionPlanAutoMode), `../permissions/permissions.js` (syncPermissionRulesFromDisk), `../permissions/permissionsLoader.js` (loadAllPermissionRulesFromDisk), `./constants.js` (SettingSource), `./settings.js` (getInitialSettings)

## Logic
1. Calls getInitialSettings() to read fresh disk state (cache is already reset by changeDetector.fanOut before listeners iterate)
2. Reloads all permission rules from disk via loadAllPermissionRulesFromDisk()
3. Updates hooks config snapshot
4. Syncs permission rules from disk into toolPermissionContext
5. Ant-only: finds and removes overly broad Bash allow rules (when USER_TYPE=ant and not local-agent entrypoint)
6. Disables bypass permissions mode if available but disabled
7. Transitions plan auto mode
8. Syncs effortLevel from settings to top-level AppState.effortValue, but only if the setting itself changed (to avoid clobbering --effort CLI flag values from unrelated settings churn)
9. Returns updated AppState with new settings, toolPermissionContext, and optionally effortValue

## Exports
- `applySettingsChange(source, setAppState)` — re-reads settings/permissions from disk and pushes new state; source is the SettingSource that triggered the change

## Source
`applySettingsChange`