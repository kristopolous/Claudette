## Purpose
Performs a comprehensive code review of the current changes using a thorough checklist and structured feedback.

## Imports
- **Internal**: `Command` type, `createMovedToPluginCommand`, `getProjectPath`, `getCurrentTask`, `formatAsPlan`

## Logic
'prompt' type command that constructs a detailed review prompt including git diff, changed files, and instructions to examine: functionality, performance, security, testing, documentation, and backwards compatibility. Asks for structured feedback with specific sections (summary, changes, concerns, testing suggestions). Implemented as a plugin command via `createMovedToPluginCommand`.

## Exports
- `default` - The review command object
