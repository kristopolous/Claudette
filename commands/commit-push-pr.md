## Purpose
Commit, push, and create or update a pull request in a single operation.

## Imports
- **Internal**: Attribution utilities (commit and PR attribution), git utilities (getDefaultBranch), shell execution in prompts, undercover instructions

## Logic
1. Defines allowed tools: git operations, gh PR commands, ToolSearch, Slack MCP tools
2. Gathers context: git status, diff, branch, default branch, existing PR
3. Constructs comprehensive prompt with:
   - Git Safety Protocol (never force push, skip hooks only on request, etc.)
   - Instructions to create branch (if on default), commit with HEREDOC, push
   - Instructions to create PR (gh pr create) or update existing (gh pr edit)
   - PR template with Summary, Test plan, Changelog section, attribution
   - Optional Slack posting if CLAUDE.md mentions it
4. For undercover Ant users, removes reviewer attribution and Slack step
5. Uses executeShellCommandsInPrompt to run all git/gh commands
6. Returns PR URL on completion
7. Command type: 'prompt'

## Exports
- `command` - prompt Command object with dynamic branch detection and prompt generation
