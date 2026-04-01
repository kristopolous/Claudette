## Purpose
Provides the base Event class with immediate propagation control functionality, similar to the DOM Event API.

## Imports
- **Stdlib**: None specified
- **External**: None specified
- **Internal**: None specified (self-contained module)

## Logic
1. **Event Class**: Base class for all Ink events with propagation control:
   - `_didStopImmediatePropagation`: Private boolean flag tracking if stopImmediatePropagation() has been called
   - `didStopImmediatePropagation()`: Method returning the current state of the propagation flag
   - `stopImmediatePropagation()`: Method that sets the propagation flag to true, preventing further listeners from being called

2. **Usage**:
   - Used by EventEmitter to determine when to stop iterating through listeners
   - When an event listener calls stopImmediatePropagation(), subsequent listeners for the same event will not be invoked
   - Follows the same pattern as the DOM Event API's stopImmediatePropagation() method

## Exports
- `Event` - Base class for all Ink events with propagation control methods