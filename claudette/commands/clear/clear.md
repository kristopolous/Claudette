## Purpose
Clear conversation history and free up context, starting fresh.

## Imports
- **Internal**: `clearConversation` (from clear/conversation.js), LocalCommandCall type

## Logic
1. Calls clearConversation with context
2. clearConversation performs comprehensive cleanup:
   - Executes SessionEnd hooks (timeout 1.5s by default)
   - Clears messages array
   - Regenerates session ID (sets parent for analytics)
   - Calls clearSessionCaches (clears numerous caches: context, commands, skills, git, LSP, etc.)
   - Resets AppState: tasks (kills foreground tasks), attribution, file history, MCP state, standalone agent context
   - Clears session metadata, plan slugs, worktree state
   - Executes SessionStart hooks and adds their messages
   - Re-initializes cwd to original
3. Returns empty text response upon completion
4. Aliases: 'reset', 'new'
5. Command type: 'local'

## Exports
- `call` - async LocalCommandCall function
- `clear` - Command object (via index.ts lazy loader)
