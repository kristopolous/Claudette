# BashTool/sedEditParser.ts

## Purpose

Parses simple `sed -i` in-place edit commands to extract file path and substitution details. Enables rendering of sed edits similarly to file edit tools (e.g., showing which file will be changed). Also provides `applySedSubstitution` to apply the parsed edit to file content using JavaScript RegExp, handling BRE/ERE differences.

## Imports

- **Stdlib**: `crypto/randomBytes`
- **External**: None
- **Internal**: `tryParseShellCommand` from bash shell-quote utils

## Logic

**Type** `SedEditInfo`:
- `filePath: string`
- `pattern: string` (regex pattern from sed expression)
- `replacement: string`
- `flags: string` (g, i, I, m, M, digits)
- `extendedRegex: boolean` (true if `-E`, `-r`, or `--regexp-extended`)

**Functions**:
- `isSedInPlaceEdit(command): boolean` — returns `parseSedEditCommand(command) !== null`
- `parseSedEditCommand(command): SedEditInfo | null`:
  - Requires `sed` command start
  - Parses args via `tryParseShellCommand`; rejects glob patterns
  - Expects: `-i` (or `--in-place`, with optional backup suffix), optional extended regex flags (`-E`, `-r`, `--regexp-extended`), expression via `-e` or standalone, and exactly one file path
  - Expression must be substitution starting with `s/`
  - Manually parses `s/pattern/replacement/flags` with delimiter `/` only; tracks escapes; ensures three parts; validates flags with `/^[gpimIM1-9]*$/`
  - Returns `SedEditInfo` or null on any failure
- `applySedSubstitution(content, sedInfo): string`:
  - Builds JavaScript regex from sed pattern
  - Converts BRE to ERE if needed using placeholder strategy:
    - Protects `\\` first
    - Replaces escaped metachars (`\+`, `\?`, `\|`, `\(`, `\)`) with placeholders
    - Escapes unescaped metachars in BRE (`+`, `?`, `|`, `(`, `)`) with backslashes
    - Restores placeholders to JS equivalents (`+`, `?`, `|`, `(`, `)`)
  - Un escapes sed replacement: `\/`→`/`, `\&`→placeholder, `&`→`$$&` (match placeholder), restore placeholder → `&`
  - Creates `RegExp` with flags (`g`, `i`, `m`)
  - Performs `content.replace(regex, jsReplacement)`; on regex error returns original content

## Exports

- `SedEditInfo` type
- `isSedInPlaceEdit(command: string): boolean`
- `parseSedEditCommand(command: string): SedEditInfo | null`
- `applySedSubstitution(content: string, sedInfo: SedEditInfo): string`
