# Compact Command (`compact`)

## Purpose
Compacts the conversation history into a summary, reducing token usage while preserving essential context. Supports optional custom instructions for the summarization. Implements multiple compaction strategies: session memory compaction, reactive compaction, and traditional summarization.

## Imports
### External
- `chalk` (for colored terminal output)

### Internal
- `feature` from BUILDFLAGS (feature flagging)
- `markPostCompaction` from src/bootstrap/state`
- `getSystemPrompt` from `.././constants/prompts`
- `getSystemContext`, `getUserContext` from `.././context`
- `getShortcutDisplay` from `.././keybindings/shortcutFormat`
- `notifyCompaction` from `.././services/api/promptCacheBreakDetection`
- Types and functions: `CompactionResult`, `compactConversation`, `ERROR_MESSAGE_INCOMPLETE_RESPONSE`, `ERROR_MESSAGE_NOT_ENOUGH_MESSAGES`, `ERROR_MESSAGE_USER_ABORT`, `mergeHookInstructions` from `.././services/compact/compact`
- `suppressCompactWarning` from `.././services/compact/compactWarningState`
- `microcompactMessages` from `.././services/compact/microCompact`
- `runPostCompactCleanup` from `.././services/compact/postCompactCleanup`
- `trySessionMemoryCompaction` from `.././services/compact/sessionMemoryCompact`
- `setLastSummarizedMessageId` from `.././services/SessionMemory/sessionMemoryUtils`
- `ToolUseContext` type from `.././Tool`
- `LocalCommandCall` type from `.././types/command`
- `Message` type from `.././types/message`
- `hasExactErrorMessage` from `.././utils/errors`
- `executePreCompactHooks` from `.././utils/hooks`
- `logError` from `.././utils/log`
- `getMessagesAfterCompactBoundary` from `.././utils/messages`
- `getUpgradeMessage` from `.././utils/model/contextWindowUpgradeCheck`
- `buildEffectiveSystemPrompt`, `SystemPrompt` type from `.././utils/systemPrompt`

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