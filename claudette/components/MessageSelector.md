## Purpose
Dialog for selecting a previous user message to restore, with options for conversation rewind, code restoration, and summarization.

## Imports
- **Stdlib**: crypto (randomUUID, UUID), path
- **External**: figures, react, react/compiler-runtime
- **Internal**: @anthropic-ai/sdk/resources/index.mjs (ContentBlockParam, TextBlockParam), src/services/analytics/index.js (logEvent), src/state/AppState.js (useAppState), src/utils/fileHistory.js (DiffStats, fileHistoryCanRestore, fileHistoryEnabled, fileHistoryGetDiffStats), src/utils/log.js (logError), src/hooks/useTerminalSize.js (useTerminalSize), src/tools/FileEditTool/types.js (FileEditOutput), src/tools/FileWriteTool/FileWriteTool.js (Output), ../constants/xml.js (BASH_STDERR_TAG, BASH_STDOUT_TAG, COMMAND_MESSAGE_TAG, LOCAL_COMMAND_STDERR_TAG, LOCAL_COMMAND_STDOUT_TAG, TASK_NOTIFICATION_TAG, TEAMMATE_MESSAGE_TAG, TICK_TAG), ../hooks/useExitOnCtrlCDWithKeybindings.js (useExitOnCtrlCDWithKeybindings), ../ink.js (Box, Text), ../keybindings/useKeybinding.js (useKeybinding, useKeybindings), ../types/message.js (Message, PartialCompactDirection, UserMessage), ../utils/displayTags.js (stripDisplayTags), ../utils/messages.js (createUserMessage, extractTag, isEmptyMessageText, isSyntheticMessage, isToolUseResultMessage), ../utils/array.js (count), ../utils/format.js (formatRelativeTimeAgo, truncate), ../utils/theme.js (Theme), ./CustomSelect/select.js (OptionWithDescription, Select), ./Spinner.js (Spinner), ./design-system/Divider.js (Divider)

## Logic
Displays a list of selectable user messages with the current prompt as a virtual entry. Supports navigation via keyboard (up/down/top/bottom/select). When a message is selected, shows a confirmation dialog with restore options: both code and conversation, conversation only, code only, summarize from here, or summarize up to here. Integrates with file history to show diff stats (files changed, insertions, deletions) for each message. Handles error states and loading indicators during restoration. Filters out synthetic, meta, command output, and other non-user-authored messages from the selection list.

## Exports
- `MessageSelector` - Dialog for selecting and restoring a previous message with code/conversation/summarize options
- `selectableUserMessagesFilter` - Filters messages to only include user-authored, non-synthetic messages
- `messagesAfterAreOnlySynthetic` - Checks if all messages after an index are synthetic or non-meaningful
