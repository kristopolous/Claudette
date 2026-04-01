# tasks/stopTask

## Purpose
Provides shared logic for stopping running tasks (LLM-invoked and SDK control request).

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: state, Task types, tasks, sdkEventQueue, LocalShellTask guards

## Logic
1. `StopTaskError` - error class with code: not_found, not_running, unsupported_type
2. `StopTaskContext` - getAppState, setAppState functions
3. `StopTaskResult` - taskId, taskType, command
4. `stopTask` - main function for stopping tasks
5. Validates task exists and is running
6. Gets task implementation via getTaskByType
7. Calls taskImpl.kill() to stop task
8. LocalShellTask: suppresses "exit code 137" notification (noise)
9. Agent tasks: don't suppress - AbortError carries extractPartialResult payload
10. Marks task as notified after kill
11. Emits task terminated event to SDK
12. Throws StopTaskError with appropriate code for failures

## Exports
- `StopTaskError` - error class for stop failures
- `StopTaskContext` - context type for stop operation
- `StopTaskResult` - result type for stop operation
- `stopTask` - stops running task by ID
