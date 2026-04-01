# useSettingsChange

## Purpose
Subscribes to settings file changes and invokes a callback when any setting changes, enabling reactive UI updates.

## Imports
- **Stdlib**: `useCallback`, `useEffect` from 'react'
- **External**: None
- **Internal**: `settingsChangeDetector`, `getSettings_DEPRECATED`, `SettingSource`, `SettingsJson`

## Logic
1. Subscribe to `settingsChangeDetector` on mount
2. When settings change, fetch fresh settings via `getSettings_DEPRECATED()`
3. Call the provided `onChange` callback with the source and new settings
4. Cache reset is handled by the detector's fanOut mechanism to prevent N-way thrashing

## Exports
- `useSettingsChange` - Hook that subscribes to settings changes
