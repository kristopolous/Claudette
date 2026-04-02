# inputLoader

## Purpose
Lazy loader and cache for the `@ant/computer-use-input` native module, which provides keyboard input simulation (key/keys) via enigo on macOS.

## Imports
- **Stdlib**: none
- **External**: `@ant/computer-use-input` — `ComputerUseInput`, `ComputerUseInputAPI` types
- **Internal**: none

## Logic
1. Returns cached module if already loaded
2. Requires `@ant/computer-use-input` and checks the discriminated union `isSupported` flag — throws if not supported on the current platform
3. Caches the narrowed `ComputerUseInputAPI` (without the isSupported guard) so callers don't need to re-check
4. The native module's js/index.js reads `COMPUTER_USE_INPUT_NODE_PATH` (baked by build-with-plugins.ts on darwin targets; falls through to node_modules prebuilds/ path otherwise)
5. key()/keys() dispatch enigo work onto DispatchQueue.main via dispatch2::run_on_main, then block a tokio worker on a channel — under Electron (CFRunLoop drains the main queue) this works; under libuv (Node/bun) the main queue never drains and the promise hangs. The executor calls these inside drainRunLoop().

## Exports
- `requireComputerUseInput(): ComputerUseInputAPI` - loads, validates platform support, and returns the cached native input module
