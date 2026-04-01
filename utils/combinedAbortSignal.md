# utils/combinedAbortSignal

## Purpose
Creates combined AbortSignal from multiple signals and optional timeout.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: abortController

## Logic
1. `createCombinedAbortSignal` - creates combined abort signal
2. Takes primary signal, optional signalB, optional timeoutMs
3. Returns { signal, cleanup } - combined signal and cleanup function
4. Uses setTimeout + clearTimeout instead of AbortSignal.timeout
5. Under Bun, AbortSignal.timeout timers accumulate in native memory (~2.4KB/call)
6. This implementation frees timer immediately on cleanup
7. Fast path: if either signal already aborted, returns immediately
8. `abortCombined` - aborts combined controller, clears timer
9. Sets up listeners on both input signals
10. Timer unref'd to not block process exit
11. `cleanup` - clears timer, removes event listeners
12. Prevents memory leaks from accumulated listeners

## Exports
- `createCombinedAbortSignal` - creates combined abort signal with cleanup
