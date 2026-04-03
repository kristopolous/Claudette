# useSettings

## Purpose
UI hook for accessing current settings from AppState with automatic reactive updates when settings change on disk.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `useAppState`, `AppState`, `ReadonlySettings`

## Logic
1. Uses `useAppState` selector to access `s.settings`
2. Settings automatically update when files change on disk via settingsChangeDetector
3. Returns DeepImmutable wrapped settings type

## Exports
- `useSettings` - Hook returning readonly settings from AppState
- `ReadonlySettings` - Type alias for AppState['settings']
