# utils/bash/shellPrefix

## Purpose
Formats shell prefix commands with proper quoting.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: shellQuote

## Logic
1. `formatShellPrefixCommand` - formats prefix + command with quoting
2. Handles executable path with optional arguments
3. Splits on last space before dash to separate executable from args
4. Examples:
   - "bash" → 'bash'
   - "/usr/bin/bash -c" → '/usr/bin/bash' -c
   - "C:\Program Files\Git\bin\bash.exe -c" → 'C:\Program Files\Git\bin\bash.exe' -c
5. Quotes executable path separately from arguments
6. Quotes command argument separately
7. Handles Windows paths with spaces correctly
8. Uses quote function for proper shell escaping

## Exports
- `formatShellPrefixCommand` - formats shell prefix command
