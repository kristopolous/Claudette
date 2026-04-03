# ink/events/dispatcher

## Purpose
Provides event dispatcher for terminal events with DOM-style propagation.

## Imports
- **Stdlib**: (none)
- **External**: RECONCILER constants
- **Internal**: utils log, events event-handlers/terminal-event

## Logic
1. `DispatchListener` - { node, handler, phase }
2. `getHandler` - gets handler for node/eventType/capture
3. Gets _eventHandlers from node
4. Gets mapping from HANDLER_FOR_EVENT[eventType]
5. Gets propName from mapping.capture or mapping.bubble
6. Returns handler from handlers[propName]
7. `collectListeners` - collects all listeners for event in dispatch order
8. Uses react-dom's two-phase accumulation pattern
9. Walks from target to root
10. Capture handlers prepended (unshift) → root-first
11. Bubble handlers appended (push) → target-first
12. Result: [root-cap, ..., parent-cap, target-cap, target-bub, parent-bub, ..., root-bub]
13. `dispatchEvent` - dispatches event through DOM tree
14. Gets event priority from getEventPriority
15. Collects listeners via collectListeners
16. Sets event._eventPhase for each listener
17. Calls each listener with event
18. Stops if event._propagationStopped
19. `getEventPriority` - gets React event priority from event type
20. Returns DiscreteEventPriority for keydown, focus, blur, paste, click
21. Returns ContinuousEventPriority for resize
22. Returns DefaultEventPriority for others
23. Returns NoEventPriority for unknown
24. `ContinuousEventPriority`, `DefaultEventPriority`, `DiscreteEventPriority`, `NoEventPriority` - React event priorities
25. `HANDLER_FOR_EVENT` - handler mapping
26. `EventTarget`, `TerminalEvent` - event types
27. `logError` - logs error

## Exports
- `DispatchListener` - dispatch listener type
- `getHandler` - gets handler
- `collectListeners` - collects listeners
- `dispatchEvent` - dispatches event
- `getEventPriority` - gets event priority
