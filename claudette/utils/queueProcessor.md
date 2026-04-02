# queueProcessor

## Purpose
Processes queued commands between REPL turns. Slash commands and bash-mode commands are processed individually for error isolation and progress UI; other commands are batched by mode.

## Imports
- **Internal**: `../types/textInputTypes.js` (QueuedCommand), `./messageQueueManager.js` (dequeue, dequeueAllMatching, hasCommandsInQueue, peek)

## Logic
1. **processQueueIfReady** — checks queue on REPL main thread between turns; skips subagent-targeted commands (agentId !== undefined) to prevent queue stalling; if next command is a slash command (value starts with `/`) or bash-mode, dequeues and executes individually; otherwise drains all non-slash commands with the same mode as the highest-priority item and passes as a batch to executeInput
2. **hasQueuedCommands** — delegates to hasCommandsInQueue from messageQueueManager
3. **isSlashCommand** — helper that checks if a QueuedCommand value starts with `/`; handles both string values and ContentBlockParam arrays (checks first text block)
4. Caller is responsible for ensuring no query is currently running and for re-calling after each command completes until queue is empty
5. Different modes (e.g. prompt vs task-notification) are never mixed because they are treated differently downstream

## Exports
- `processQueueIfReady({ executeInput })` — returns `{ processed: boolean }`; processes queued commands individually (slash/bash) or batched (same-mode)
- `hasQueuedCommands()` — returns boolean; checks if queue has pending commands

## Source
`queueProcessor`