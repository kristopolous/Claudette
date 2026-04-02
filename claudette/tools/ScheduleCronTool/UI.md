# tools/ScheduleCronTool/UI.tsx

## Purpose
Renders UI messages for the cron scheduling tools (create, delete, list) across use and result states.

## Imports
- **Stdlib**: None
- **External**: `react`
- **Internal**: `MessageResponse`, `Text`, `truncate`, `CreateOutput`, `DeleteOutput`, `ListOutput`

## Logic
Provides React renderers for three cron sub-tools. Create messages show the cron expression and truncated prompt; results display the job ID and human-readable schedule. Delete messages show the job ID; results confirm cancellation. List messages are empty; results iterate over jobs showing ID and schedule, or display "No scheduled jobs" when empty.

## Exports
- `renderCreateToolUseMessage` - renders cron expression and truncated prompt for create tool use
- `renderCreateResultMessage` - renders scheduled job confirmation with ID and human-readable schedule
- `renderDeleteToolUseMessage` - renders job ID for delete tool use
- `renderDeleteResultMessage` - renders cancelled job confirmation with ID
- `renderListToolUseMessage` - renders empty string for list tool use
- `renderListResultMessage` - renders list of scheduled jobs with IDs and schedules, or empty state
