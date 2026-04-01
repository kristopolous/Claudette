## Purpose
Validates user keybinding configuration and detects issues such as parse errors, duplicates, reserved shortcuts, invalid contexts, and invalid actions.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `utils/stringUtils.js` (plural), `parser.js` (chordToString, parseChord, parseKeystroke), `reservedShortcuts.js` (getReservedShortcuts, normalizeKeyForComparison), `types.js` (KeybindingBlock, KeybindingContextName, ParsedBinding)

## Logic
Validates the structure of keybinding blocks, individual keystroke syntax, action formats, and command binding constraints. Detects duplicate keys within the same context by parsing raw JSON and by comparing parsed bindings. Checks for reserved shortcuts that are intercepted by the OS or terminal. Combines all validations and deduplicates warnings by type, key, and context. Provides formatting functions for displaying warnings to the user.

## Exports
- `KeybindingWarningType` - union type of validation issue types ('parse_error' | 'duplicate' | 'reserved' | 'invalid_context' | 'invalid_action')
- `KeybindingWarning` - type for a warning or error about a keybinding configuration issue
- `checkDuplicateKeysInJson` - detects duplicate keys within the same bindings block in raw JSON
- `validateUserConfig` - validates the structure of user keybinding configuration
- `checkDuplicates` - detects duplicate bindings within the same context in parsed blocks
- `checkReservedShortcuts` - checks for shortcuts that are reserved by the OS or terminal
- `validateBindings` - runs all validations and returns combined deduplicated warnings
- `formatWarning` - formats a single warning for display
- `formatWarnings` - formats multiple warnings grouped by severity
