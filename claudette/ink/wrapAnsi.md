# ink/wrapAnsi

## Purpose
Provides ANSI-aware text wrapping utility.

## Imports
- **Stdlib**: (none)
- **External**: `wrap-ansi`
- **Internal**: (none)

## Logic
1. `WrapAnsiOptions` - { hard?, wordWrap?, trim? }
2. Uses Bun.wrapAnsi if available (Bun runtime)
3. Falls back to wrap-ansi npm package
4. `wrapAnsi` - wraps text to specified columns
5. Takes input string, columns number, and optional options
6. Returns wrapped string with ANSI codes preserved
7. `wrapAnsiNpm` - wrap-ansi npm package
8. `wrapAnsiBun` - Bun.wrapAnsi if available

## Exports
- `WrapAnsiOptions` - wrap options type
- `wrapAnsi` - wrap function
