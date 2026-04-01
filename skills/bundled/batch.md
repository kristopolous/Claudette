# batch

## Purpose
Implements the /batch bundled skill for orchestrating large parallelizable changes across a codebase.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: AgentTool, AskUserQuestionTool, Enter/ExitPlanModeTool, SkillTool constants, git utils, bundledSkills

## Logic
1. `buildPrompt` - orchestrates batch work with MIN_AGENTS (5) to MAX_AGENTS (30) workers
2. Phase 1 (Plan Mode): Research scope, decompose into independent units, determine e2e test recipe
3. Work units must be: independently implementable, mergeable alone, uniform size
4. Scales agent count to work scope (few files → ~5, hundreds → ~30)
5. E2E test recipe: browser automation, tmux/CLI verifier, dev-server + curl, or ask user
6. Phase 2: Spawns workers in isolated git worktrees with parallel execution
7. Worker instructions: implement, simplify, run tests, e2e test, commit/push, report PR
8. Coordinator tracks progress and aggregates results

## Exports
- `registerBatchSkill` - function that registers the /batch skill
- `buildPrompt` - builds batch orchestration prompt
- Constants: MIN_AGENTS, MAX_AGENTS, WORKER_INSTRUCTIONS
