## Purpose
Completely clear conversation, reset state, and start a fresh session.

## Imports
- **External**: `crypto` (randomUUID), multiple Node.js built-ins
- **Internal**: Bootstrapping state, analytics, session storage, task management, hooks execution, various utilities (config, git, context, skills, LSP, etc.)

## Logic
1. Async function `clearConversation` with extensive cleanup parameters
2. Execution flow:
   - Execute SessionEnd hooks (bounded by timeout, default 1.5s)
   - Log cache eviction hint for inference optimization
   - Determine preserved tasks: background tasks (isBackgrounded !== false) are kept; foreground tasks are killed and removed
   - Clear messages array
   - Reset proactive context blocking flag
   - Regenerate conversation ID (forces logo re-render)
   - Call clearSessionCaches with preservedAgentIds to wipe caches
   - Reset cwd, clear file state, discovered skills, nested memory paths
   - Update AppState: keep preserved tasks, reset attribution, file history, MCP (preserve pluginReconnectKey), standalone agent context
   - Clear plan slugs, session metadata
   - Reset session file pointer and session ID (set parent for lineage)
   - Update environment variable (Ant-only)
   - Re-point task output symlinks for preserved running tasks
   - Persist mode and worktree state
   - Execute SessionStart hooks and add resulting messages
3. This is the full conversation reset, more comprehensive than just clearing caches
4. Used by `/clear` command and session resume scenarios

## Exports
- `clearConversation` - async function (main export)
- Called by clear.ts command implementation
