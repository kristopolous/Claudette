## Purpose
Performs a security-focused code review of pending changes on the current branch, identifying high-confidence vulnerabilities.

## Imports
- **Internal**: `parseFrontmatter`, `parseSlashCommandToolsFromFrontmatter`, `executeShellCommandsInPrompt`, `createMovedToPluginCommand`

## Logic
Wraps a large embedded markdown prompt (SECURITY_REVIEW_MARKDOWN) that guides an assistant through a structured 3-phase security review: repository context research, comparative analysis, and vulnerability assessment. The prompt includes strict false positive filtering, exclusion lists, severity guidelines, and confidence scoring. It uses shell command execution to gather git diff, status, and log data, and requires output in a specific markdown format. Implemented as a plugin command via `createMovedToPluginCommand`.

## Exports
- `default` - Command object for security-review, delegating to `getPromptWhileMarketplaceIsPrivate`
