# services/tools/StreamingToolExecutor

## Purpose
Executes tools as they stream in with concurrency control.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`
- **Internal**: messages, hooks, Tool, BashTool, message types, abortController, toolExecution

## Logic
1. `MessageUpdate` - message and newContext for execution updates
2. `ToolStatus` - queued, executing, completed, yielded
3. `TrackedTool` - id, block, assistantMessage, status, isConcurrencySafe, promise, results, pendingProgress, contextModifiers
4. `StreamingToolExecutor` class with tools queue and execution state
5. Concurrent-safe tools execute in parallel with other concurrent-safe tools
6. Non-concurrent tools execute alone (exclusive access)
7. Results buffered and emitted in order tools were received
8. `discard` - discards pending and in-progress tools on streaming fallback
9. `addTool` - adds tool to execution queue, starts immediately if conditions allow
10. `siblingAbortController` - child abort controller for Bash tool errors
11. Aborting kills sibling subprocesses immediately on error
12. `progressAvailableResolve` - signal to wake up getRemainingResults on progress
13. Handles tool permission checks and rejection
14. Yields progress messages immediately, buffers final results

## Exports
- `MessageUpdate` - message update type
- `ToolStatus` - tool status type
- `TrackedTool` - tracked tool type
- `StreamingToolExecutor` - streaming tool executor class
