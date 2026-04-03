# components/shell/ShellProgressMessage

## Purpose
Provides shell progress message component for displaying command output.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER, `strip-ansi`
- **Internal**: ink, format, MessageResponse, OffscreenFreeze, shell ShellTimeDisplay

## Logic
1. `Props` - { output, fullOutput, elapsedTimeSeconds?, totalLines?, totalBytes?, timeoutMs?, taskId?, verbose }
2. `ShellProgressMessage` - UI component for shell progress
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Strips ANSI codes from fullOutput via stripAnsi
5. Strips ANSI codes from output, splits into lines, filters empty lines
6. Shows last 5 lines if not verbose, full output if verbose
7. If no lines: shows "Running…" with ShellTimeDisplay
8. Calculates extraLines = totalLines - 5 if not verbose
9. Shows line status: ~{totalLines} lines or +{extraLines} lines
10. Shows byte size via formatFileSize if totalBytes present
11. Wraps output in MessageResponse with OffscreenFreeze
12. Uses ShellTimeDisplay for elapsed time and timeout display
13. `stripAnsi` - strips ANSI codes
14. `formatFileSize` - formats file size
15. `MessageResponse` - message response component
16. `OffscreenFreeze` - offscreen freeze component
17. `ShellTimeDisplay` - shell time display component

## Exports
- `ShellProgressMessage` - shell progress message component
