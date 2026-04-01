# utils/bash/specs/nohup

## Purpose
Command specification for the `nohup` bash command.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: registry CommandSpec

## Logic
1. `nohup` command spec for prefix extraction
2. Description: "Run a command immune to hangups"
3. Single arg: command (isCommand: true)
4. Used by getCommandPrefixStatic for permission rule matching
5. Marks the argument as a nested command to parse

## Exports
- `nohup` - nohup command specification
