# utils/semver

## Purpose
Provides semver comparison utilities using Bun.semver when available, falling back to npm semver.

## Imports
- **Stdlib**: (none)
- **External**: `semver` (npm package, lazy-loaded)
- **Internal**: (none)

## Logic
1. Bun.semver.order() is ~20x faster than npm semver comparisons
2. npm semver fallback always uses { loose: true }
3. `_npmSemver` - cached npm semver module reference
4. `getNpmSemver` - gets/creates npm semver module reference
5. `gt` - greater than comparison
6. Uses Bun.semver.order(a, b) === 1 in Bun, npm semver.gt in Node
7. `gte` - greater than or equal comparison
8. Uses Bun.semver.order(a, b) >= 0 in Bun, npm semver.gte in Node
9. `lt` - less than comparison
10. Uses Bun.semver.order(a, b) === -1 in Bun, npm semver.lt in Node
11. `lte` - less than or equal comparison
12. Uses Bun.semver.order(a, b) <= 0 in Bun, npm semver.lte in Node
13. `satisfies` - version satisfies range check
14. Uses Bun.semver.satisfies in Bun, npm semver.satisfies in Node
15. `order` - returns -1, 0, or 1 for comparison
16. Uses Bun.semver.order in Bun, npm semver.compare in Node

## Exports
- `gt` - greater than comparison
- `gte` - greater than or equal comparison
- `lt` - less than comparison
- `lte` - less than or equal comparison
- `satisfies` - version satisfies range
- `order` - comparison order (-1, 0, 1)
