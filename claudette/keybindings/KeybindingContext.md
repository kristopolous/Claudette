## Purpose
Provides a UI context for sharing keybinding state, resolution logic, and handler registration across the component tree.

## Imports
- **Stdlib**: none
- **External**: REACT (createContext, RefObject, useContext, useLayoutEffect, useMemo), REACT_COMPILER
- **Internal**: `ink` (Key type), `resolver` (ChordResolveResult, getBindingDisplayText, resolveKeyWithChordState), `types` (KeybindingContextName, ParsedBinding, ParsedKeystroke)

## Logic
Creates a context value containing key resolution, chord state management, display text lookup, handler registration, and active context tracking. The provider memoizes callbacks and the context value to minimize re-renders. Components use a hook to register themselves as active contexts, giving their bindings priority over global bindings. Handler registrations are stored in a ref-based registry for synchronous access by the chord interceptor.

## Exports
- `KeybindingProvider` - UI provider component that supplies keybinding context to children
- `useKeybindingContext` - hook that returns the keybinding context, throwing if used outside the provider
- `useOptionalKeybindingContext` - hook that returns the keybinding context or undefined if unavailable
- `useRegisterKeybindingContext` - hook that registers a context as active while the component is mounted
