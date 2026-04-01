## Purpose
Provides utility function for extracting team memory segment info from memory-saved messages.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: message types

## Logic
1. Reads teamCount from the memory saved message
2. Returns null if count is zero
3. Returns a segment string (e.g., "1 team memory" or "3 team memories") and the count for the caller to derive private count

## Exports
- `teamMemSavedPart` - Returns team memory segment string and count, or null if no team memories
