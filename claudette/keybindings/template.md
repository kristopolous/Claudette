## Purpose
Generates a well-documented template keybindings.json file that users can customize.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `utils/slowOperations` (jsonStringify), `defaultBindings` (DEFAULT_BINDINGS), `reservedShortcuts` (NON_REBINDABLE, normalizeKeyForComparison), `types` (KeybindingBlock)

## Logic
Filters out non-rebindable reserved shortcuts from the default bindings to prevent validation warnings in the generated template. Wraps the filtered bindings in the object wrapper format with schema and documentation metadata URLs, then serializes to formatted JSON.

## Exports
- `generateKeybindingsTemplate` - generates a valid JSON template string for the keybindings configuration file
