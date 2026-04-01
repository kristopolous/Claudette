## Purpose
Renders system messages of various subtypes including turn duration, memory saved, bridge status, thinking, API errors, stop hook summaries, and general info/warning messages.

## Imports
- **Stdlib**: path (basename)
- **External**: react, lodash-es/sample, figures, bun:bundle
- **Internal**: ink (Box, Text, Link), MessageResponse, FilePathLink, CtrlOToExpand, ThemedText, messageActions, useTerminalSize, useAppStateStore, format utils, config utils, browser utils, turnCompletionVerbs constants, figures constants, teamMemSaved (feature-gated), SystemAPIErrorMessage

## Logic
1. Dispatches on message subtype to specialized sub-components:
   - turn_duration: Shows completion verb, duration, budget usage, and background task summary
   - memory_saved: Shows saved memory count (private and team) with file path links
   - away_summary: Shows dimmed content with reference mark
   - agents_killed: Shows "All background agents stopped" in error color
   - thinking: Returns null (hidden)
   - bridge_status: Shows remote control status with URL link
   - scheduled_task_fire: Shows task fire notification with teardrop asterisk
   - permission_retry: Shows allowed commands
   - api_error: Delegates to SystemAPIErrorMessage
   - stop_hook_summary: Shows hook run summary with counts, durations, errors, and prevention reason
2. For generic messages, renders content with dot indicator and color based on message level (info/warning/error)

## Exports
- `SystemTextMessage` - Main component dispatching on system message subtype
- `StopHookSummaryMessage` - Renders stop hook summary with hook details
- `SystemTextMessageInner` - Renders generic system text with dot and color
- `TurnDurationMessage` - Renders turn duration with budget info
- `MemorySavedMessage` - Renders memory saved notification with file links
- `ThinkingMessage` - Renders thinking system message (dimmed)
- `BridgeStatusMessage` - Renders remote bridge control status
- `MemoryFileRow` - Renders a single saved memory file path with hover link
