# utils/plugins/loadPluginHooks

## Purpose
Provides plugin hook loading and hot reload utilities.

## Imports
- **Stdlib**: (none)
- **External**: `lodash-es/memoize`
- **Internal**: agentSdkTypes, bootstrap state, plugin types, debug, settings changeDetector/settings, settings types, JSON utils, pluginLoader

## Logic
1. `hotReloadSubscribed` - tracks if hot reload subscription set up
2. `lastPluginSettingsSnapshot` - snapshot of enabledPlugins for change detection
3. `convertPluginHooksToMatchers` - converts plugin hooks to native matchers
4. Creates PluginHookMatcher[] for each HookEvent
5. Adds plugin context (pluginRoot, pluginName, pluginId) to matchers
6. `loadPluginHooks` - loads hooks from all enabled plugins
7. Registers hooks via registerHookCallbacks
8. `setupPluginHooksHotReload` - sets up hot reload for plugin hooks
9. Subscribes to settingsChangeDetector for changes
11. Compares enabledPlugins snapshot to detect changes
12. Clears registered hooks and reloads on change
13. `clearRegisteredPluginHooks` - clears registered plugin hooks
14. `getRegisteredHooks` - gets registered hooks
15. `registerHookCallbacks` - registers hook callbacks
16. `getSettings_DEPRECATED`, `getSettingsForSource` - settings functions
17. `PluginHookMatcher` - plugin hook matcher type
18. `jsonStringify` - JSON stringify
19. `clearPluginCache`, `loadAllPluginsCacheOnly` - plugin cache functions

## Exports
- `convertPluginHooksToMatchers` - converts hooks to matchers
- `loadPluginHooks` - loads plugin hooks
- `setupPluginHooksHotReload` - sets up hot reload
- `clearRegisteredPluginHooks` - clears registered hooks
- `getRegisteredHooks` - gets registered hooks
- `registerHookCallbacks` - registers callbacks
- (Hook loading functions)
