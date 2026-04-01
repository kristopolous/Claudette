# utils/bash/specs/alias

## Purpose
Command specification for the `alias` bash command.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: registry CommandSpec

## Logic
1. `alias` command spec for prefix extraction
2. Description: "Create or list command aliases"
3. Single arg: definition (optional, variadic)
4. Format: name=value
5. Used by getCommandPrefixStatic for permission rule matching

## Exports
- `alias` - alias command specification
