# messages.ts

## Purpose
Message creation, normalization, and transformation utilities for the Claude Code conversation system. Handles creating user/assistant/system messages, normalizing messages for API calls, managing tool use/results, streaming message handling, and message filtering/transformation.

## Imports
- **Stdlib**: `crypto` (randomUUID, UUID), `lodash-es` (isObject, last)
- **External**: `@anthropic-ai/sdk`, `@anthropic-ai/sdk/resources/beta/messages/messages.mjs`
- **Internal**: Message types (Message, AssistantMessage, UserMessage, NormalizedMessage, etc.), Tool types, analytics services, config, format utilities, plan mode utilities, attachment utilities

## Logic
1. **Message Creation**: Factory functions for creating user, assistant, progress, and system messages with proper typing and defaults
2. **Message ID Derivation**: Deterministic UUID generation from parent UUID + index for consistent message referencing
3. **Normalization**: Split multi-block messages into single-block normalized messages, reorder tool results, merge consecutive user messages
4. **Tool Use/Result Management**: Track tool_use/tool_result pairing, detect synthetic messages, reorder messages for UI display
5. **Streaming**: Handle stream events from the API, track streaming tool uses and thinking blocks
6. **Attachment Processing**: Transform various attachment types into user messages for API consumption
7. **Filtering**: Remove invalid messages (whitespace-only, orphaned thinking, signature blocks) and ensure API compliance
8. **System Reminders**: Wrap meta messages in `<system-reminder>` tags for proper handling
9. **Lookup Tables**: Build O(1) lookup structures for message relationships (siblings, progress, hooks)

## Exports
- `withMemoryCorrectionHint` - Appends memory correction hint to rejection messages when auto-memory is enabled
- `deriveShortMessageId` - Derive 6-char base36 message ID from UUID for snip tool referencing
- `INTERRUPT_MESSAGE`, `INTERRUPT_MESSAGE_FOR_TOOL_USE`, `CANCEL_MESSAGE`, `REJECT_MESSAGE` - Synthetic interruption/rejection message constants
- `AUTO_REJECT_MESSAGE`, `DONT_ASK_REJECT_MESSAGE` - Generate rejection messages for tool denials
- `isClassifierDenial`, `buildYoloRejectionMessage`, `buildClassifierUnavailableMessage` - Auto mode classifier message handling
- `SYNTHETIC_MESSAGES` - Set of synthetic message texts
- `isSyntheticMessage` - Check if a message is synthetic
- `getLastAssistantMessage` - Find the last assistant message in an array (using findLast for performance)
- `hasToolCallsInLastAssistantTurn` - Check if the last assistant message has tool calls
- `createAssistantMessage`, `createAssistantAPIErrorMessage` - Create assistant message objects
- `createUserMessage` - Create user message objects with full options
- `createUserInterruptionMessage`, `createSyntheticUserCaveatMessage` - Create synthetic user messages
- `createProgressMessage` - Create progress messages for tool use tracking
- `createToolResultStopMessage` - Create a tool result block indicating cancellation
- `extractTag` - Extract content from HTML tags (handles nested tags)
- `isNotEmptyMessage` - Check if a message has meaningful content
- `deriveUUID` - Deterministic UUID derivation for normalized messages
- `normalizeMessages` - Split multi-block messages into single-block normalized messages
- `isToolUseRequestMessage`, `isToolUseResultMessage` - Type guards for tool messages
- `reorderMessagesInUI` - Reorder messages so tool results follow their tool uses with hooks in correct positions
- `hasUnresolvedHooks`, `hasUnresolvedHooksFromLookup` - Check for unresolved hook counts
- `getToolResultIDs` - Get map of tool_use_id to is_error for all tool results
- `getSiblingToolUseIDs`, `getSiblingToolUseIDsFromLookup` - Get sibling tool use IDs from a message
- `buildMessageLookups` - Build O(1) lookup tables for message relationships
- `EMPTY_LOOKUPS` - Empty lookup singleton for static rendering
- `EMPTY_STRING_SET` - Frozen empty Set for bail-out paths
- `buildSubagentLookups` - Build lookups from subagent/skill progress messages
- `getProgressMessagesFromLookup` - O(1) progress messages lookup
- `getToolUseIDs` - Extract all tool use IDs from normalized messages
- `reorderAttachmentsForAPI` - Bubble attachments up to before tool results or assistant messages
- `normalizeMessagesForAPI` - Full message normalization pipeline for API calls
- `mergeUserMessages`, `mergeAssistantMessages`, `mergeUserMessagesAndToolResults` - Merge adjacent messages
- `mergeUserContentBlocks` - Merge content blocks with tool_result hoisting
- `normalizeContentFromAPI` - Normalize API response content blocks
- `isEmptyMessageText`, `stripPromptXMLTags` - Text content utilities
- `getToolUseID` - Extract tool use ID from a message
- `filterUnresolvedToolUses` - Remove assistant messages with all-unresolved tool uses
- `getAssistantMessageText`, `getUserMessageText` - Extract text content from messages
- `textForResubmit` - Extract bash-input or command tags for resubmit functionality
- `extractTextContent`, `getContentText` - Extract and join text from content blocks
- `handleMessageFromStream` - Process stream events, updating message state and triggering callbacks
- `wrapInSystemReminder`, `wrapMessagesInSystemReminder` - Wrap content in system reminder tags
- `normalizeAttachmentForAPI` - Transform attachments into user messages for API
- `createToolResultMessage`, `createToolUseMessage` - Create tool-related messages
- `createSystemMessage` - Create system informational messages
- `createPermissionRetryMessage`, `createBridgeStatusMessage`, `createScheduledTaskFireMessage` - Create specific system message types
- `createStopHookSummaryMessage`, `createTurnDurationMessage`, `createAwaySummaryMessage` - Create summary system messages
- `createMemorySavedMessage`, `createAgentsKilledMessage` - Create event system messages
- `createApiMetricsMessage` - Create API metrics system messages
- `createCommandInputMessage` - Create local command system messages
- `createCompactBoundaryMessage`, `createMicrocompactBoundaryMessage` - Create compaction boundary messages
- `createSystemAPIErrorMessage` - Create API error system messages
- `isCompactBoundaryMessage`, `findLastCompactBoundaryIndex` - Compact boundary detection
- `getMessagesAfterCompactBoundary` - Get messages from after the last compact boundary
- `shouldShowUserMessage` - Determine if a user message should be displayed
- `isThinkingMessage` - Check if an assistant message contains only thinking blocks
- `countToolCalls`, `hasSuccessfulToolCall` - Tool call history utilities
- `filterTrailingThinkingFromLastAssistant` - Remove trailing thinking blocks from last assistant message
- `filterWhitespaceOnlyAssistantMessages` - Remove assistant messages with only whitespace text
- `filterOrphanedThinkingOnlyMessages` - Remove orphaned thinking-only messages
- `ensureNonEmptyAssistantContent` - Ensure non-final assistant messages have content
- `stripSignatureBlocks` - Remove signature-bearing blocks (thinking, connector_text)
- `createToolUseSummaryMessage` - Create tool use summary messages for SDK
- `ensureToolResultPairing` - Validate and repair tool_use/tool_result pairing
- `stripAdvisorBlocks` - Remove advisor blocks from messages
- `wrapCommandText` - Wrap command text with appropriate origin context
