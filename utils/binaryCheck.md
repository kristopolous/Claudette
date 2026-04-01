# utils/binaryCheck

## Purpose
Checks if binaries/commands are installed on the system.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: debug, which

## Logic
1. `binaryCache` - session cache to avoid repeated checks
2. `isBinaryInstalled` - checks if command exists
3. Uses 'which' on Unix, 'where' on Windows
4. Returns false for empty/whitespace commands
5. Trims command before checking
6. Checks cache first for performance
7. Caches result after check
8. Logs debug info for cache hits/misses
9. `clearBinaryCache` - clears cache (testing)
10. Async function returning Promise<boolean>

## Exports
- `isBinaryInstalled` - checks if binary installed
- `clearBinaryCache` - clears binary cache
