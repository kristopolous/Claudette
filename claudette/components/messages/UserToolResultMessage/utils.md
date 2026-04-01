## Purpose
Provides a memoized hook to resolve a tool and its usage data from a tool use ID.

## Imports
- **External**: `react`
- **Internal**: `Tool`, `utils/messages`

## Logic
Looks up the tool use block by ID from the message lookups, then finds the corresponding tool definition by name. Returns an object containing both the tool and the tool use block, or null if either lookup fails. Memoized on the tool use ID, lookups, and tools to avoid redundant computation.

## Exports
- `useGetToolFromMessages` - hook that returns the tool definition and tool use block for a given tool use ID, or null if not found
