# utils/plugins/cacheUtils

## Purpose
Provides plugin cache clearing and orphaned version cleanup utilities.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: (none)
- **Internal**: commands, constants outputStyles, AgentTool loadAgentsDir, SkillTool prompt, attachments, debug, errors, log, plugins installedPluginsManager/loadPluginAgents/loadPluginCommands/loadPluginHooks/loadPluginOutputStyles/pluginLoader/pluginOptionsStorage/zipCache

## Logic
1. `ORPHANED_AT_FILENAME` - '.orphaned_at'
2. `CLEANUP_AGE_MS` (7 days) - orphaned version cleanup age
3. `clearAllPluginCaches` - clears all plugin caches
4. Clears: plugin, command, agent, hook, options, outputStyle caches
5. `pruneRemovedPluginHooks` - prunes hooks from uninstalled/disabled plugins
6. Fire-and-forget, preserves gh-29767 behavior
7. `clearAllCaches` - clears all caches including commands, agents, prompts, skills
8. `markPluginVersionOrphaned` - marks plugin version as orphaned
9. Called on uninstall or update to new version
10. Writes .orphaned_at file with timestamp
11. `cleanupOrphanedPluginVersionsInBackground` - cleans orphaned versions
12. Pass 1: removes .orphaned_at from installed versions
13. Pass 2: for cached versions not in installed_plugins.json:
    - If no .orphaned_at: creates it (handles old CC versions)
    - If .orphaned_at > 7 days old: deletes version
14. Skips cleanup in zip cache mode (plugins stored as .zip files)

## Exports
- `ORPHANED_AT_FILENAME` - orphaned marker filename
- `CLEANUP_AGE_MS` - cleanup age constant
- `clearAllPluginCaches` - clears plugin caches
- `clearAllCaches` - clears all caches
- `markPluginVersionOrphaned` - marks version orphaned
- `cleanupOrphanedPluginVersionsInBackground` - cleans orphaned versions
