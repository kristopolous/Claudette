# useUpdateNotification

## Purpose
Tracks and surfaces version update notifications, deduplicating by semver major.minor.patch.

## Imports
- **Stdlib**: `useState` from 'REACT'
- **External**: `semver` (major, minor, patch)
- **Internal**: None

## Logic
1. Extracts semver parts (major.minor.patch) from version strings
2. Compares updated version against last notified version
3. Only returns new version when semver differs (prevents duplicate notifications)
4. Stores last notified semver in state

## Exports
- `getSemverPart` - Extract major.minor.patch from version string
- `shouldShowUpdateNotification` - Check if notification should be shown
- `useUpdateNotification` - Hook returning new version or null
