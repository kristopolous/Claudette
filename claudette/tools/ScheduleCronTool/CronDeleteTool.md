# tools/ScheduleCronTool/CronDeleteTool.ts

## Purpose
Cancels a previously scheduled cron job by its ID, with validation for job existence and teammate ownership.

## Imports
- **Stdlib**: None
- **External**: `zod/v4`
- **Internal**: `ValidationResult`, `buildTool`, `ToolDef`, `getCronFilePath`, `listAllCronTasks`, `removeCronTasks`, `lazySchema`, `getTeammateContext`, `buildCronDeletePrompt`, `CRON_DELETE_DESCRIPTION`, `CRON_DELETE_TOOL_NAME`, `isDurableCronEnabled`, `isKairosCronEnabled`, `renderDeleteResultMessage`, `renderDeleteToolUseMessage`

## Logic
Validates that the target job exists and that the current agent owns it (teammates cannot delete other agents' jobs). On valid input, removes the task from storage (disk for durable jobs, memory for session-only). Returns the deleted job ID. Input validation produces specific error codes for missing jobs and ownership violations.

## Exports
- `CronDeleteTool` - tool that cancels a scheduled cron job by ID with ownership validation
- `DeleteOutput` - type for the delete tool output containing the cancelled job ID
