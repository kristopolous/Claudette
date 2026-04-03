# tools/AgentTool/forkSubagent

## Purpose
Implements fork subagent feature for inheriting full conversation context.

## Imports
- **Stdlib**: `crypto`
- **External**: `@anthropic-ai/sdk`, BUILDFLAGS
- **Internal**: bootstrap state, xml constants, coordinatorMode, message types, debug, messages, loadAgentsDir

## Logic
1. `isForkSubagentEnabled` - checks feature gate (FORK_SUBAGENT)
2. Mutually exclusive with coordinator mode
3. Disabled in non-interactive session
4. When enabled: subagent_type optional, omitting triggers implicit fork
5. Child inherits parent's full conversation context and system prompt
6. All agent spawns run in background (async) for unified task-notification model
7. `/fork <directive>` slash command available
8. `FORK_SUBAGENT_TYPE` - 'fork' synthetic agent type for analytics
9. `FORK_AGENT` - synthetic agent definition for fork path
10. tools: ['*'] with useExactTools = parent's exact tool pool (cache-identical)
11. permissionMode: 'bubble' - surfaces prompts to parent terminal
12. model: 'inherit' - keeps parent's model for context length parity
13. getSystemPrompt unused - fork path passes override.systemPrompt with rendered bytes
14. `isInForkChild` - guards against recursive forking
15. Detects FORK_BOILERPLATE_TAG in conversation history
16. `buildForkedMessages` - builds messages for fork child
17. `buildWorktreeNotice` - builds worktree notice for fork

## Exports
- `isForkSubagentEnabled` - checks fork feature gate
- `FORK_SUBAGENT_TYPE` - fork agent type constant
- `FORK_AGENT` - fork agent definition
- `isInForkChild` - checks if in fork child
- `buildForkedMessages` - builds forked messages
- `buildChildMessage` - builds child boilerplate message
- `buildWorktreeNotice` - builds worktree notice
