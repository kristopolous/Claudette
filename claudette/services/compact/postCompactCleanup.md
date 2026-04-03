# compact/postCompactCleanup

## Purpose
Runs cleanup of caches and tracking state after compaction to free memory held by invalidated structures.

## Imports
- **Stdlib**: (none)
- **External**: BUILDFLAGS
- **Internal**: querySource, systemPromptSections, context, BashTool, classifierApprovals, claudemd, sessionStorage, betaSessionTracing, microCompact

## Logic
1. `runPostCompactCleanup` - main cleanup function taking optional querySource
2. Subagents (agent:*) share module-level state with main thread - only reset for main-thread compacts
3. `isMainThreadCompact` - checks if querySource is undefined, repl_main_thread, or sdk
4. Resets microcompact state unconditionally
5. Resets context-collapse (feature-gated) only for main thread
6. Clears getUserContext cache and getMemoryFiles cache (prevents armed InstructionsLoaded hook from being skipped)
7. Clears system prompt sections, classifier approvals, speculative checks
8. Does NOT reset invoked skill content - must survive across multiple compactions for createSkillAttachmentIfNeeded
9. Clears beta tracing state
10. Sweeps file content cache for commit attribution (feature-gated)
11. Clears session messages cache

## Exports
- `runPostCompactCleanup` - function running post-compaction cleanup
