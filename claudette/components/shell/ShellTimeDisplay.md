# components/shell/ShellTimeDisplay

## Purpose
Provides shell time display component for showing elapsed time and timeout.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, format

## Logic
1. `Props` - { elapsedTimeSeconds?, timeoutMs? }
2. `ShellTimeDisplay` - UI component for shell time display
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Returns null if elapsedTimeSeconds undefined and no timeoutMs
5. Formats timeout via formatDuration with hideTrailingZeros: true
6. If elapsedTimeSeconds undefined: shows "(timeout {timeout})"
7. Calculates elapsed = formatDuration(elapsedTimeSeconds * 1000)
8. If timeout: shows "({elapsed} · timeout {timeout})"
9. Otherwise: shows "({elapsed})"
10. All text rendered with dimColor
11. `formatDuration` - formats duration
12. `Text` - ink text component

## Exports
- `ShellTimeDisplay` - shell time display component
