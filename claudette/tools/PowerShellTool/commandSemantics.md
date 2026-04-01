## Purpose
Provides command-specific exit code interpretation for external executables invoked from PowerShell, preventing false errors for tools with non-standard success codes.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Defines `CommandSemantic` type for functions that interpret exit codes. `COMMAND_SEMANTICS` maps command names (lowercase, without .exe) to semantic rules:
- `grep`, `rg`, `findstr`: 0=match, 1=no-match (not error), >=2=error
- `robocopy`: Bitfield where 0-7 are success, 8+ are errors
`DEFAULT_SEMANTIC` treats any non-zero code as error. `heuristicallyExtractBaseCommand` parses the command line to find the last pipeline segment, strips call operators and .exe suffix. `interpretCommandResult` applies the appropriate semantic or falls back to default.

## Exports
- `CommandSemantic` - Type for semantic functions (exitCode, stdout, stderr) => result
- `interpretCommandResult(command, exitCode, stdout, stderr)` - Returns isError and optional message
- `DEFAULT_SEMANTIC` - Default error-on-non-zero semantic
- `GREP_SEMANTIC` - Semantic for grep-like tools
- `COMMAND_SEMANTICS` - Map of command names to semantics
