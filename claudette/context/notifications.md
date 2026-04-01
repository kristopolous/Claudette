# notifications

## Purpose
Provides React hook and context for managing a notification queue with priorities, timeouts, and folding.

## Imports
- **Stdlib**: (none)
- **External**: `react`
- **Internal**: AppState store, theme types

## Logic
1. `Notification` type - union of TextNotification and JSXNotification
2. Priority levels: low, medium, high, immediate
3. `invalidates` - keys of notifications this notification invalidates
4. `fold` - merge function for combining notifications with same key (like Array.reduce)
5. `useNotifications` hook returns addNotification and removeNotification
6. Immediate priority notifications preempt current display
7. Default timeout 8s, clears when immediate notifications arrive
8. Process queue when current notification finishes or queue changes
9. Compares by key for re-created notifications

## Exports
- `Notification` - type for notification content
- `Priority` - type for notification priority levels
- `useNotifications` - hook for adding/removing notifications
