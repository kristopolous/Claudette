# pluginPolicy

## Purpose
Single source of truth for checking if a plugin is force-disabled by org policy (managed-settings.json). Policy-blocked plugins cannot be installed or enabled by the user at any scope.

## Imports
- **Internal**: `../settings/settings.js`

## Logic
1. Reads `enabledPlugins` from `policySettings` (managed-settings.json).
2. A plugin is blocked if its entry is explicitly set to `false`. Plugins not present in the policy settings are considered allowed.
3. Kept as a leaf module (only imports settings) to avoid circular dependencies with the broader plugin subsystem.

## Exports
- `isPluginBlockedByPolicy` - function that checks if a plugin ID is force-disabled by org policy; returns `true` if `enabledPlugins[pluginId] === false` in policySettings

## Source
`pluginPolicy`
