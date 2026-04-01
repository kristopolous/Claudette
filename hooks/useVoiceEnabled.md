# useVoiceEnabled

## Purpose
Determines if voice mode is enabled by combining user intent (settings), authentication status, and GrowthBook feature flag.

## Imports
- **Stdlib**: `useMemo` from 'react'
- **External**: None
- **Internal**: `useAppState`, `hasVoiceAuth`, `isVoiceGrowthBookEnabled`

## Logic
1. Checks `settings.voiceEnabled === true` for user intent
2. Memoizes `hasVoiceAuth()` on authVersion (expensive keychain spawn)
3. Checks `isVoiceGrowthBookEnabled()` for kill-switch
4. Returns true only if all three conditions are met

## Exports
- `useVoiceEnabled` - Hook returning boolean for voice mode availability
