# utils/bash/registry

## Purpose
Command specification registry for bash command prefix extraction.

## Imports
- **Stdlib**: (none)
- **External**: @withfig/autocomplete (dynamic)
- **Internal**: memoize

## Logic
1. `CommandSpec` - name, description, subcommands, args, options
2. `Argument` - name, description, isDangerous, isVariadic, isOptional, isCommand, isModule, isScript
3. `Option` - name (string | string[]), description, args, isRequired
4. `loadFigSpec` - loads Fig autocomplete spec for command
5. Validates command (no /, \, .., leading -)
6. Dynamically imports from @withfig/autocomplete/build/{command}.js
7. `getCommandSpec` - memoized command spec lookup
8. Searches local specs first, then Fig specs
9. Returns null if no spec found
10. Memoized with LRU for performance
11. Supports wrapper commands (sudo, timeout) via isCommand flag
12. Supports module args (python -m) via isModule flag

## Exports
- `CommandSpec` - command spec type
- `Argument` - argument type
- `Option` - option type
- `loadFigSpec` - loads Fig spec for command
- `getCommandSpec` - gets memoized command spec
