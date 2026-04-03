# Branch Command (`branch`)

## Purpose
Creates a fork/branch of the current conversation at the current point. Copies the transcript, assigns a new session ID, preserves metadata, and optionally sets a custom title. Handles content replacement records to maintain state reconstruction accuracy. The user is then resumed into the branched conversation.

## Imports
### Stdlib
- `crypto` (for `randomUUID`, `UUID` type)
- `fs/promises` (for `mkdir`, `readFile`, `writeFile`)

### External
- BUILDFLAGS (`feature` function for feature flags)

### Internal
- `getOriginalCwd`, `getSessionId` from `.././bootstrap/state`
- `LocalJSXCommandContext` type from `.././commands`
- `logEvent` from `.././services/analytics/index`
- `LocalJSXCommandOnDone` type from `.././types/command`
- Types: `ContentReplacementEntry`, `Entry`, `LogOption`, `SerializedMessage`, `TranscriptMessage` from `.././types/logs`
- `parseJSONL` from `.././utils/json`
- `getProjectDir`, `getTranscriptPath`, `getTranscriptPathForSession`, `isTranscriptMessage`, `saveCustomTitle`, `searchSessionsByCustomTitle` from `.././utils/sessionStorage`
- `jsonStringify` from `.././utils/slowOperations`
- `escapeRegExp` from `.././utils/stringUtils`

## Logic
The `call` function orchestrates the branching process:
1. Accepts an optional custom title from arguments.
2. Calls `createFork()` to:
   - Generate a new session ID
   - Read the current transcript file
   - Parse all entries (messages + metadata)
   - Filter to main conversation messages (exclude sidechains)
   - Copy entries, rewriting `sessionId` and adding `forkedFrom` traceability
   - Preserve content-replacement records for the new session
   - Write a new transcript file for the fork
3. Generates a unique fork title (with " (Branch)" suffix) via `getUniqueForkName()` to avoid collisions.
4. Saves the custom title metadata.
5. Builds a `LogOption` object for the fork (for `claude -r` resume).
6. Logs analytics event.
7. Uses `context.resume()` to switch to the fork session, or provides a fallback message.

Helper functions:
- `deriveFirstPrompt()`: Extracts a single-line title from the first user message.
- `getUniqueForkName()`: Iteratively finds a non-colliding branch name using `searchSessionsByCustomTitle`.

## Exports
- `call` (async function) - Main command entry point
- `deriveFirstPrompt` (function) - Derives a title from first user message
- `createFork` (async function) - Core fork creation logic
- `getUniqueForkName` (async function) - Generates a unique fork name