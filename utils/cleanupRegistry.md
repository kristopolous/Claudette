# utils/cleanupRegistry

## Purpose
Global registry for cleanup functions during graceful shutdown.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `cleanupFunctions` - Set of cleanup functions
2. Separate from gracefulShutdown.ts to avoid circular dependencies
3. `registerCleanup` - registers cleanup function for shutdown
4. Returns unregister function that removes handler from set
5. Functions can be sync or async (wrapped in Promise)
6. `runCleanupFunctions` - runs all registered cleanup functions
7. Uses Promise.all for parallel execution
8. Called internally by gracefulShutdown
9. Enables modular cleanup registration across modules
10. Used for: file handles, network connections, temp files, etc.

## Exports
- `registerCleanup` - registers cleanup function
- `runCleanupFunctions` - runs all cleanup functions
