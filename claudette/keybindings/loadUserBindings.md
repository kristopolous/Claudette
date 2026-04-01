## Purpose
Loads user keybindings from the configuration file with hot-reload support via file watching.

## Imports
- **Stdlib**: `fs` (readFileSync), `fs/promises` (readFile, stat), `path` (dirname, join)
- **External**: `chokidar` (FSWatcher)
- **Internal**: `services/analytics/growthbook` (getFeatureValue_CACHED_MAY_BE_STALE), `services/analytics/index` (logEvent), `utils/cleanupRegistry` (registerCleanup), `utils/debug` (logForDebugging), `utils/envUtils` (getClaudeConfigHomeDir), `utils/errors` (errorMessage, isENOENT), `utils/signal` (createSignal), `utils/slowOperations` (jsonParse), `defaultBindings` (DEFAULT_BINDINGS), `parser` (parseBindings), `types` (KeybindingBlock, ParsedBinding), `validate` (checkDuplicateKeysInJson, KeybindingWarning, validateBindings)

## Logic
Checks if keybinding customization is enabled via a feature flag. Loads and parses user bindings from the config file, merges them with default bindings (user bindings override), and runs validation. Provides both async and sync loading paths. Initializes a chokidar file watcher for hot-reloading, emitting signals when the file changes. Caches results for synchronous access during React rendering. Logs telemetry once per day when custom bindings are loaded.

## Exports
- `isKeybindingCustomizationEnabled` - checks if user keybinding customization is enabled
- `KeybindingsLoadResult` - type for the result of loading keybindings (bindings + warnings)
- `getKeybindingsPath` - returns the path to the user keybindings file
- `loadKeybindings` - async function to load and merge keybindings with validation
- `loadKeybindingsSync` - synchronous loader for initial render, returns bindings only
- `loadKeybindingsSyncWithWarnings` - synchronous loader that returns bindings and warnings
- `initializeKeybindingWatcher` - sets up file watching for hot-reload
- `disposeKeybindingWatcher` - cleans up the file watcher
- `subscribeToKeybindingChanges` - subscribes to keybinding change events
- `getCachedKeybindingWarnings` - returns cached validation warnings
- `resetKeybindingLoaderForTesting` - resets internal state for testing
