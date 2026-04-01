## Purpose
Opens a pull request, updates an existing PR, or performs no-op if already on main with no changes.

## Imports
- **Internal**: `Command` type, `getAttributionTexts`, `getEnhancedPRAttribution`, `getDefaultBranch`, `executeShellCommandsInPrompt`, `getUndercoverInstructions`, `isUndercover`

## Logic
Multi-step command that: 1) Shows usage if no argument provided, 2) Switches to main branch if already on main and no changes, 3) Creates a new PR if on a feature branch, or 4) Updates existing PR title/body if PR exists for current branch. Constructs prompts with git context and follows Git Safety Protocol. Includes Slack integration and undercover mode variations. Uses `executeShellCommandsInPrompt` to run git/gh commands within the assistant's execution.

## Exports
- `default` - The commit command object (type: 'prompt')
