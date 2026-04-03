# AppState

## Purpose
Provides React context provider for AppState store with settings change handling.

## Imports
- **Stdlib**: (none)
- **External**: `react/compiler-runtime`, BUILDFLAGS, `react`
- **Internal**: MailboxProvider, useSettingsChange, debug utils, permissionSetup, settings utils, store, AppStateStore types

## Logic
1. VoiceProvider - conditionally loaded via feature('VOICE_MODE') gate (ant-only)
2. Re-exports AppState types for backward compatibility (.ts callers migrating off .tsx)
3. `AppStoreContext` - context for AppStateStore
4. `HasAppStateContext` - prevents nested providers
5. `AppStateProvider` - main provider component
   - Creates store with createStore(initialState ?? getDefaultAppState())
   - Checks bypass permissions mode on mount, disables if remote settings loaded
   - Applies settings changes via useSettingsChange subscription
   - Wraps with MailboxProvider and VoiceProvider
6. `useAppStateStore` - returns store, throws if outside provider
7. `useAppState` - subscribes to state slice with selector

## Exports
- `AppStoreContext` - React context for AppStateStore
- `AppStateProvider` - provider component
- `useAppStateStore` - hook to get AppStateStore
- `useAppState` - hook to subscribe to state slice
- Re-exports from AppStateStore
