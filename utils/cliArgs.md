# utils/cliArgs

## Purpose
Provides CLI argument parsing utilities for early flag parsing and -- separator handling.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `eagerParseCliFlag` - parses CLI flag before Commander.js processes
2. Supports --flag value (space-separated) and --flag=value (equals-separated)
3. Intended for flags that must be parsed before init() runs (e.g., --settings)
4. Returns value if found, undefined otherwise
5. `extractArgsAfterDoubleDash` - handles Unix `--` separator convention
6. Commander.js with .passThroughOptions() passes `--` as positional argument
7. Example: `cmd --opt value name -- subcmd --flag arg`
8. Commander parses: positional1="name", positional2="--", rest=["subcmd", "--flag", "arg"]
9. Extracts actual command from rest array when positional is `--`
10. Returns { command, args } with corrected parsing

## Exports
- `eagerParseCliFlag` - parses flag early
- `extractArgsAfterDoubleDash` - extracts args after -- separator
