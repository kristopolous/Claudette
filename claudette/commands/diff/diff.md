## Purpose
View uncommitted changes and per-turn diffs in an interactive dialog.

## Imports
- **Internal**: DiffDialog component from UI, LocalJSXCommandCall type

## Logic
1. Local-jsx command that shows a DiffDialog
2. Dialog displays:
   - Uncommitted git changes (not yet in transcript)
   - Per-turn diffs showing what changed after each assistant message
3. Lazy-loads DiffDialog component on invocation (import from components/diff/DiffDialog.js)
4. Passes context.messages (conversation history) and onDone callback
5. Allows users to review changes made during the session
6. Useful for understanding what code was modified when

## Exports
- `call` - async LocalJSXCommandCall returning DiffDialog React component or Promise to it
