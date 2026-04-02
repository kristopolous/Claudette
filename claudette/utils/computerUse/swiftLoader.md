# swiftLoader

## Purpose
Lazy loader and cache for the `@ant/computer-use-swift` native module, which provides macOS-only computer use APIs (screen capture, app listing, capture preparation).

## Imports
- **Stdlib**: none
- **External**: `@ant/computer-use-swift` — `ComputerUseAPI` type
- **Internal**: none

## Logic
1. Throws on non-darwin platforms since the native module is macOS-only
2. Caches the loaded module in a module-level `cached` variable to avoid repeated require() calls
3. The native module's js/index.js reads `COMPUTER_USE_SWIFT_NODE_PATH` (baked by build-with-plugins.ts on darwin targets; falls through to node_modules prebuilds/ path otherwise)
4. The four @MainActor methods (captureExcluding, captureRegion, apps.listInstalled, resolvePrepareCapture) dispatch to DispatchQueue.main and will hang under libuv unless CFRunLoop is pumped — call sites must wrap these in drainRunLoop()

## Exports
- `requireComputerUseSwift(): ComputerUseAPI` - loads and returns the cached native module; throws on non-macOS platforms
- `ComputerUseAPI` — re-exported type from `@ant/computer-use-swift`
