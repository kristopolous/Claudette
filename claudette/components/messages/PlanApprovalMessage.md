## Purpose
Renders plan approval request and response messages between teammates, showing plan content, approval/rejection status, and feedback.

## Imports
- **Stdlib**: None
- **External**: react
- **Internal**: ink (Box, Text), Markdown, teammateMailbox utils, slowOperations utils, ShutdownMessage, TaskAssignmentMessage

## Logic
1. Plan approval requests: Renders sender header in plan mode color, plan content as Markdown in dashed border, and plan file path
2. Plan approval responses: If approved, shows green success border with confirmation message; if rejected, shows red error border with feedback and revision instructions
3. tryRenderPlanApprovalMessage attempts to parse content as request or response and renders accordingly
4. getPlanApprovalSummary returns a brief summary string for inbox/queue display
5. getIdleNotificationSummary formats idle notification messages with task and DM info
6. formatTeammateMessageContent checks for structured messages (plan approval, shutdown, idle, task assignment, terminated) and returns formatted summary or original content

## Exports
- `PlanApprovalRequestDisplay` - React component rendering a plan approval request with plan content
- `PlanApprovalResponseDisplay` - React component rendering approval/rejection response with feedback
- `tryRenderPlanApprovalMessage` - Parses and renders plan approval messages, returns null if not applicable
- `formatTeammateMessageContent` - Formats teammate message content, returning summary for structured messages
