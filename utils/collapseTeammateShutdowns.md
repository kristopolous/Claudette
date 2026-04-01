# utils/collapseTeammateShutdowns

## Purpose
Collapses consecutive teammate shutdown attachments into single batch attachment.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: message types

## Logic
1. `isTeammateShutdownAttachment` - type guard for teammate shutdown attachments
2. Checks type === 'attachment', attachment.type === 'task_status'
3. Checks taskType === 'in_process_teammate', status === 'completed'
4. `collapseTeammateShutdowns` - collapses consecutive shutdowns
5. Iterates through messages looking for teammate shutdown attachments
6. Counts consecutive shutdown attachments
7. Single shutdown: passes through unchanged
8. Multiple shutdowns: creates teammate_shutdown_batch attachment with count
9. Preserves message order for non-shutdown messages
10. Returns collapsed message array

## Exports
- `isTeammateShutdownAttachment` - type guard for shutdown attachments
- `collapseTeammateShutdowns` - collapses consecutive shutdowns
