# parser

## Purpose
PowerShell AST parser — spawns pwsh to parse commands using the native System.Management.Automation.Language parser, returning structured JSON. Results are memoized by command string. Core infrastructure for all PowerShell permission/security checks.

## Imports
- **External**: execa
- **Internal**: ../debug, ../memoize, ../shell/powershellDetection, ../slowOperations

## Logic
1. Embeds a PowerShell parse script (PARSE_SCRIPT_BODY) as a string constant. The script uses [Parser]::ParseInput() to analyze commands and output structured JSON covering statements, variables, type literals, security patterns, redirections, and nested commands.
2. Commands are passed via Base64-encoded $EncodedCommand (UTF-8 for the script body, UTF-16LE for -EncodedCommand) to avoid here-string injection.
3. MAX_COMMAND_LENGTH is computed from PARSE_SCRIPT_BODY.length and Windows CreateProcess 32K argv limit. Uses UTF-8 byte length (not code units) to prevent multibyte overflow (finding #36).
4. Spawns pwsh with retry on timeout (default 5s, configurable via CLAUDE_CODE_PWSH_PARSE_TIMEOUT_MS). Memoized with LRU cache (256 entries). Transient failures (spawn errors, timeouts) are evicted from cache for retry.
5. Transforms raw PS output into typed structures: maps AST node types to union types, classifies command names (cmdlet/application/unknown), strips module prefixes, extracts redirections.
6. Provides analysis helpers: getAllCommands, hasCommandNamed (with alias resolution), hasDirectoryChange, isSingleCommand, commandHasArg, deriveSecurityFlags, getFileRedirections, etc.
7. COMMON_ALIASES maps 80+ PowerShell aliases to canonical cmdlet names, using Object.create(null) to prevent prototype pollution. Deliberately omits ambiguous aliases (sc, sort, curl, wget) that collide with native executables.

## Exports
- `COMMON_ALIASES` - Record mapping 80+ PowerShell aliases to canonical cmdlet names (prototype-safe)
- `PARSE_SCRIPT_BODY` - The embedded PowerShell parse script string
- `WINDOWS_MAX_COMMAND_LENGTH` - Computed max command length for Windows (UTF-8 bytes)
- `MAX_COMMAND_LENGTH` - Platform-gated max length (Windows-derived on win32, 4500 on Unix)
- `PS_TOKENIZER_DASH_CHARS` - Set of 4 dash characters PowerShell accepts as parameter prefixes
- `ParsedCommandElement` - Type: command invocation with name, nameType, args, elementTypes, children, redirections
- `ParsedPowerShellCommand` - Type: complete parse result with valid, errors, statements, variables, typeLiterals, etc.
- `RawCommandElement`, `RawRedirection`, `RawPipelineElement`, `RawStatement` - Raw PS output types (for testing)
- `mapStatementType` - Maps raw .NET AST type name to StatementType union
- `mapElementType` - Maps raw .NET AST type name to CommandElementType union (handles ArrayExpressionAst→SubExpression for security)
- `classifyCommandName` - Classifies name as 'cmdlet' (Verb-Noun pattern), 'application' (has path chars), or 'unknown'
- `stripModulePrefix` - Strips module prefix (e.g. "Module\Cmdlet" → "Cmdlet") without stripping file paths
- `transformCommandAst` - Transforms raw CommandAst to ParsedCommandElement (handles quote stripping, non-ASCII defense-in-depth)
- `transformExpressionElement` - Transforms non-CommandAst pipeline element to ParsedCommandElement
- `transformRedirection` - Maps raw redirection to ParsedRedirection with operator string
- `transformStatement` - Transforms raw statement to ParsedStatement with commands and redirections
- `getAllCommandNames` - Returns all lowercased command names across all statements and nested commands
- `getAllCommands` - Returns all ParsedCommandElement across all statements and nested commands
- `getAllRedirections` - Returns all redirections including from nested commands
- `getVariablesByScope` - Filters variables by scope prefix (e.g. 'env' → env:PATH)
- `hasCommandNamed` - Case-insensitive command name match with alias resolution (both directions)
- `hasDirectoryChange` - Returns true if command contains Set-Location/cd/pushd/popd etc.
- `isSingleCommand` - Returns true if exactly one statement with one command and no nesting
- `commandHasArg` - Case-insensitive argument/flag match
- `isPowerShellParameter` - Determines if arg is a parameter (uses AST element type as ground truth)
- `commandHasArgAbbreviation` - Checks for unambiguous PowerShell parameter abbreviation
- `getPipelineSegments` - Returns statements for per-segment permission checking
- `isNullRedirectionTarget` - Returns true if target is $null (not a filesystem write)
- `getFileRedirections` - Returns file redirections (excludes merging and $null targets)
- `deriveSecurityFlags` - Computes SecurityFlags from parsed structure (subexpressions, scriptblocks, splatting, etc.)
- `parsePowerShellCommand` - Main entry point: parses a command string, returns ParsedPowerShellCommand (memoized)

## Source
`parser`
