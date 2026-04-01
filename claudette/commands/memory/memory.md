# Memory Command (`memory`)

## Purpose
Opens a dialog to edit Claude memory files (claudemd). Allows selection of memory files from the Claude config directory and opens the chosen file in the user's editor.

## Imports
### Stdlib
- `fs/promises` (`mkdir`, `writeFile`)
- `react`

### Internal
- `CommandResultDisplay` type from `../../commands.js`
- `Dialog` from `../../components/design-system/Dialog.js`
- `MemoryFileSelector` from `../../components/memory/MemoryFileSelector.js`
- `getRelativeMemoryPath` from `../../components/memory/MemoryUpdateNotification.js`
- `Box`, `Link`, `Text` from `../../ink.js`
- `LocalJSXCommandCall` type from `../../types/command.js`
- `clearMemoryFileCaches`, `getMemoryFiles` from `../../utils/claudemd.js`
- `getClaudeConfigHomeDir` from `../../utils/envUtils.js`
- `getErrnoCode` from `../../utils/errors.js`
- `logError` from `../../utils/log.js`
- `editFileInEditor` from `../../utils/promptEditor.js`

## Logic
The `call` async function:
1. Clears memory file caches via `clearMemoryFileCaches()`.
2. Primes the memory file list by awaiting `getMemoryFiles()`.
3. Returns the `MemoryCommand` React component.

`MemoryCommand` component:
- Renders a `Dialog` titled "Memory".
- Contains a `MemoryFileSelector` (wrapped in `React.Suspense`) for choosing a memory file.
- Provides a link to documentation.
- `handleSelectMemoryFile`:
  - Ensures the config directory exists.
  - Creates the memory file if it doesn't exist (using `wx` flag).
  - Opens the file in the editor via `editFileInEditor()`.
  - Determines which editor environment variable (`VISUAL` or `EDITOR`) is in use and includes that in the confirmation message.
  - Calls `onDone` with a system-display message.
- `handleCancel`: Cancels with a message.

## Exports
- `call` (async function) - Command entry point that renders the memory editing dialog