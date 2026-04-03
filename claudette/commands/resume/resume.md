# Resume Command (`resume`)

## Purpose
Resumes a previous conversation either by session ID, custom title, or search term. Provides an interactive picker to browse and select conversations. Handles cross-project resume by copying a command to clipboard, and supports agentic session search.

## Imports
### External
- `chalk` (for colored terminal text)
- `figures` (for unicode icons)
- REACT (including `useState`, `useEffect`, `useCallback`)

### Stdlib
- `crypto` (`UUID` type)

### Internal
- `getOriginalCwd`, `getSessionId` from `.././bootstrap/state`
- `CommandResultDisplay`, `ResumeEntrypoint` types from `.././commands`
- `LogSelector` component from `.././components/LogSelector`
- `MessageResponse` from `.././components/MessageResponse`
- `Spinner` from `.././components/Spinner`
- `useIsInsideModal` from `.././context/modalContext`
- `useTerminalSize` from `.././hooks/useTerminalSize`
- `setClipboard` from `.././ink/termio/osc`
- `Box`, `Text` from `.././ink`
- `LocalJSXCommandCall` type from `.././types/command`
- `LogOption` type from `.././types/logs`
- `agenticSessionSearch` from `.././utils/agenticSessionSearch`
- `checkCrossProjectResume` from `.././utils/crossProjectResume`
- `getWorktreePaths` from `.././utils/getWorktreePaths`
- `logError` from `.././utils/log`
- `getLastSessionLog`, `getSessionIdFromLog`, `isCustomTitleEnabled`, `isLiteLog`, `loadAllProjectsMessageLogs`, `loadFullLog`, `loadSameRepoMessageLogs`, `searchSessionsByCustomTitle` from `.././utils/sessionStorage`
- `validateUuid` from `.././utils/uuid`

## Logic
The `call` async function receives `onDone`, `context`, and optional `args`:
- If `args` is empty/whitespace: renders the interactive `<ResumeCommand>` component.
- If `args` provided: attempts to find a matching session directly.

**Direct argument lookup (in order):**
1. If `args` is a valid UUID: searches logs for exact sessionId match; if found, resumes (loading full log if lite). If not found, tries `getLastSessionLog()` direct file lookup.
2. If custom title feature enabled: searches for exact title match with `searchSessionsByCustomTitle(arg, { exact: true })`. If exactly one match, resumes. If multiple, shows `ResumeError` with "multiple matches" message.
3. If none of the above: shows `ResumeError` with "session not found" message.

`ResumeCommand` component:
- Manages state: `logs` (list of `LogOption`), `worktreePaths`, `loading`, `resuming`, `showAllProjects`.
- On mount: gets worktree paths, loads logs via `loadLogs()` (initially same-repo logs).
- `loadLogs(allProjects, paths)`: loads logs (all projects or same repo worktrees), filters via `filterResumableSessions()`, sets state, or calls `onDone` if none.
- `handleSelect(log)`: validates sessionId; loads full log if lite; checks cross-project via `checkCrossProjectResume()`:
  - If cross-project but same repo worktree: sets resuming and calls `onResume`.
  - If different project: copies the resume command to clipboard, shows message, calls `onDone` with display='user'.
  - If same directory: sets resuming and calls `onResume`.
- `handleToggleAllProjects`: toggles `showAllProjects` and reloads logs.
- Renders:
  - Spinner + "Loading conversations…" while loading.
  - Spinner + "Resuming conversation…" while resuming.
  - Otherwise, `<LogSelector>` with logs, maxHeight (based on terminal size and modal state), cancel/select handlers, toggle for all projects, and `onAgenticSearch` for agentic session search.

`ResumeError` component: Displays an error message with the command hint (e.g., `/resume {args}`) in a `MessageResponse`, then calls `onDone` after a timeout.

Helper:
- `filterResumableSessions(logs, currentSessionId)`: Returns logs that are not sidechains and whose sessionId differs from current.

The `call` function also defines an internal `onResume` that calls `context.resume?.(sessionId, log, entrypoint)`, then calls `onDone` with `{ display: 'skip' }` on success or error message on failure.

## Exports
- `call` (async function) - Main command handler
- `filterResumableSessions` (function) - Filters log list to resumable sessions
- `ResumeCommand` (UI component) - Interactive picker
- `ResumeError` (UI component) - Error display with hint