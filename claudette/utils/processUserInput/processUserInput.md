# processUserInput

## Purpose
Main entry point for processing all user input (text, slash commands, bash commands, images, attachments). Routes to specialized handlers, executes UserPromptSubmit hooks, and handles bridge/remote command safety.

## Imports
- **Stdlib**: BUILDFLAGS (feature), `crypto` (randomUUID)
- **External**: `@anthropic-ai/sdk/resources/messages.mjs` (Base64ImageSource, ContentBlockParam, ImageBlockParam)
- **Internal**: `src/constants/querySource.js` (QuerySource), `src/services/analytics/index.js` (logEvent), `src/utils/messages.js` (getContentText), `../../commands.js` (findCommand, getCommandName, isBridgeSafeCommand, LocalJSXCommandContext), `../../hooks/useCanUseTool.js` (CanUseToolFn), `../../hooks/useIdeSelection.js` (IDESelection), `../../Tool.js` (SetToolJSXFn, ToolUseContext), `../../types/message.js` (AssistantMessage, AttachmentMessage, Message, ProgressMessage, SystemMessage, UserMessage), `../../types/permissions.js` (PermissionMode), `../../types/textInputTypes.js` (isValidImagePaste, PromptInputMode), `../attachments.js` (AgentMentionAttachment, createAttachmentMessage, getAttachmentMessages), `../config.js` (PastedContent), `../effort.js` (EffortValue), `../generators.js` (toArray), `../hooks.js` (executeUserPromptSubmitHooks, getUserPromptSubmitHookBlockingMessage), `../imageResizer.js` (createImageMetadataText, maybeResizeAndDownsampleImageBlock), `../imageStore.js` (storeImages), `../messages.js` (createCommandInputMessage, createSystemMessage, createUserMessage), `../queryProfiler.js` (queryCheckpoint), `../slashCommandParsing.js` (parseSlashCommand), `../ultraplan/keyword.js` (hasUltraplanKeyword, replaceUltraplanKeyword), `./processTextPrompt.js` (processTextPrompt)

## Logic
1. **processUserInput** — top-level async function; shows input in UI (unless isMeta), calls processUserInputBase, then executes UserPromptSubmit hooks (handling blockingError, preventContinuation, additionalContexts, and success messages with truncation at 10000 chars)
2. **processUserInputBase** — core routing logic: normalizes input (resizes image blocks, handles bridge iOS mediaType/media_type mismatch), processes pasted images (stores to disk, resizes), handles bridge-safe slash command override, detects ultraplan keyword routing, extracts attachments, routes to processBashCommand/processSlashCommand/processTextPrompt based on mode and input, logs @agent- mentions, appends image metadata as isMeta message
3. **applyTruncation** — truncates hook output to MAX_HOOK_OUTPUT_LENGTH (10000 chars) with ellipsis notice
4. **addImageMetadataMessage** — appends image metadata texts as an isMeta UserMessage to result
5. Bridge safety: when bridgeOrigin is set with skipSlashCommands, resolves command and only allows isBridgeSafeCommand(); unsafe commands return an error message
6. Ultraplan keyword detection runs on preExpansionInput (not expanded input) to prevent pasted content from triggering CCR sessions
7. Image processing: both inline image blocks and pasted images are resized/downsampled via maybeResizeAndDownsampleImageBlock; metadata texts are collected and appended as a hidden isMeta message

## Exports
- `ProcessUserInputContext` — type alias: `ToolUseContext & LocalJSXCommandContext`
- `ProcessUserInputBaseResult` — type alias: `{ messages, shouldQuery, allowedTools?, model?, effort?, resultText?, nextInput?, submitNextInput? }`
- `processUserInput({ input, preExpansionInput?, mode, setToolJSX, context, pastedContents?, ideSelection?, messages?, setUserInputOnProcessing?, uuid?, isAlreadyProcessing?, querySource?, canUseTool?, skipSlashCommands?, bridgeOrigin?, isMeta?, skipAttachments? })` — async; returns ProcessUserInputBaseResult

## Source
`processUserInput`