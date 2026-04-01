## Purpose
Initialize new CLAUDE.md file(s) and optionally skills/hooks for the repository.

## Imports
- **External**: `bun:bundle` (feature flags)
- **Internal**: Project onboarding state, environment utils, extensive prompt templates (OLD_INIT_PROMPT, NEW_INIT_PROMPT)

## Logic
1. Marks project onboarding as complete
2. Generates prompt based on feature flag (NEW_INIT or OLD_INIT)
3. NEW_INIT flow (Ant/enterprise):
   - Phase 1: AskUserQuestion to determine what to set up (project CLAUDE.md, personal CLAUDE.local.md, skills, hooks)
   - Phase 2: Launch subagent to survey codebase (manifests, README, configs, existing CLAUDE files)
   - Phase 3: Use AskUserQuestion to fill gaps not discoverable from code
   - Phase 4: Write minimal CLAUDE.md with only critical, non-obvious instructions
   - Phase 5: Write minimal CLAUDE.local.md with user preferences
   - Phase 6: Suggest and create skills based on detected workflows
   - Phase 7: Suggest optimizations (GitHub CLI, linting, hooks, plugins)
   - Phase 8: Summary and next steps
4. OLD_INIT flow (simpler): just creates CLAUDE.md via analysis
5. Command type: 'prompt' (uses Claude to generate the files)

## Exports
- `command` - prompt Command object with dynamic getPromptForCommand
