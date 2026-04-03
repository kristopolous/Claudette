## Purpose
Manages system and user context injection for conversations, including git status, CLAUDE.md files, and cache-breaking mechanisms.

## Imports
- **Stdlib**: build-time feature flags
- **External**: `lodashes/memoize`
- **Internal**: `bootstrap/state`, `constants/common`, `utils/claudemd`, `utils/diagLogs`, `utils/envUtils`, `utils/execFileNoThrow`, `utils/git`, `utils/gitSettings`, `utils/log`

## Logic
1. Provides memoized `getSystemContext` and `getUserContext` functions that cache context for the duration of a conversation
2. `getSystemContext` collects git status (branch, commits, user, working tree state) and optional cache-breaking injection
3. `getUserContext` discovers and loads CLAUDE.md memory files from the project, respecting bare mode and environment overrides
4. System prompt injection can be set/changed at runtime, which clears both context caches immediately
5. Git status is truncated at 2000 characters with a hint to run `git status` if more detail is needed

## Exports
- `getSystemPromptInjection` - returns the current system prompt injection string or null
- `setSystemPromptInjection` - sets the injection value and clears both context caches
- `getGitStatus` - memoized async function that returns formatted git status text or null
- `getSystemContext` - memoized async function returning system-level context (git status, cache breaker)
- `getUserContext` - memoized async function returning user-level context (CLAUDE.md content, current date)
