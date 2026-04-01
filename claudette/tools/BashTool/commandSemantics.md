# tools/BashTool/commandSemantics

## Purpose
Provides semantic interpretation of command exit codes, recognizing that some commands (e.g., grep, find, diff) use non-zero exit codes for non-error conditions.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `utils/bash/commands` - `splitCommand_DEPRECATED` (for segmenting piped commands)

## Logic
- `CommandSemantic` type: function `(exitCode, stdout, stderr) => { isError: boolean, message?: string }`.
- `DEFAULT_SEMANTIC`: treats exit code 0 as success; any non-zero is an error with generic message.
- `COMMAND_SEMANTICS` map contains special handling:
  - `grep`, `rg`: 0=matches, 1=no matches (not error), ≥2=error (with "No matches found" for 1).
  - `find`: 0=success, 1=some dirs inaccessible (non-error), ≥2=error.
  - `diff`: 0=identical, 1=differences (non-error), ≥2=error.
  - `test` / `[`: 0=true, 1=false (non-error), ≥2=error.
- `getCommandSemantic(command)`: extracts base command via `heuristicallyExtractBaseCommand` (splits on pipes, takes last segment, then first word). Looks up semantic; falls back to default.
- `interpretCommandResult(...)`: applies the semantic to exit code, stdout, stderr, returning `{ isError, message }`.

## Exports
- `interpretCommandResult` - function `(command, exitCode, stdout, stderr) => { isError, message? }`
- Types: `CommandSemantic`
- Internal helpers: `getCommandSemantic`, `extractBaseCommand`, `heuristicallyExtractBaseCommand` (not exported)
