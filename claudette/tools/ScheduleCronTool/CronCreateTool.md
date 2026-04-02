# tools/ScheduleCronTool/CronCreateTool.ts

## Purpose
Schedules a prompt to run at a future time, supporting both recurring cron schedules and one-shot reminders with optional disk persistence.

## Imports
- **Stdlib**: `Date`
- **External**: `zod/v4`
- **Internal**: `setScheduledTasksEnabled`, `ValidationResult`, `buildTool`, `ToolDef`, `cronToHuman`, `parseCronExpression`, `addCronTask`, `getCronFilePath`, `listAllCronTasks`, `nextCronRunMs`, `lazySchema`, `semanticBoolean`, `getTeammateContext`, `buildCronCreateDescription`, `buildCronCreatePrompt`, `CRON_CREATE_TOOL_NAME`, `DEFAULT_MAX_AGE_DAYS`, `isDurableCronEnabled`, `isKairosCronEnabled`, `renderCreateResultMessage`, `renderCreateToolUseMessage`

## Logic
Validates the cron expression is parseable and will match within a year, checks the job limit (max 50), and prevents durable crons for teammates. On execution, adds the task to storage (disk or memory based on durable flag and feature gate), enables the scheduler, and returns the job ID with schedule details. Recurring tasks auto-expire after a configured number of days. The scheduler is activated on first task creation.

## Exports
- `CronCreateTool` - tool that schedules recurring or one-shot prompts with optional durability
- `CreateOutput` - type for the create tool output containing job ID, human-readable schedule, recurring flag, and durable flag
