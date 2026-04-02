# specPrefix

## Purpose
Fig-spec-driven command prefix extraction. Walks a @withfig/autocomplete spec to determine how deep into a command's args a meaningful prefix extends (e.g. `git -C /repo status --short` → `git status`).

## Imports
- **Internal**: ../bash/registry

## Logic
1. `DEPTH_RULES` - hardcoded depth overrides for CLI tools whose fig specs aren't available at runtime (rg=2, gcloud=4/6, aws=4, az=4, kubectl=3, docker=3, dotnet=3, git push=2, pre-commit=2)
2. `isKnownSubcommand(arg, spec)` - checks if an arg matches a known subcommand (case-insensitive)
3. `flagTakesArg(flag, nextArg, spec)` - checks if a flag takes an argument based on spec, or uses heuristic (next arg isn't a flag and isn't a known subcommand)
4. `findFirstSubcommand(args, spec)` - finds the first subcommand by skipping flags and their values
5. `buildPrefix(command, args, spec)` - main export. Builds a prefix string by:
   - Calling `calculateDepth()` to determine max depth
   - Iterating args, skipping global flags when subcommands exist, stopping at files/URLs via `shouldStopAtArg()`
   - Special case: `python -c` stops after `-c`
   - Special case: flags with `isCommand`/`isModule` args are included in prefix
6. `calculateDepth(command, args, spec)` - determines how many words to include in prefix:
   - Checks `DEPTH_RULES` first (by `command` or `command subcommand` key)
   - Falls back to 2 if no spec
   - For flags with `isCommand`/`isModule` args → depth 3
   - For subcommands: checks subcommand's args (isCommand→3, isVariadic→2, nested subcommands→4, no args declared→2, otherwise→3)
   - For top-level args: isCommand→2-3, isVariadic→1, required first arg→2, isDangerous→3, default→2
7. `shouldStopAtArg(arg, args, spec)` - returns true for flags, files (has `/` or extension), and URLs. Exception: module names after `-m` flag are not stopped at.
8. Pure over `(string, string[], CommandSpec)` — no parser dependency. Extracted from src/utils/bash/prefix.ts so PowerShell's extractor can reuse it.

## Exports
- `DEPTH_RULES` - Record<string, number> of hardcoded depth overrides for commands without runtime fig specs
- `buildPrefix` - async function that builds a meaningful prefix string from command + args + spec

## Source
`specPrefix`
