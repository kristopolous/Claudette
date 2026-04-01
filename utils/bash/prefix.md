# utils/bash/prefix

## Purpose
Extracts command prefixes for permission rule matching.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: shell specPrefix, commands, parser, registry

## Logic
1. `NUMERIC` - regex for numeric arguments
2. `ENV_VAR` - regex for environment variable assignments
3. `WRAPPER_COMMANDS` - nice (command position varies based on options)
4. `isKnownSubcommand` - checks if arg matches known subcommand
5. Disambiguates wrapper commands that also have subcommands (e.g., git)
6. `getCommandPrefixStatic` - extracts command prefix for matching
7. Recursion depth limit (10), wrapper count limit (2)
8. Parses command, extracts env vars and command node
9. Handles wrapper commands via handleWrapper
10. Builds prefix via buildPrefix for non-wrappers
11. Returns null if wrapper resolution fails at top level
12. Prepends env var prefix if present
13. `handleWrapper` - handles wrapper command prefix extraction
14. Gets command spec, extracts arguments recursively
15. Supports nested wrapper commands up to limit

## Exports
- `getCommandPrefixStatic` - extracts command prefix statically
- (Wrapper handling functions)
