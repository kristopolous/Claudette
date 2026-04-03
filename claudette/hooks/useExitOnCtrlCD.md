## Purpose
Handles Ctrl-C and Ctrl-D keybindings to exit the application using a double-press confirmation pattern; also supports interrupt callback.

## Imports
- **External**: REACT (useCallback, useMemo, useState)
- **Internal**:
  - `../ink/hooks/useapp` (useApp)
  - `./keybindings/types` (KeybindingContextName)
  - `/useDoublePress` (useDoublePress)

## Logic
- Hook parameters:
  - `useKeybindingsHook`: injected for DI (avoids import cycles)
  - `onInterrupt?`: `() => boolean`; if returns true, interrupt is handled (prevents exit)
  - `onExit?`: custom exit function; defaults to `useApp().exit`
  - `isActive`: default true
- Uses two `useDoublePress` instances for Ctrl-C and Ctrl-D:
  - First press sets `exitState` to `{pending: true, keyName: 'Ctrl-C'}` or `'Ctrl-D'`
  - Second press within timeout triggers `exitFn`
- Binds:
  - `app:interrupt` → `handleInterrupt` (calls onInterrupt then handleCtrlCDoublePress if not handled)
  - `app:exit` → `handleExit` (calls handleCtrlDDoublePress)
- Registers via `useKeybindingsHook(handlers, {context: 'Global', isActive})`
- Returns `exitState` so UI can show "Press Ctrl-C again to exit" hint

## Exports
- `useExitOnCtrlCD` - Hook returning `{ pending: boolean, keyName: 'Ctrl-C' | 'Ctrl-D' | null }`
- `ExitState` type
