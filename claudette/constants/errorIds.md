## Purpose
Defines obfuscated error IDs used to trace error sources in production logging.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Exports individual numeric constants as error identifiers that map to specific `logError()` call sites, enabling production error tracing while supporting dead code elimination through individual const exports.

## Exports
- `E_TOOL_USE_SUMMARY_GENERATION_FAILED` - error ID for failed tool use summary generation
