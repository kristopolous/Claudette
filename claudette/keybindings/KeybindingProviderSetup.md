## Purpose
Top-level UI component that initializes the keybinding system, loads default and user bindings with hot-reload support, and intercepts chord sequences before other input handlers.

## Imports
- **Stdlib**: none
- **External**: REACT (useCallback, useEffect, useRef, useState), REACT_COMPILER
- **Internal**: `context/notifications` (useNotifications), `ink/events/input-event` (InputEvent), ink` (Key, useInput), `utils/array` (count), `utils/debug` (logForDebugging), `utils/stringUtils` (plural), KeybindingContext` (KeybindingProvider), loadUserBindings` (initializeKeybindingWatcher, loadKeybindingsSyncWithWarnings, subscribeToKeybindingChanges), `resolver` (resolveKeyWithChordState), `types` (KeybindingContextName, ParsedBinding, ParsedKeystroke), `validate` (KeybindingWarning)

## Logic
Loads bindings synchronously for initial render, subscribes to file change events for hot-reloading, and displays validation warnings via notifications. Manages chord state with a ref for synchronous access and a timeout for automatic cancellation. Renders a ChordInterceptor that registers useInput first in the component tree to capture chord keystrokes before child components like PromptInput can consume them. The interceptor resolves each keystroke through the chord resolver, invoking registered handlers on match and stopping propagation to prevent duplicate handling.

## Exports
- `KeybindingSetup` - provider component that wraps the app to enable keybinding support with hot-reload and chord handling
