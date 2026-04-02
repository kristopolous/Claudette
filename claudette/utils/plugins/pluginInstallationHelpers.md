# pluginInstallationHelpers

## Purpose
Shared utilities for plugin installation: caching and registering plugins, resolving dependency closures, policy checks, and structured install results. Used by both CLI path (`installPluginOp`) and interactive UI path (`installPluginFromMarketplace`).

## Imports
- **Stdlib**: `crypto` (randomBytes), `fs/promises` (rename, rm), `path` (dirname, join, resolve, sep)
- **Internal**: `../../services/analytics/index.js`, `../cwd.js`, `../errors.js`, `../fsOperations.js`, `../log.js`, `../settings/settings.js`, `../telemetry/pluginTelemetry.js`, `./cacheUtils.js`, `./dependencyResolver.js`, `./installedPluginsManager.js`, `./managedPlugins.js`, `./marketplaceManager.js`, `./pluginIdentifier.js`, `./pluginLoader.js`, `./pluginPolicy.js`, `./pluginVersioning.js`, `./schemas.js`, `./zipCache.js`

## Logic
1. **Path traversal prevention**: `validatePathWithinBase()` ensures a resolved path stays within a base directory by checking the resolved path starts with the normalized base + separator.
2. **Cache and register**: `cacheAndRegisterPlugin()` caches a plugin (local or external) to `~/.claude/plugins/cache/`, moves to versioned path (`cache/marketplace/plugin/version/`), handles subdirectory rename edge case (when marketplace name equals plugin name), optionally converts to ZIP if zip cache is enabled, and adds to installed_plugins.json.
3. **Dependency resolution**: `installResolvedPlugin()` resolves the transitive dependency closure, checks policy for root and all dependencies, writes entire closure to enabledPlugins in one settings update, and caches each closure member.
4. **Policy guards**: Both root plugin and transitive dependencies are checked against `isPluginBlockedByPolicy()` before any writes occur.
5. **Analytics**: `installPluginFromMarketplace()` logs `tengu_plugin_installed` event with PII-tagged plugin/marketplace names and redacted plugin_id for non-official marketplaces.

## Exports
- `PluginInstallationInfo` - type for plugin installation metadata (pluginId, installPath, version?)
- `InstallCoreResult` - discriminated union type for install core result: success with closure and depNote, or failure with reason (local-source-no-location, settings-write-failed, resolution-failed, blocked-by-policy, dependency-blocked-by-policy)
- `InstallPluginResult` - type for install operation result (success with message, or failure with error)
- `InstallPluginParams` - type for install parameters (pluginId, entry, marketplaceName, scope?, trigger?)
- `getCurrentTimestamp` - returns current ISO timestamp
- `validatePathWithinBase` - validates that a relative path resolves within a base directory; throws on path traversal
- `cacheAndRegisterPlugin` - async function that caches a plugin and registers it in installed_plugins.json; handles local and external sources, versioning, and optional zip conversion
- `registerPluginInstallation` - registers a plugin installation without caching (for local plugins already on disk)
- `parsePluginId` - parses a plugin ID in "plugin@marketplace" format into { name, marketplace } or null if invalid
- `formatResolutionError` - formats a failed ResolutionResult into a user-facing message (handles cycle, cross-marketplace, not-found reasons)
- `installResolvedPlugin` - async function that is the core install logic: policy guard, dependency resolution, settings write, caching; returns InstallCoreResult
- `installPluginFromMarketplace` - async function that installs a single plugin from a marketplace; interactive-UI wrapper around installResolvedPlugin with try/catch, analytics, and UI-style messages

## Source
`pluginInstallationHelpers`
