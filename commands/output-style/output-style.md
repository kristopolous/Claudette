# Output-Style Command (deprecated)

## Purpose
Deprecated command. Informs users to use `/config` to change output style or set it in settings file. Changes take effect on the next session.

## Imports
### Internal
- `LocalJSXCommandOnDone` type from `../../types/command.js`

## Logic
The `call` async function immediately calls `onDone` with a deprecation message and `display: 'system'`. Returns `undefined`.

## Exports
- `call` (async function) - Command handler (deprecated)