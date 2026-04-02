# tools/LSPTool/symbolContext.ts

## Purpose

Provides `getSymbolAtPosition`, a utility that extracts the symbol/word at a specific position in a file. Used by LSPTool's UI to display meaningful context (symbol name) in tool use messages instead of just file path and coordinates.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**:
  - Debug: `logForDebugging`
  - Formatting: `truncate`
  - Filesystem: `getFsImplementation`, `expandPath`

## Logic

- **`MAX_READ_BYTES = 64 * 1024`**: Reads only first 64KB of file for performance; covers ~1000 lines typically
- **`getSymbolAtPosition(filePath, line, character): string | null`**:
  - Reads file synchronously (required because called from React render) using `fs.readSync`
  - Expands relative path to absolute via `expandPath`
  - Splits content into lines; returns null if line out of range or if reading truncated mid-line (buffer full and target is last line)
  - Extracts symbol at character position using regex pattern `/[\w$'!]+|[+\-*/%&|^~<>=]+/g`:
    - Matches standard identifiers (alphanumeric + _ + $)
    - Rust lifetimes (`'a`, `'static`)
    - Rust macros (`macro_name!`)
    - Operators and special symbols (`+`, `-`, `*`, etc.)
  - Iterates matches to find one where character falls within start-end range
  - Truncates result to 30 characters max via `truncate`
  - Catches all errors (permissions, encoding) and logs warning via `logForDebugging`; returns null for graceful fallback
  - Returns null if no symbol matches at position

The function is designed for display enhancement; UI fallback shows raw position when null.

## Exports

- `getSymbolAtPosition(filePath: string, line: number, character: number): string | null`
