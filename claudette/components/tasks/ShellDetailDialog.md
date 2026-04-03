# components/tasks/ShellDetailDialog

## Purpose
Provides shell detail dialog component for viewing shell task output.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: types utils, commands, hooks useTerminalSize, ink events keyboard-event, ink, keybindings useKeybinding, tasks LocalShellTask guards, format, fsOperations, task diskOutput, design-system Byline/Dialog/KeyboardShortcutHint

## Logic
1. `Props` - { shell, onDone, onKillShell?, onBack? }
2. `SHELL_DETAIL_TAIL_BYTES` (8192) - bytes to tail from shell output
3. `TaskOutputResult` - { content, bytesTotal }
4. `getTaskOutput` - reads tail of task output file (last few KB)
5. Uses getTaskOutputPath to get output file path
6. Uses tailFile to read last SHELL_DETAIL_TAIL_BYTES
7. Returns { content, bytesTotal } or { content: '', bytesTotal: 0 } on error
8. `ShellDetailDialog` - UI component for shell detail dialog
9. Uses REACT_COMPILER runtime (_c) for memoization
10. Uses useTerminalSize for columns
11. Uses useState for outputPromise
12. Uses useDeferredValue for deferredOutputPromise
13. Uses useEffect to poll output every 1000ms when shell running
14. Uses useKeybindings for keyboard shortcuts
15. Renders Dialog with shell task details
16. Shows command, status, duration, output
17. Shows kill button if onKillShell provided
18. Shows back button if onBack provided
19. `useTerminalSize` - gets terminal size
20. `KeyboardEvent` - keyboard event type
21. `useKeybindings` - gets keybindings
22. `LocalShellTaskState` - local shell task state type
23. `formatDuration`, `formatFileSize`, `truncateToWidth` - format functions
24. `tailFile` - tails file
25. `getTaskOutputPath` - gets task output path
26. `Byline`, `Dialog`, `KeyboardShortcutHint` - design system components

## Exports
- `SHELL_DETAIL_TAIL_BYTES` - tail bytes constant
- `TaskOutputResult` - task output result type
- `getTaskOutput` - gets task output
- `ShellDetailDialog` - shell detail dialog component
