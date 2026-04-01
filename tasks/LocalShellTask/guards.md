# tasks/LocalShellTask/guards

## Purpose
Provides pure type guards for LocalShellTask state without React dependencies.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: Task types, ids, ShellCommand

## Logic
1. `BashTaskKind` - union: 'bash' | 'monitor'
2. `LocalShellTaskState` - extends TaskStateBase with shell-specific fields
3. type: 'local_bash' (backward compatible with persisted state)
4. command - the shell command being executed
5. result - { code, interrupted } on completion
6. completionStatusSentInAttachment - tracks if status sent
7. shellCommand - ShellCommand instance (runtime only)
8. unregisterCleanup, cleanupTimeoutId - cleanup handles
9. lastReportedTotalLines - tracks reported output for deltas
10. isBackgrounded - false=foreground, true=backgrounded
11. agentId - spawning agent (undefined = main thread)
12. kind - UI display variant ('monitor' shows description not command)
13. `isLocalShellTask` - type guard checking type === 'local_bash'

## Exports
- `BashTaskKind` - bash task kind type
- `LocalShellTaskState` - local shell task state type
- `isLocalShellTask` - type guard for shell tasks
