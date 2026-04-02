# managedPlugins

## Purpose
Retrieves plugin names that are locked/managed by org policy settings, returning a Set of plugin names or null when no policy is in effect.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `../settings/settings.js` — `getSettingsForSource`

## Logic
1. Fetches `enabledPlugins` from `getSettingsForSource('policySettings')`
2. Returns `null` if no enabledPlugins are declared (common case — no policy in effect)
3. Iterates over `[pluginId, value]` entries, filtering to only `plugin@marketplace` boolean entries (true OR false) — legacy owner/repo array form is not protected
4. Extracts the plugin name by splitting on `@` and taking the first part
5. Returns the Set of names if non-empty, otherwise `null`

## Exports
- `getManagedPluginNames(): Set<string> | null` - returns plugin names locked by org policy, or null if no policy is in effect
