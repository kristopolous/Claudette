# lsp/manager

## Purpose
Provides singleton LSP server manager with initialization state tracking and test reset.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: debug, envUtils, errors, log, LSPServerManager, passiveFeedback

## Logic
1. `InitializationState` - enum: not-started, pending, success, failed
2. `lspManagerInstance` - global singleton instance
3. `initializationState` - tracks current initialization state
4. `initializationError` - error from last initialization attempt
5. `initializationGeneration` - counter preventing stale promises from updating state
6. `initializationPromise` - resolves when initialization completes
7. `_resetLspManagerForTesting` - test-only sync reset (clears state without async teardown)
8. `getLspManager` - returns singleton or undefined if not initialized/failed/pending
9. `getInitializationStatus` - returns current initialization state
10. `initializeLspServerManager` - async initialization with generation tracking
11. Registers LSP notification handlers for passive feedback
12. Respects isBareMode for minimal initialization

## Exports
- `InitializationState` - initialization state type
- `_resetLspManagerForTesting` - test-only reset function
- `getLspManager` - gets singleton manager instance
- `getInitializationStatus` - gets initialization status
- `initializeLspServerManager` - initializes manager asynchronously
- `shutdownLspServerManager` - shuts down all servers
