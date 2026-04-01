# state/store

## Purpose
Provides minimal store implementation for state management.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `Listener` - callback type for state changes
2. `OnChange<T>` - callback with newState and oldState
3. `Store<T>` - interface with getState, setState, subscribe
4. `createStore` - factory function creating store instance
5. Maintains internal state and listener set
6. `getState` - returns current state
7. `setState` - applies updater, notifies listeners on change
8. Uses Object.is for change detection (no notify if unchanged)
9. `subscribe` - adds listener, returns unsubscribe function
10. Simple pub/sub pattern without React dependencies

## Exports
- `Listener` - listener callback type
- `OnChange<T>` - change callback type
- `Store<T>` - store interface type
- `createStore` - factory creating store instance
