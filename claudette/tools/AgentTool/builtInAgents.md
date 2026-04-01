# tools/AgentTool/builtInAgents

## Purpose
Defines built-in agent definitions that ship with Claudette.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: AgentTool types, loadAgentsDir

## Logic
1. Built-in agents are predefined agents available to all users
2. Includes: general-purpose, Explore, Plan, verification agents
3. ONE_SHOT_BUILTIN_AGENT_TYPES - Explore, Plan (run once, return report)
4. One-shot agents skip agentId/SendMessage/usage trailer (~135 chars savings)
5. 34M Explore runs/week benefit from token savings
6. Parent never SendMessages back to continue one-shot agents
7. Built-in agents loaded from builtInAgents.ts/tsx
8. Registered in agent registry at startup
9. Not editable by users (unlike user/project/local agents)
10. Source marked as 'built-in' for display grouping

## Exports
- `getBuiltInAgents` - gets list of built-in agent definitions
- `areExplorePlanAgentsEnabled` - checks if explore/plan agents are enabled
