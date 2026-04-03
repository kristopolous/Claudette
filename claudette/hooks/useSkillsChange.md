# useSkillsChange

## Purpose
Keeps the commands list fresh by reloading when skill files change on disk or when GrowthBook features refresh.

## Imports
- **Stdlib**: `useCallback`, `useEffect` from 'REACT'
- **External**: None
- **Internal**: `Command`, `clearCommandMemoizationCaches`, `clearCommandsCache`, `getCommands`, `onGrowthBookRefresh`, `logError`, `skillChangeDetector`

## Logic
1. Subscribes to skillChangeDetector for file-based skill changes
2. On change: clears all command caches, rescans disk, calls onCommandsChange
3. Subscribes to GrowthBook refresh for feature flag changes
4. On GB refresh: clears memo only (not disk cache), re-filters commands
5. Errors during reload are non-fatal, logged but continue gracefully

## Exports
- `useSkillsChange` - Hook that manages command list freshness
