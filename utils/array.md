# utils/array

## Purpose
Provides array utility functions for common operations.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `intersperse` - inserts separator between array elements
2. Takes array and separator function (receives index)
3. Uses flatMap to insert separator before each element except first
4. `count` - counts elements matching predicate
5. Iterates array, adds 1 for each truthy predicate result
6. Uses unary +!! for boolean to number conversion
7. `uniq` - removes duplicates from iterable
8. Uses Set for deduplication, spreads back to array
9. Works with any iterable, not just arrays

## Exports
- `intersperse` - inserts separator between elements
- `count` - counts elements matching predicate
- `uniq` - removes duplicates from iterable
