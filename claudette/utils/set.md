# set

## Purpose
Optimized Set utility functions for hot-path operations. All functions are generic and designed for speed with minimal allocation.

## Logic
1. `difference(a, b)` — returns items in `a` but not in `b`
2. `intersects(a, b)` — early returns false if either set is empty, then iterates the smaller set checking membership in the other
3. `every(a, b)` — returns true if every item in `a` exists in `b` (subset check), accepts ReadonlySet
4. `union(a, b)` — returns a new Set containing all items from both sets

## Exports
- `difference<A>(a: Set<A>, b: Set<A>): Set<A>` — items in a but not in b
- `intersects<A>(a: Set<A>, b: Set<A>): boolean` — true if any item exists in both sets
- `every<A>(a: ReadonlySet<A>, b: ReadonlySet<A>): boolean` — true if a is a subset of b
- `union<A>(a: Set<A>, b: Set<A>): Set<A>` — union of both sets

## Source
`set`