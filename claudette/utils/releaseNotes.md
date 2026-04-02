# utils/releaseNotes

## Purpose
Provides release notes fetching, caching, and parsing utilities. Fetches changelog from GitHub in the background and stores it in a file-based cache for availability on next startup.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: `axios`, `semver`
- **Internal**: `../bootstrap/state` (getIsNonInteractiveSession), `./config` (getGlobalConfig, saveGlobalConfig), `./envUtils` (getClaudeConfigHomeDir), `./errors` (toError), `./log` (logError), `./privacyLevel` (isEssentialTrafficOnly), `./semver` (gt)

## Logic
1. `MAX_RELEASE_NOTES_SHOWN` (5) - max release notes to show
2. `CHANGELOG_URL` and `RAW_CHANGELOG_URL` - GitHub changelog URLs
3. Changelog is fetched from GitHub (not bundled) because Ink's static rendering makes dynamic updates difficult
4. Flow: user updates → fetch changelog in background → store in cache file → available on next startup
5. `getChangelogCachePath` - returns ~/.claude/cache/changelog.md
6. `changelogMemoryCache` - in-memory cache populated by async reads; sync callers (React render) read from this after setup.ts awaits checkForReleaseNotes()
7. `migrateChangelogFromConfig` - migrates from old config-based storage (cachedChangelog field) to file-based storage; called once at startup before any other config saves
8. `fetchAndStoreChangelog` - fetches changelog from GitHub; skips in non-interactive sessions and when essential-traffic-only mode is enabled; skips write if content unchanged; updates changelogLastFetched timestamp in config
9. `getStoredChangelog` - async reader that populates in-memory cache from file; returns empty string on failure
10. `getStoredChangelogFromMemory` - sync accessor for React render paths; returns empty string if async version hasn't been called yet
11. `parseChangelog` - parses markdown changelog into Record<version, notes[]>; splits by `## ` headings, extracts version from first line, filters bullet points; applies NFKC normalization
12. `getRecentReleaseNotes` - returns up to MAX_RELEASE_NOTES_SHOWN notes for versions newer than previousVersion; strips SHA via semver.coerce(); sorts newest first
13. `getAllReleaseNotes` - returns all release notes as [version, notes[]] arrays sorted oldest first
14. `checkForReleaseNotes` - async; for Ant builds uses MACRO.VERSION_CHANGELOG bundled at build time; otherwise populates cache, triggers background fetch if version changed, returns recent notes
15. `checkForReleaseNotesSync` - sync variant for React render paths; reads from in-memory cache only

## Exports
- `MAX_RELEASE_NOTES_SHOWN` - max notes constant (5)
- `CHANGELOG_URL` - GitHub changelog URL
- `RAW_CHANGELOG_URL` - raw changelog URL
- `getChangelogCachePath` - returns cache file path
- `_resetChangelogCacheForTesting` - resets in-memory cache for tests
- `migrateChangelogFromConfig` - migrates from config to file-based storage
- `fetchAndStoreChangelog` - fetches and caches changelog from GitHub
- `getStoredChangelog` - async reads changelog from cache file
- `getStoredChangelogFromMemory` - sync reads from in-memory cache
- `parseChangelog` - parses changelog markdown into structured record
- `getRecentReleaseNotes` - gets notes for new versions (newest first, capped)
- `getAllReleaseNotes` - gets all notes as [version, notes] arrays (oldest first)
- `checkForReleaseNotes` - async check for release notes; triggers background fetch
- `checkForReleaseNotesSync` - sync variant for React render paths
