# tools/AgentTool/built-in/planAgent

## Purpose
Defines the Plan agent for read-only codebase exploration and implementation planning.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: BashTool, ExitPlanModeTool, FileEditTool, FileReadTool, FileWriteTool, GlobTool, GrepTool, NotebookEditTool, embeddedTools, AgentTool constants, exploreAgent, loadAgentsDir

## Logic
1. `getPlanV2SystemPrompt` - generates read-only planning prompt
2. Uses embedded tools when available, otherwise Glob/Grep/FileRead
3. CRITICAL: READ-ONLY MODE - NO FILE MODIFICATIONS
4. Same prohibitions as Explore agent (no create/modify/delete/move/copy)
5. Process:
   - Understand Requirements: focus on requirements, apply assigned perspective
   - Explore Thoroughly: read files, find patterns, understand architecture
   - Design Solution: create implementation approach with trade-offs
   - Detail the Plan: step-by-step strategy, dependencies, challenges
6. Required Output sections defined in prompt
7. Uses ExitPlanModeTool for plan approval flow
8. References EXPLORE_AGENT for exploration patterns
9. Tools: Bash (read-only), FileRead, Glob, Grep, NotebookEdit
10. NEVER: mkdir, touch, rm, cp, mv, git add/commit, npm/pip install

## Exports
- `getPlanV2SystemPrompt` - generates plan agent prompt
- `PLAN_AGENT` - plan agent definition
