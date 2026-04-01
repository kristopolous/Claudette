## Purpose
Lists all scheduled cron jobs, filtering by teammate context when applicable.

## Imports
- **Stdlib**: None
- **External**: `zod/v4`
- **Internal**: `buildTool`, `ToolDef`, `cronToHuman`, `listAllCronTasks`, `truncate`, `lazySchema`, `getTeammateContext`, `buildCronListPrompt`, `CRON_LIST_DESCRIPTION`, `CRON_LIST_TOOL_NAME`, `isDurableCronEnabled`, `isKairosCronEnabled`, `renderListResultMessage`, `renderListToolUseMessage`

## Logic
Checks if cron is enabled, then retrieves all cron tasks and filters by teammate agent ID if present. Maps each task to a job object with ID, cron expression, human-readable schedule, prompt, and recurring/durable flags. Results are formatted as a readable string with job details and truncated prompts, or "No scheduled jobs" if none exist.

## Exports
- `CronListTool` - tool that lists active cron jobs with teammate-aware filtering
- `ListOutput` - type for the list tool output containing an array of job objects
