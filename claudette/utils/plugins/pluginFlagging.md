# pluginFlagging

## Purpose
Tracks plugins that were auto-removed because they were delisted from their marketplace. Data stored in `~/.claude/plugins/flagged-plugins.json`. Flagged plugins appear in a "Flagged" section in /plugins until the user dismisses them.

## Imports
- **Stdlib**: `crypto` (randomBytes), `fs/promises` (readFile, rename, unlink, writeFile), `path`
- **Internal**: `../debug.js`, `../fsOperations.js`, `../log.js`, `../slowOperations.js`, `./pluginDirectories.js`

## Logic
1. **Module-level cache**: A `cache` variable holds the flagged plugins in memory, populated by `loadFlaggedPlugins()` and kept in sync with writes. Enables synchronous `getFlaggedPlugins()` calls during React render.
2. **Atomic writes**: Uses temp file + rename pattern for atomic writes. Temp file named with random hex suffix, written with 0o600 permissions.
3. **Expiry**: Flagged entries with `seenAt` older than 48 hours are auto-cleared on next `loadFlaggedPlugins()` call.
4. **Parse validation**: `parsePluginsData()` validates the JSON structure — expects `{ plugins: { [id]: { flaggedAt: string, seenAt?: string } } }`. Invalid entries are silently skipped.

## Exports
- `FlaggedPlugin` - type alias for flagged plugin entry (`flaggedAt: string`, `seenAt?: string`)
- `loadFlaggedPlugins` - async function that loads flagged plugins from disk into the module cache; must be called before `getFlaggedPlugins()` returns meaningful data; also prunes entries older than 48 hours
- `getFlaggedPlugins` - sync function that returns all flagged plugins from the in-memory cache; returns empty object if `loadFlaggedPlugins()` hasn't been called
- `addFlaggedPlugin` - async function that adds a plugin to the flagged list with current timestamp
- `markFlaggedPluginsSeen` - async function that sets `seenAt` on flagged plugins (called when Installed view renders flagged plugins); entries auto-clear after 48 hours
- `removeFlaggedPlugin` - async function that removes a plugin from the flagged list (called when user dismisses a flagged notification)

## Source
`pluginFlagging`
