# handlePromptSubmit

## Purpose
Central entry point for processing all user input — handles immediate commands, queuing during active queries, and direct execution when idle. Routes input through `processUserInput` then `onQuery`.

## Imports
- **Stdlib**: `crypto` (UUID)
- **External**: REACT
- **Internal**: `../commands`, `../components/MessageSelector`, `../components/Spinner/types`, `../constants/querySource`, `../history`, `../hooks/useCanUseTool`, `../hooks/useIdeSelection`, `../state/AppState`, `../Tool`, `../types/command`, `../types/message`, `../types/textInputTypes`, `./abortController`, `./config`, `./debug`, `./effort`, `./fileHistory`, `./gracefulShutdown`, `./messageQueueManager`, `./model/model`, `./processUserInput/processUserInput`, `./QueryGuard`, `./queryProfiler`, `./workloadContext`, `../services/analytics`

## Logic
1. **Queue processor path** — if `queuedCommands` is provided, skip validation and go straight to `executeUserInput`.
2. **Exit commands** — bare words `exit`, `quit`, `:q`, `:q!`, `:wq`, `:wq!` are rewritten to `/exit` (unless `skipSlashCommands` is true for remote bridge messages).
3. **Reference expansion** — parses pasted text/image references from input, filters orphaned images, expands text refs, logs paste analytics.
4. **Immediate local-jsx commands** — if input starts with `/` and a matching `immediate` + `local-jsx` command exists, executes it inline (clears input, renders JSX, handles `onDone`).
5. **Queuing during active query** — if `queryGuard.isActive` or `isExternalLoading`, either aborts interruptible tools or enqueues the input (only `prompt`/`bash` modes allowed).
6. **Direct execution** — wraps input as a `QueuedCommand` and calls `executeUserInput`.

`executeUserInput` (private) runs the core loop:
- Creates a fresh `AbortController`, reserves `queryGuard`.
- Iterates all queued commands through `processUserInput` (first gets attachments/IDE selection, rest skip them).
- Wraps the turn in `runWithWorkload` (AsyncLocalStorage) for correct workload propagation across await boundaries.
- Creates file history snapshots for selectable user messages.
- Calls `onQuery` with resolved model (skill overrides applied) and effort.
- Handles `nextInput` chaining from commands.
- Finally block releases guard reservation and clears processing state.

## Exports
- `PromptInputHelpers` — helpers for cursor/buffer/history management (`setCursorOffset`, `clearBuffer`, `resetHistory`).
- `HandlePromptSubmitParams` — full params object for `handlePromptSubmit` including UI callbacks, pasted content, helpers, and query configuration.
- `handlePromptSubmit` — async function that processes user input through the appropriate path (immediate command, queue, or direct execution).
