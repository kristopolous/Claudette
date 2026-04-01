# Release Notes Command (`release-notes`)

## Purpose
Fetches and displays release notes (changelog) for Claude Code. Attempts a quick network fetch (500ms timeout), falls back to cached notes, and shows a URL if none are available.

## Imports
### Internal
- `LocalCommandResult` type from `../../types/command.js`
- `CHANGELOG_URL`, `fetchAndStoreChangelog`, `getAllReleaseNotes`, `getStoredChangelog` from `../../utils/releaseNotes.js`

## Logic
The `call` async function performs:
1. Attempts to fetch fresh changelog with `Promise.race([fetchAndStoreChangelog(), timeoutPromise])` (500ms). On failure or timeout, silently continues.
2. If fresh notes fetched (`freshNotes.length > 0`), formats via `formatReleaseNotes()` and returns `{ type: 'text', value: formatted }`.
3. Otherwise, loads cached notes from storage via `getStoredChangelog()` and `getAllReleaseNotes()`. If any, formats and returns.
4. If no notes at all, returns a text containing `CHANGELOG_URL`.

Helper:
- `formatReleaseNotes(notes)`: Converts `Array<[version, string[]]>` to a readable format with version headers and indented bullet points (`·`).

## Exports
- `call` (async function) - Command handler that returns release notes as text