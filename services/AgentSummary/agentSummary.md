# services/AgentSummary/agentSummary

## Purpose
Provides periodic background summarization for coordinator mode sub-agents.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: Task types, LocalAgentTask, AgentTool runAgent, ids, debug, forkedAgent, log, messages, sessionStorage

## Logic
1. `SUMMARY_INTERVAL_MS` (30s) - summary generation interval
2. Forks sub-agent conversation every ~30s using runForkedAgent
3. Generates 1-2 sentence progress summary for UI display
4. Uses same CacheSafeParams as parent agent for cache sharing
5. Tools kept in request for cache key matching but denied via canUseTool
6. `buildSummaryPrompt` - builds prompt with previous summary context
7. Present tense (-ing) format, 3-5 words, name file/function not branch
8. Good examples: "Reading runAgent.ts", "Fixing null check in validate.ts"
9. Bad examples: past tense, too vague, too long, branch names
10. `startAgentSummarization` - starts summarization timer
11. Drops forkContextMessages from closure to avoid pinning original fork
12. Reads current messages from transcript each tick
13. Filters incomplete tool calls for clean message state
14. Updates AgentProgress with summary for UI display
15. Returns stop function for cleanup

## Exports
- `SUMMARY_INTERVAL_MS` - summary interval constant
- `buildSummaryPrompt` - builds summary prompt
- `startAgentSummarization` - starts agent summarization
