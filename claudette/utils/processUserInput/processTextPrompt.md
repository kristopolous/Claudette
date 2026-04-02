# processTextPrompt

## Purpose
Processes a text user prompt into message objects, emitting telemetry (OTEL) events and logging keyword-based analytics. Handles both string (CLI) and array (SDK/VS Code) input shapes.

## Imports
- **Stdlib**: `crypto` (randomUUID)
- **External**: `@anthropic-ai/sdk/resources` (ContentBlockParam)
- **Internal**: `src/bootstrap/state.js` (setPromptId), `src/types/message.js` (AttachmentMessage, SystemMessage, UserMessage), `../../services/analytics/index.js` (logEvent), `../../types/permissions.js` (PermissionMode), `../messages.js` (createUserMessage), `../telemetry/events.js` (logOTelEvent, redactIfDisabled), `../telemetry/sessionTracing.js` (startInteractionSpan), `../userPromptKeywords.js` (matchesKeepGoingKeyword, matchesNegativeKeyword)

## Logic
1. Generates a unique promptId via randomUUID and sets it in bootstrap state
2. Extracts user prompt text from input (string or first text ContentBlock)
3. Starts an interaction span with the prompt text
4. Emits a `user_prompt` OTEL event with prompt_length, prompt (redacted if privacy disabled), and prompt.id — uses the LAST text block for array input since createUserContent pushes user message after context blocks
5. Detects negative and keep-going keywords via userPromptKeywords, logs `tengu_input_prompt` analytics event
6. If imageContentBlocks exist, creates a UserMessage with text content followed by image content blocks
7. Otherwise creates a UserMessage with the raw input
8. Always returns `{ messages: [userMessage, ...attachmentMessages], shouldQuery: true }`

## Exports
- `processTextPrompt(input, imageContentBlocks, imagePasteIds, attachmentMessages, uuid?, permissionMode?, isMeta?)` — returns `{ messages, shouldQuery }`; creates UserMessage(s) from text/image input, emits telemetry

## Source
`processTextPrompt`