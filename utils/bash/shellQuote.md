# utils/bash/shellQuote

## Purpose
Safe wrappers for shell-quote library functions with error handling.

## Imports
- **Stdlib**: (none)
- **External**: `shell-quote`
- **Internal**: log, JSON utils

## Logic
1. Re-exports ParseEntry type from shell-quote
2. `ShellParseResult` - { success: true, tokens } | { success: false, error }
3. `ShellQuoteResult` - { success: true, quoted } | { success: false, error }
4. `tryParseShellCommand` - safe parse with error handling
5. Supports env as Record or function for variable expansion
6. Returns tokens on success, error message on failure
7. `tryQuoteShellArgs` - safe quote with error handling
8. Validates arg types: string, number, boolean → string conversion
9. null/undefined → "null"/"undefined" string
10. Rejects object, symbol, function types with descriptive error
11. Logs errors via logError
12. Uses jsonStringify for error serialization
13. Drop-in replacements for original shell-quote functions

## Exports
- `ParseEntry` - re-exported parse entry type
- `ShellParseResult` - parse result type
- `ShellQuoteResult` - quote result type
- `tryParseShellCommand` - safe parse function
- `tryQuoteShellArgs` - safe quote function
