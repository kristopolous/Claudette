# utils/findExecutable

## Purpose
Finds executable by searching PATH, replacing spawn-rx's findActualExecutable.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: which

## Logic
1. `findExecutable` - finds executable similar to `which`
2. Replaces spawn-rx's findActualExecutable to avoid rxjs (~313KB)
3. Returns { cmd, args } to match spawn-rx API shape
4. `cmd` is resolved path if found, original name if not
5. `args` is pass-through of input args
6. Uses whichSync for PATH search
7. Cross-platform executable resolution

## Exports
- `findExecutable` - finds executable by PATH search
