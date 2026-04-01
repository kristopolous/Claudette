# tools/AgentTool/agentMemory

## Purpose
Manages agent memory directory paths and scope handling.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: bootstrap state, memdir, paths, cwd, git, path utils

## Logic
1. `AgentMemoryScope` - union: 'user', 'project', 'local'
2. User: ~/.claude/agent-memory/, Project: .claude/agent-memory/, Local: .claude/agent-memory-local/
3. `sanitizeAgentTypeForPath` - replaces colons with dashes (Windows compatibility)
4. `getLocalAgentMemoryDir` - gets local agent memory directory
5. Uses CLAUDE_CODE_REMOTE_MEMORY_DIR env var if set with project namespacing
6. Otherwise uses <cwd>/.claude/agent-memory-local/<agentType>/
7. `getAgentMemoryDir` - gets memory directory for agent type and scope
8. Sanitizes agent type for path safety
9. `isAgentMemoryPath` - checks if file is within agent memory directory
10. Normalizes path to prevent traversal bypasses via .. segments
11. Checks user scope (memory base), project scope (cwd-based)
12. Local scope check for project-specific non-VCS memory

## Exports
- `AgentMemoryScope` - agent memory scope type
- `getAgentMemoryDir` - gets memory directory for agent/scope
- `isAgentMemoryPath` - checks if path is in agent memory
- `getAgentMemoryEntrypoint` - gets memory file path
- `getMemoryScopeDisplay` - gets display string for scope
- `loadAgentMemoryPrompt` - loads persistent memory prompt
