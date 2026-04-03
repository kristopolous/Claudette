## Purpose
Dialog for selecting a previous user message to restore, with options for conversation rewind, code restoration, and summarization.

## Imports
- **Stdlib**: crypto (randomUUID, UUID), path
- **External**: figures, REACT, REACT/compiler-runtime
- **Internal**: @anthropic-ai/sdk/resources/index.mjs (ContentBlockParam, TextBlockParam),src/services/analytics/index (logEvent),src/state/AppState (useAppState),src/utils/fileHistory (DiffStats, fileHistoryCanRestore, fileHistoryEnabled, fileHistoryGetDiffStats),src/utils/log (logError),src/hooks/useTerminalSize (useTerminalSize),src/tools/FileEditTool/types (FileEditOutput),src/tools/FileWriteTool/FileWriteTool (Output), ./constants/xml (BASH_STDERR_TAG, BASH_STDOUT_TAG, COMMAND_MESSAGE_TAG, LOCAL_COMMAND_STDERR_TAG, LOCAL_COMMAND_STDOUT_TAG, TASK_NOTIFICATION_TAG, TEAMMATE_MESSAGE_TAG, TICK_TAG), ./hooks/useExitOnCtrlCDWithKeybindings (useExitOnCtrlCDWithKeybindings), ./ink (Box, Text), ./keybindings/useKeybinding (useKeybinding, useKeybindings), ./types/message (Message, PartialCompactDirection, UserMessage), ./utils/displayTags (stripDisplayTags), ./utils/messages (createUserMessage, extractTag, isEmptyMessageText, isSyntheticMessage, isToolUseResultMessage), ./utils/array (count), ./utils/format (formatRelativeTimeAgo, truncate), ./utils/theme (Theme), ./CustomSelect/select (OptionWithDescription, Select), ./Spinner (Spinner), ./design-system/Divider (Divider)

## Logic
Displays a list of selectable user messages with the current prompt as a virtual entry. Supports navigation via keyboard (up/down/top/bottom/select). When a message is selected, shows a confirmation dialog with restore options: both code and conversation, conversation only, code only, summarize from here, or summarize up to here. Integrates with file history to show diff stats (files changed, insertions, deletions) for each message. Handles error states and loading indicators during restoration. Filters out synthetic, meta, command output, and other non-user-authored messages from the selection list.

## Exports
- `MessageSelector` - Dialog for selecting and restoring a previous message with code/conversation/summarize options
- `selectableUserMessagesFilter` - Filters messages to only include user-authored, non-synthetic messages
- `messagesAfterAreOnlySynthetic` - Checks if all messages after an index are synthetic or non-meaningful
