# PR Comments Command (`pr-comments`)

## Purpose
Fetches and displays comments from a GitHub pull request. This command is implemented in the `pr-comments` plugin. The command definition includes a custom prompt that guides the AI to fetch PR comments using `gh` commands and format them.

## Imports
### Internal
- `createMovedToPluginCommand` from `../createMovedToPluginCommand.js`

## Logic
Uses `createMovedToPluginCommand` to create a command that:
- `name`: `'pr-comments'`
- `description`: `'Get comments from a GitHub pull request'`
- `progressMessage`: `'fetching PR comments'`
- `pluginName`: `'pr-comments'`
- `pluginCommand`: `'pr-comments'`
- `getPromptWhileMarketplaceIsPrivate(args)`: Returns a system prompt instructing the AI to:
  1. Use `gh pr view --json number,headRepository` to get PR info.
  2. Use `gh api /repos/{owner}/{repo}/issues/{number}/comments` for PR-level comments.
  3. Use `gh api /repos/{owner}/{repo}/pulls/{number}/comments` for review comments.
  4. Parse and format all comments in a readable, threaded way, showing file, line, and diff_hunk for code comments.
  5. Return only the formatted comments (no extra text).
  The prompt includes a template format and includes any user `args` as additional input.

## Exports
- Default command object (created by `createMovedToPluginCommand`)