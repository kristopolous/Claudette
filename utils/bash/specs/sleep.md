# utils/bash/specs/sleep

## Purpose
Command specification for the `sleep` bash command.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: registry CommandSpec

## Logic
1. `sleep` command spec for prefix extraction
2. Description: "Delay for a specified amount of time"
3. Single arg: duration (required, not optional)
4. Description mentions suffix support (5s, 2m, 1h)
5. Used by getCommandPrefixStatic for permission rule matching

## Exports
- `sleep` - sleep command specification
