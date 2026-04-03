# compact

## Purpose
Handles conversation compaction (summarization) to manage context window size. Creates condensed versions of long conversations while preserving important context, file state, and tool information for continued interaction.

## Imports
- **Stdlib**: `crypto` (UUID type), `lodash-es/uniqBy`
- **External**: `@anthropic-ai/sdk` (APIUserAbortError), feature flags via BUILDFLAGS
- **Internal**: Session transcript, bootstrap state, hooks, tools (FileReadTool, ToolSearchTool), message types, API client, token utilities, attachment generators, analytics, forked agent utilities

## Logic
1. **Full Compaction (`compactConversation`)**: Summarizes entire conversation history into a compact summary message, preserving recent files, skills, plans, and tool context via attachments. Handles PTL (prompt-too-long) retries by truncating oldest API-round groups.

2. **Partial Compaction (`partialCompactConversation`)**: Summarizes only a portion of conversation around a pivot index. Direction 'from' keeps earlier messages with preserved cache; direction 'up_to' keeps later messages but invalidates cache prefix.

3. **Message Preprocessing**: Strips images/documents from messages before summarization (not needed for summary generation, prevents PTL on compact API call itself). Strips re-injected attachment types (skill_discovery, skill_listing) to save tokens.

4. **Streaming Summary Generation**: Uses forked agent with prompt cache sharing when enabled (98% cache hit rate). Falls back to regular streaming path. Sends keep-alive signals during long compaction to prevent WebSocket timeouts.

5. **Post-Compaction Attachments**: Re-announces deferred tools, agent listings, and MCP instructions so model retains tool context. Restores recently read files within token budget. Preserves invoked skills content with per-skill truncation. Attaches plan mode and async agent status.

6. **Hooks Integration**: Executes pre-compact hooks (can modify custom instructions), session-start hooks, and post-compact hooks to maintain extensibility.

7. **Telemetry**: Logs detailed analytics including token counts, cache metrics, PTL retry stats, and context analysis breakdowns.

## Exports
- `POST_COMPACT_MAX_FILES_TO_RESTORE` - Max files to re-inject post-compact (5)
- `POST_COMPACT_TOKEN_BUDGET` - Token budget for file restoration (50,000)
- `POST_COMPACT_MAX_TOKENS_PER_FILE` - Per-file token cap (5,000)
- `POST_COMPACT_MAX_TOKENS_PER_SKILL` - Per-skill token cap (5,000)
- `POST_COMPACT_SKILLS_TOKEN_BUDGET` - Total skills token budget (25,000)
- `ERROR_MESSAGE_NOT_ENOUGH_MESSAGES` - Error when no messages to compact
- `ERROR_MESSAGE_PROMPT_TOO_LONG` - Error when PTL after retries
- `ERROR_MESSAGE_USER_ABORT` - Error on user abort
- `ERROR_MESSAGE_INCOMPLETE_RESPONSE` - Error on streaming failure
- `CompactionResult` - Interface with boundaryMarker, summaryMessages, attachments, hookResults, messagesToKeep, userDisplayMessage, token counts, and usage metrics
- `RecompactionInfo` - Type for tracking recompaction chain state
- `stripImagesFromMessages(messages)` - Strips image/document blocks from user messages
- `stripReinjectedAttachments(messages)` - Filters out skill_discovery/skill_listing attachments
- `truncateHeadForPTLRetry(messages, ptlResponse)` - Drops oldest API-round groups for PTL recovery
- `buildPostCompactMessages(result)` - Constructs ordered post-compact message array
- `annotateBoundaryWithPreservedSegment(boundary, anchorUuid, messagesToKeep)` - Adds relink metadata for preserved messages
- `mergeHookInstructions(userInstructions, hookInstructions)` - Combines user and hook instructions
- `compactConversation(messages, context, cacheSafeParams, suppressFollowUpQuestions, customInstructions?, isAutoCompact?, recompactionInfo?)` - Main full compaction entry point
- `partialCompactConversation(allMessages, pivotIndex, context, cacheSafeParams, userFeedback?, direction?)` - Partial compaction around pivot
- `createCompactCanUseTool()` - Returns deny-all tool policy for compaction agent
- `createPostCompactFileAttachments(readFileState, toolUseContext, maxFiles, preservedMessages?)` - Generates file attachments for recently read files
- `createPlanAttachmentIfNeeded(agentId?)` - Creates plan file attachment if plan exists
- `createSkillAttachmentIfNeeded(agentId?)` - Creates attachment for invoked skills with truncation
- `createPlanModeAttachmentIfNeeded(context)` - Creates plan_mode attachment if in plan mode
- `createAsyncAgentAttachmentsIfNeeded(context)` - Creates task_status attachments for async agents

### Helpful Prompt Templates

- **System prompt for compact API call** - "You are a helpful AI assistant tasked with summarizing conversations."
