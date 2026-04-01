## Purpose
Command handler for /rename - renames the current conversation session.

## Imports
- **External**: None
- **Internal**: Session storage, bridge update, name generation, teammate check

## Logic
Prevents teammates from renaming (controlled by leader). If no args provided, auto-generates name via generateSessionName(). Saves custom title and agent name to session storage. Updates local app state. For web sessions, also updates bridge session title via updateBridgeSessionTitle() (best-effort, non-blocking). Returns confirmation message.

## Exports
- `call` - LocalJSXCommandCall that executes rename
