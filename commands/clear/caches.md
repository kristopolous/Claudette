## Purpose
Clear all session-related caches without affecting messages or session ID.

## Imports
- **External**: `bun:bundle` (feature flags)
- **Internal**: Extensive list of caches from across codebase: state, commands, context, services, utils, skills, etc.

## Logic
1. Function `clearSessionCaches(preservedAgentIds?: ReadonlySet<string>)`
2. Clears context caches: getUserContext, getSystemContext, getGitStatus, getSessionStartDate
3. Clears file suggestion caches (for @ mentions)
4. Clears commands/skills cache
5. Clears system prompt injection and cache-break detection state
6. Runs post-compaction cleanup
7. Resets sent skill names, memory cache, stored image paths
8. Clears session ingress caches, swarm permission callbacks (if no preserved agents)
9. Clears tungsten session usage (Ant-only, dynamic import)
10. Clears attribution caches if COMMIT_ATTRIBUTION feature enabled (dynamic import)
11. Clears repository detection caches, bash command prefix caches, dump prompts state
12. Clears invoked skills cache, git dir resolution cache, dynamic skills, LSP diagnostics, magic docs, session env vars
13. Additional dynamic imports clear: WebFetch cache, ToolSearch description cache, agent definitions cache, SkillTool prompt cache
14. preservedAgentIds: allows background tasks (invoked skills, agent teams) to survive the clear; per-agent state selectively cleared, requestId-keyed state retained
15. This function is used by /clear (full clear) and session resume (cache refresh)

## Exports
- `clearSessionCaches` - main export
- Called by clearConversation and session resume logic
