# tasks/LocalShellTask/LocalShellTask

## Purpose
Manages local shell task execution with stall detection and output handling.

## Imports
- **Stdlib**: `fs/promises`
- **External**: BUILDFLAGS
- **Internal**: xml constants, PromptSuggestion speculation, state, Task types, ids, cleanupRegistry, fsOperations, log, messageQueueManager, ShellCommand, task diskOutput/framework, xml utils, LocalAgentTask, LocalMainSessionTask, guards, killShellTasks

## Logic
1. `BACKGROUND_BASH_SUMMARY_PREFIX` - prefix for UI collapse transform
2. `STALL_CHECK_INTERVAL_MS` (5s), `STALL_THRESHOLD_MS` (45s), `STALL_TAIL_BYTES` (1KB)
3. `PROMPT_PATTERNS` - regexes for interactive prompts ((y/n), [y/n], yes/no, questions, Press any key, etc.)
4. `looksLikePrompt` - checks if tail matches prompt patterns
5. `startStallWatchdog` - watches for stalled output with interactive prompt
6. Monitors output file size growth
7. After 45s stall with prompt-like tail, sends notification
8. Latches to prevent duplicate notifications
9. Handles background agent tasks
10. Main session task detection
11. Task registration and state updates
12. XML tag handling for output, status, summary, task ID, notifications, tool use ID

## Exports
- `BACKGROUND_BASH_SUMMARY_PREFIX` - summary prefix constant
- `looksLikePrompt` - checks if output looks like interactive prompt
- `startStallWatchdog` - starts stall detection watchdog
- `LocalShellTask` - task definition for shell execution
