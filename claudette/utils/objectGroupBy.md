# utils/objectGroupBy

## Purpose
Provides Object.groupBy polyfill implementation.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `objectGroupBy` - implements TC39 Object.groupBy proposal
2. Takes iterable items and keySelector function
3. Returns Partial<Record<K, T[]>> grouped by key
4. Uses Object.create(null) for clean prototype-less object
5. Iterates items, applies keySelector to get key
6. Creates array for new keys, pushes item to array
7. Index passed to keySelector for position-aware grouping

## Exports
- `objectGroupBy` - groups items by key selector
