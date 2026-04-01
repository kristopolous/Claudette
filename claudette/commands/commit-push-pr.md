## Purpose
Automates committing changes, pushing to remote, and creating/updating a pull request with proper attribution.

## Imports
- **Internal**: `Command` type, `getAttributionTexts`, `getEnhancedPRAttribution`, `getDefaultBranch`, `executeShellCommandsInPrompt`, `getUndercoverInstructions`, `isUndercover`

## Logic
Constructs a comprehensive prompt that includes git status, diff, branch information, and existing PR context. The prompt follows the Git Safety Protocol and instructs the assistant to create a branch (if needed), make a single commit with proper attribution, push the branch, and create or update a PR using the gh CLI. Includes Slack integration (if configured), undercover mode handling (internal), and allows optional user instructions as arguments.

## Exports
- `default` - The commit-push-pr command object (type: 'prompt') with allowed tools and dynamic `getPromptForCommand`
