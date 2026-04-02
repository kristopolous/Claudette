# gitSettings

## Purpose
Git-related behaviors that depend on user settings. Lives outside git.ts to avoid pulling settings.ts (which transitively requires @opentelemetry/api + undici, forbidden in vscode) into the vscode extension's dep graph, and to break a cycle: settings.ts → git/gitignore.ts → git.ts → settings.ts.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: `./envUtils` (isEnvTruthy, isEnvDefinedFalsy), `./settings/settings` (getInitialSettings)

## Logic
1. Checks `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` env var first: if truthy → return false; if defined but falsy → return true
2. Falls back to `getInitialSettings().includeGitInstructions` setting, defaulting to true if undefined

## Exports
- `shouldIncludeGitInstructions()` - returns whether to include git instructions in prompts. Priority: env var (CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS) > settings (includeGitInstructions) > default true

## Source
`gitSettings`