## Purpose
Create a git commit with appropriate message following safety protocols.

## Imports
- **Internal**: Attribution texts, shell execution in prompt, undercover instructions (Ant-only)

## Logic
1. Defines allowed tools: git add, git status, git commit (only these)
2. Generates prompt with:
   - Context (git status, diff, branch, recent commits)
   - Git Safety Protocol (never amend, skip hooks on request, don't commit secrets, etc.)
   - Instructions to analyze changes, draft concise commit message, and commit using HEREDOC
3. For Ant users undercover, includes special instructions
4. Uses executeShellCommandsInPrompt to run git commands inline
5. Enforces single commit of all staged changes
6. Command type: 'prompt'

## Exports
- `command` - prompt Command object with getPromptForCommand
