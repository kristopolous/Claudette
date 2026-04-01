## Purpose
Renders user message attachments of various types including files, directories, memories, skills, MCP resources, hook responses, task statuses, and teammate mailbox content.

## Imports
- **Stdlib**: path (basename, sep)
- **External**: react, bun:bundle
- **Internal**: ink (Ansi, Box, Text), MessageResponse, UserTextMessage, UserImageMessage, DiagnosticsDisplay, CtrlOToExpand, FilePathLink, PlanApprovalMessage, UserTeammateMessage, teammateMailbox utils, attachments utils, file utils, format utils, theme utils, ink utils, slowOperations utils, stringUtils utils, envUtils utils, agentSwarmsEnabled utils, messageActions, appState, figures constants, nullRenderingAttachments

## Logic
1. Handles teammate_mailbox attachments before the main switch: filters visible messages, renders task assignments and plan approvals, falls back to TeammateMessageContent
2. Handles skill_discovery attachments in a feature-gated block: shows skill count and names with feedback hint
3. Switches on attachment type to render appropriate UI:
   - file/directory/read: Shows file path with cell count, line count, or file size
   - compact_file_reference/pdf_reference: Shows referenced file/PDF with page count
   - selected_lines_in_ide: Shows selected line range from IDE
   - nested_memory/relevant_memories: Shows loaded/recalled memory count with optional file details
   - skill_listing/agent_listing_delta: Shows available skills or agent types
   - queued_command: Delegates to UserTextMessage and UserImageMessage
   - mcp_resource: Shows MCP server and resource name
   - hook responses/errors: Shows hook event completion, blocking errors with stderr, or non-blocking errors
   - task_status: Shows task status (completed, killed, running) with teammate-specific rendering
   - teammate_shutdown_batch: Shows count of gracefully shut down teammates
4. Types not handled by any case are validated against NullRenderingAttachmentType and return null

## Exports
- `AttachmentMessage` - React component rendering all attachment types with type-specific UI
- `Line` - Internal helper component for single-line attachment display with MessageResponse styling
- `TaskStatusMessage` - Internal component dispatching to teammate or generic task status rendering
- `GenericTaskStatus` - Internal component rendering generic task status with black circle indicator
- `TeammateTaskStatus` - Internal component rendering in-process teammate task status with agent name and color
