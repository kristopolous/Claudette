# utils/abortController

## Purpose
Provides AbortController utilities with proper event listener management.

## Imports
- **Stdlib**: `events`
- **External**: (none)
- **Internal**: (none)

## Logic
1. `DEFAULT_MAX_LISTENERS` (50) - default max listeners
2. `createAbortController` - creates AbortController with listener limit
3. Uses setMaxListeners to prevent MaxListenersExceededWarning
4. `propagateAbort` - propagates abort from parent to weakly-referenced child
5. Both parent and child weakly held - neither creates strong reference
6. Module-scope function avoids per-call closure allocation
7. `removeAbortHandler` - removes abort handler from weakly-referenced parent
8. No-op if either GC'd or parent already aborted
9. `createChildAbortController` - creates child that aborts when parent aborts
10. Child abort doesn't affect parent
11. Uses WeakRef so parent doesn't retain abandoned children
12. Removes parent listener when child aborted (prevents handler accumulation)
13. Fast path: if parent already aborted, no listener setup needed

## Exports
- `DEFAULT_MAX_LISTENERS` - default max listeners constant
- `createAbortController` - creates AbortController with listener limit
- `createChildAbortController` - creates child abort controller
