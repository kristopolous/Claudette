# tasks/LocalShellTask/killShellTasks

## Purpose
Provides pure kill helpers for LocalShellTask without React dependencies.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: state, ids, debug, log, messageQueueManager, task diskOutput/framework, guards

## Logic
1. `killTask` - kills a single shell task
2. Calls shellCommand.kill() and shellCommand.cleanup()
3. Clears unregisterCleanup and cleanupTimeoutId
4. Sets status to 'killed', notified=true, endTime=Date.now()
5. Evicts task output from disk
6. `killShellTasksForAgent` - kills all bash tasks spawned by given agent
7. Called from runAgent.ts finally block to prevent orphaned zombies
8. Iterates tasks, kills running shell tasks with matching agentId
9. Dequeues all queued notifications for dead agent
10. Prevents 10-day fake-logs.sh zombies from outliving agents

## Exports
- `killTask` - kills single shell task
- `killShellTasksForAgent` - kills all shell tasks for given agent
