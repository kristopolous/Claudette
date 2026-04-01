# voice

## Purpose
Provides React context and hooks for voice state management with store pattern.

## Imports
- **Stdlib**: (none)
- **External**: `react/compiler-runtime`, `react`
- **Internal**: store utils

## Logic
1. `VoiceState` type with voiceState (idle/recording/processing), error, transcript, audioLevels, warmingUp
2. `DEFAULT_STATE` - initial voice state values
3. `VoiceContext` - context for VoiceStore
4. `VoiceProvider` - wraps children with voice store
5. `useVoiceStore` - returns store, throws if outside provider
6. `useVoiceState` - subscribes to voice state slice with selector (only re-renders on change)
7. `useSetVoiceState` - returns stable setState function (never causes re-renders)
8. `useVoiceStateGetter` - returns stable getState function
9. store.setState is synchronous - callers can read state immediately after

## Exports
- `VoiceState` - type for voice state
- `VoiceProvider` - provider component
- `useVoiceState` - hook to subscribe to voice state slice
- `useSetVoiceState` - hook to get state setter
- `useVoiceStateGetter` - hook to get state getter
