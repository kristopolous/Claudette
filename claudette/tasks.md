## Purpose
Aggregates and provides access to all available task types, including shell tasks, agent tasks, and feature-gated workflow and monitor tasks.

## Imports
- **External**: `bun:bundle`
- **Internal**: `Task`, `tasks/DreamTask/DreamTask`, `tasks/LocalAgentTask/LocalAgentTask`, `tasks/LocalShellTask/LocalShellTask`, `tasks/RemoteAgentTask/RemoteAgentTask`, `tasks/LocalWorkflowTask/LocalWorkflowTask`, `tasks/MonitorMcpTask/MonitorMcpTask`

## Logic
Conditionally loads LocalWorkflowTask and MonitorMcpTask based on feature flags (WORKFLOW_SCRIPTS and MONITOR_TOOL). Collects all available tasks into an array and provides lookup by task type. Uses require for feature-gated tasks to avoid bundling them when disabled.

## Exports
- `getAllTasks` - returns an array of all available task instances
- `getTaskByType` - looks up a task by its type identifier
