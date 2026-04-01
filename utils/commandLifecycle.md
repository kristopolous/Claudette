# utils/commandLifecycle

## Purpose
Provides command lifecycle notification system.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `CommandLifecycleState` - 'started' | 'completed'
2. `CommandLifecycleListener` - callback with uuid and state
3. `listener` - single listener (null when not set)
4. `setCommandLifecycleListener` - sets or clears listener
5. `notifyCommandLifecycle` - notifies listener of state change
6. No-op if listener is null
7. Used for tracking command execution lifecycle
8. Enables UI updates on command start/complete

## Exports
- `CommandLifecycleState` - lifecycle state type
- `CommandLifecycleListener` - listener callback type
- `setCommandLifecycleListener` - sets lifecycle listener
- `notifyCommandLifecycle` - notifies of lifecycle change
