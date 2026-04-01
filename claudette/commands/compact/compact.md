# Compact Command (`compact`)

## Purpose
Compacts the conversation history into a summary, reducing token usage while preserving essential context. Supports optional custom instructions for the summarization. Implements multiple compaction strategies: session memory compaction, reactive compaction, and traditional summarization.

## Imports
### External
- `chalk` (for colored terminal output)

### Internal
- `feature` from `bun:bundle` (feature flagging)
- `markPostCompaction` from `src/bootstrap/state.js`
- `getSystemPrompt` from `../../constants/prompts.js`
- `getSystemContext`, `getUserContext` from `../../context.js`
- `getShortcutDisplay` from `../../keybindings/shortcutFormat.js`
- `notifyCompaction` from `../../services/api/promptCacheBreakDetection.js`
- Types and functions: `CompactionResult`, `compactConversation`, `ERROR_MESSAGE_INCOMPLETE_RESPONSE`, `ERROR_MESSAGE_NOT_ENOUGH_MESSAGES`, `ERROR_MESSAGE_USER_ABORT`, `mergeHookInstructions` from `../../services/compact/compact.js`
- `suppressCompactWarning` from `../../services/compact/compactWarningState.js`
- `microcompactMessages` from `../../services/compact/microCompact.js`
- `runPostCompactCleanup` from `../../services/compact/postCompactCleanup.js`
- `trySessionMemoryCompaction` from `../../services/compact/sessionMemoryCompact.js`
- `setLastSummarizedMessageId` from `../../services/SessionMemory/sessionMemoryUtils.js`
- `ToolUseContext` type from `../../Tool.js`
- `LocalCommandCall` type from `../../types/command.js`
- `Message` type from `../../types/message.js`
- `hasExactErrorMessage` from `../../utils/errors.js`
- `executePreCompactHooks` from `../../utils/hooks.js`
- `logError` from `../../utils/log.js`
- `getMessagesAfterCompactBoundary` from `../../utils/messages.js`
- `getUpgradeMessage` from `../../utils/model/contextWindowUpgradeCheck.js`
- `buildEffectiveSystemPrompt`, `SystemPrompt` type from `../../utils/systemPrompt.js`

## Logic
The `call` function (command handler):
1. Filters messages to those after the compact boundary (for REPL scrollback).
2. Validates that messages exist.
3. Extracts optional custom instructions from `args`.
4. Compaction strategy (in order):
   - **Session memory compaction**: If no custom instructions, attempts session memory compaction. If successful, performs cleanup and returns.
   - **Reactive compaction**: If reactive-only mode is active, routes through `compactViaReactive()`.
   - **Traditional compaction**: Runs microcompaction to reduce tokens, then calls `compactConversation()` with cache-sharing parameters.
5. Error handling: Distinguishes aborted, insufficient messages, incomplete response, and other errors.
6. Builds display text with `buildDisplayText()`.
7. Returns an object with `type: 'compact'` and the `compactionResult`.

Helper functions:
- `compactViaReactive()`: Runs pre-compact hooks concurrently with cache param building, then invokes reactive compaction. Combines user display messages from hooks and outcome.
- `getCacheSharingParams()`: Builds system prompt, user context, and system context for the compaction operation.
- `buildDisplayText()`: Constructs the status message shown after compaction, including upgrade tip and expand shortcut.

## Exports
- `call` (async function) - Main command handler
- `compactViaReactive` (async function) - Reactive-mode compaction
- `getCacheSharingParams` (async function) - Builds parameters for compaction
- `buildDisplayText` (function) - Creates the post-compaction display string