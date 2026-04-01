# utils/signal

## Purpose
Provides tiny listener-set primitive for pure event signals (no stored state).

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. Collapses ~8-line listener set boilerplate duplicated ~15× across codebase into one-liner
2. Distinct from store (AppState, createStore) - no snapshot, no getState
3. Use when subscribers only need to know "something happened", not "what is current value"
4. `Signal<Args>` - { subscribe, emit, clear }
5. subscribe - subscribes listener, returns unsubscribe function
6. emit - calls all subscribed listeners with given arguments
7. clear - removes all listeners (useful in dispose/reset paths)
8. `createSignal` - creates signal
9. Uses Set<(...args: Args) => void> for listeners
10. subscribe adds listener to set, returns function that deletes listener
11. emit iterates over listeners and calls each with args
12. clear calls listeners.clear()

## Exports
- `Signal` - signal type
- `createSignal` - creates signal
