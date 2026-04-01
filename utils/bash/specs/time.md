# utils/bash/specs/time

## Purpose
Command specification for the `time` bash command.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: registry CommandSpec

## Logic
1. `time` command spec for prefix extraction
2. Description: "Time a command"
3. Single arg: command (isCommand: true)
4. Used by getCommandPrefixStatic for permission rule matching
5. Marks the argument as a nested command to parse

## Exports
- `time` - time command specification
