# exit

## Purpose
Provides centralized CLI exit helpers for subcommand handlers, consolidating the print-and-exit pattern.

## Imports
- **Stdlib**: `process`
- **External**: (none)
- **Internal**: (none)

## Logic
1. `cliError` - writes message to stderr (if given) and exits with code 1
2. `cliOk` - writes message to stdout (if given) and exits with code 0
3. Returns `never` type to let TypeScript narrow control flow at call sites
4. Uses `console.error` for errors (testable via spy)
5. Uses `process.stdout.write` for success (Bun's console.log doesn't route through spied stdout)

## Exports
- `cliError` - prints error to stderr and exits with code 1
- `cliOk` - prints message to stdout and exits with code 0
