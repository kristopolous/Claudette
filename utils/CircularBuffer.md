# utils/CircularBuffer

## Purpose
Provides fixed-size circular buffer with automatic oldest-item eviction.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `CircularBuffer<T>` - generic class with capacity
2. `buffer` - internal array of fixed capacity
3. `head` - write position (circular index)
4. `size` - current number of items
5. `add` - adds item, evicts oldest if full
6. Updates head with modulo for circular wrap
7. Increments size up to capacity
8. `addAll` - adds multiple items at once
9. `getRecent` - gets most recent N items
10. Returns fewer if buffer has less than N
11. Calculates start position based on size vs capacity
12. `toArray` - gets all items oldest to newest
13. `clear` - clears all items, resets head and size
14. `getSize` - gets current item count
15. `getCapacity` - gets buffer capacity
16. Useful for rolling window of data (logs, messages, etc.)

## Exports
- `CircularBuffer<T>` - circular buffer class
