# pluginTelemetry

## Purpose
Shared field builders for plugin lifecycle telemetry events. Implements a twin-column privacy pattern: every user-defined-name field emits both a raw value (routed to PII-tagged `_PROTO_*` BigQuery columns) and a redacted twin (real name if marketplace is allowlisted, else 'third-party').

## Imports
- **Stdlib**: crypto, path
- **Internal**: ../../services/analytics/index, ../../types/plugin, ../plugins/pluginIdentifier

## Logic
1. **Plugin ID hashing**: `hashPluginId` creates an opaque per-plugin aggregation key via `sha256(name@marketplace + FIXED_SALT)` truncated to 16 hex chars. Salt is constant (`claude-plugin-telemetry-v1`) to enable cross-org distinct-count queries.
2. **Scope classification**: `getTelemetryPluginScope` classifies plugin origin into 4 values: `default-bundle` (builtin), `official` (allowlisted marketplace), `org` (enterprise admin-pushed), `user-local` (user-added).
3. **Enabled-via classification**: `getEnabledVia` determines how a plugin arrived in the session: `default-enable`, `org-policy`, `seed-mount`, or `user-install`.
4. **Twin-column pattern**: `buildPluginTelemetryFields` returns `plugin_id_hash`, `plugin_scope`, `plugin_name_redacted`, `marketplace_name_redacted`, and `is_official_plugin`. Raw names are emitted separately with the `_PROTO_` prefix and PII-tagged type.
5. **Session-start event**: `logPluginsEnabledForSession` emits one `tengu_plugin_enabled_for_session` event per enabled plugin (not per skill), including skill/command path counts, MCP/hooks presence, and version.
6. **Error classification**: `classifyPluginCommandError` maps free-form error messages to 5 bounded categories: `network`, `not-found`, `permission`, `validation`, `unknown`.
7. **Load failure events**: `logPluginLoadErrors` emits `tengu_plugin_load_failed` per error, paired with the session-start event for computing load-success rates.

## Exports
- `hashPluginId(name, marketplace?)` - returns 16-char opaque plugin aggregation key
- `TelemetryPluginScope` - type: 'official' | 'org' | 'user-local' | 'default-bundle'
- `getTelemetryPluginScope(name, marketplace, managedNames)` - returns scope classification
- `EnabledVia` - type: 'user-install' | 'org-policy' | 'default-enable' | 'seed-mount'
- `InvocationTrigger` - type: 'user-slash' | 'claude-proactive' | 'nested-skill'
- `SkillExecutionContext` - type: 'fork' | 'inline' | 'remote'
- `InstallSource` - type: 'cli-explicit' | 'ui-discover' | 'ui-suggestion' | 'deep-link'
- `getEnabledVia(plugin, managedNames, seedDirs)` - returns how a plugin was enabled
- `buildPluginTelemetryFields(name, marketplace, managedNames?)` - returns hash, scope, redacted names, and is_official_plugin
- `buildPluginCommandTelemetryFields(pluginInfo, managedNames?)` - builds telemetry fields from a LoadedPlugin
- `logPluginsEnabledForSession(plugins, managedNames, seedDirs)` - emits session-start plugin events
- `PluginCommandErrorCategory` - type: 'network' | 'not-found' | 'permission' | 'validation' | 'unknown'
- `classifyPluginCommandError(error)` - classifies an error into a bounded category
- `logPluginLoadErrors(errors, managedNames)` - emits load failure events

## Source
`pluginTelemetry`
