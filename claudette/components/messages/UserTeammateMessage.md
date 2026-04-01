## Purpose
Renders messages from teammates in multi-agent sessions, parsing XML-formatted teammate messages and dispatching to specialized handlers for plan approvals, shutdown requests, task assignments, and task completions.

## Imports
- **Stdlib**: None
- **External**: react, @anthropic-ai/sdk, figures
- **Internal**: ink (Ansi, Box, Text), MessageResponse, PlanApprovalMessage, ShutdownMessage, TaskAssignmentMessage, teammateMailbox utils, xml constants, ink utils, slowOperations utils

## Logic
1. Parses XML-formatted teammate messages using regex to extract teammate_id, color, summary, and content
2. Filters out shutdown-approved and terminated messages to avoid empty wrappers
3. For each parsed message, tries specialized renderers in order: plan approval, shutdown, task assignment
4. Handles idle notifications by hiding them (processed silently)
5. Renders task_completed notifications with checkmark and task details
6. Falls back to TeammateMessageContent for plain text messages with sender header and truncated content

## Exports
- `UserTeammateMessage` - React component parsing and rendering teammate messages from XML format
- `TeammateMessageContent` - Internal component rendering a single teammate message with sender, color, and content
