## Purpose
Provides a React context for sharing keybinding state, resolution logic, and handler registration across the component tree.

## Imports
- **Stdlib**: none
- **External**: `react` (createContext, RefObject, useContext, useLayoutEffect, useMemo), `react/compiler-runtime`
- **Internal**: `ink.js` (Key type), `resolver.js` (ChordResolveResult, getBindingDisplayText, resolveKeyWithChordState), `types.js` (KeybindingContextName, ParsedBinding, ParsedKeystroke)

## Logic
Creates a context value containing key resolution, chord state management, display text lookup, handler registration, and active context tracking. The provider memoizes callbacks and the context value to minimize re-renders. Components use a hook to register themselves as active contexts, giving their bindings priority over global bindings. Handler registrations are stored in a ref-based registry for synchronous access by the chord interceptor.

## Exports
- `KeybindingProvider` - React provider component that supplies keybinding context to children
- `useKeybindingContext` - hook that returns the keybinding context, throwing if used outside the provider
- `useOptionalKeybindingContext` - hook that returns the keybinding context or undefined if unavailable
- `useRegisterKeybindingContext` - hook that registers a context as active while the component is mounted
