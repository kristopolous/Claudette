## Purpose
Manages resolution, validation, and path computation for the auto-memory directory and related paths.

## Imports
- **Stdlib**: os, path
- **External**: lodash-es/memoize
- **Internal**: bootstrap/state, services/analytics/growthbook, utils/envUtils, utils/git, utils/path, utils/settings/settings

## Logic
Determines whether auto-memory features are enabled through a priority chain checking environment variables, simple mode, remote mode without persistent storage, and settings. Computes the base memory directory from an environment override or the default config home. Resolves the auto-memory directory path through a cascade of overrides, settings, and a computed default based on the canonical git root. Validates paths against traversal attacks, null bytes, UNC paths, and other dangerous patterns. Provides memoized path computation keyed on project root to avoid repeated settings file parsing. Also computes daily log file paths for assistant mode and checks whether arbitrary paths fall within the auto-memory directory.

## Exports
- `isAutoMemoryEnabled` - returns whether auto-memory features are enabled based on environment and settings
- `isExtractModeActive` - returns whether the extract-memories background agent will run this session
- `getMemoryBaseDir` - returns the base directory for persistent memory storage
- `hasAutoMemPathOverride` - returns whether a full-path environment override is set
- `getAutoMemPath` - memoized function returning the auto-memory directory path
- `getAutoMemDailyLogPath` - returns the daily log file path for a given date
- `getAutoMemEntrypoint` - returns the MEMORY.md entrypoint path inside the auto-memory directory
- `isAutoMemPath` - checks whether an absolute path is within the auto-memory directory
