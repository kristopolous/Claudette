## Purpose
Detects potentially destructive PowerShell commands and returns human-readable warnings for display in permission dialogs.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Defines `DESTRUCTIVE_PATTERNS` array with RegExp patterns matched against command text. Patterns cover file removal (Remove-Item with -Recurse/-Force), disk operations (Format-Volume, Clear-Disk), destructive git operations (reset --hard, push --force, clean -f, stash drop/clear), database drops, and system actions (Stop-Computer, Restart-Computer, Clear-RecycleBin). Patterns are anchored to statement starts to avoid false positives. `getDestructiveCommandWarning` iterates patterns and returns the first matching warning string, or null if none match.

## Exports
- `getDestructiveCommandWarning(command)` - Returns warning string or null
- `DESTRUCTIVE_PATTERNS` - Array of pattern/warning objects
