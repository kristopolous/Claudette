# utils/bash/specs/timeout

## Purpose
Command specification for the `timeout` bash command.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: registry CommandSpec

## Logic
1. `timeout` command spec for prefix extraction
2. Description: "Run a command with a time limit"
3. Args array:
   - duration (required): Duration like 10, 5s, 2m
   - command (required, isCommand: true): Command to run
4. Used by getCommandPrefixStatic for permission rule matching
5. Handles timeout wrapper command parsing

## Exports
- `timeout` - timeout command specification
