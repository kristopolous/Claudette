# promptEditor

## Purpose
Opens files and prompts in the user's external editor, handling GUI vs terminal editors, Ink rendering suspension, and pasted text reference expansion/collapse.

## Imports
- **Internal**: `../history` (expandPastedTextRefs, formatPastedTextRef, getPastedTextRefNumLines), `../ink/instances`, `./config` (PastedContent), `./editor` (classifyGuiEditor, getExternalEditor), `./execSyncWrapper`, `./fsOperations`, `./ide`, `./slowOperations`, `./tempfile`

## Logic
1. `EDITOR_OVERRIDES` maps editor commands to add wait flags: `code -w` for VS Code, `subl --wait` for Sublime Text
2. GUI editors (detected via classifyGuiEditor) open in a separate window — Ink is paused and stdin suspended
3. Terminal editors (vi, nano) take over the terminal — Ink enters alternate screen mode to avoid corrupting the main buffer
4. `editPromptInEditor` expands pasted text references to full content before editing, writes to a temp file, then re-collapses unchanged pasted content back to references after editing
5. A single trailing newline is trimmed (common editor behavior)
6. Temp files are cleaned up in a finally block

## Exports
- `EditorResult` - type: `{ content: string | null, error?: string }`
- `editFileInEditor(filePath)` - opens a file in the user's configured external editor; handles GUI vs terminal editor differences with Ink rendering suspension; returns EditorResult
- `editPromptInEditor(currentPrompt, pastedContents?)` - writes prompt to temp file (expanding pasted text refs), opens in editor, re-collapses unchanged pasted content, cleans up temp file; returns EditorResult