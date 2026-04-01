## Purpose
Provides utility functions for team memory operations in collapsed read/search UI, checking for team memory ops and rendering count parts.

## Imports
- **Stdlib**: None
- **External**: react
- **Internal**: ink (Text), message types

## Logic
1. checkHasTeamMemOps checks if a collapsed group has any team memory search, read, or write operations
2. TeamMemCountParts renders comma-separated text parts for team memory operations (recalling, searching, writing) with proper tense based on active/completed state
3. Both functions avoid React Compiler memoization by being plain functions rather than components

## Exports
- `checkHasTeamMemOps` - Returns true if the message contains any team memory operations
- `TeamMemCountParts` - React component rendering team memory count text parts for collapsed UI
