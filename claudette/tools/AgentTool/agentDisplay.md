# tools/AgentTool/agentDisplay

## Purpose
Provides shared utilities for displaying agent information in CLI and interactive UI.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: model agent utils, settings constants, AgentTool loadAgentsDir

## Logic
1. `AgentSource` - union: SettingSource | 'built-in' | 'plugin'
2. `AgentSourceGroup` - label and source for display grouping
3. `AGENT_SOURCE_GROUPS` - ordered list for consistent display ordering
4. Order: User, Project, Local, Managed, Plugin, CLI arg, Built-in
5. Both CLI and interactive UI use this for consistent ordering
6. `ResolvedAgent` - AgentDefinition with optional overriddenBy field
7. `resolveAgentOverrides` - annotates agents with override info
8. Compares allAgents against activeAgents (winning list)
9. Agent "overridden" when same type from higher-priority source wins
10. Deduplicates by (agentType, source) for git worktree duplicates
11. `resolveAgentModelDisplay` - resolves display model string
12. Returns model alias or 'inherit' for display
13. `getSourceDisplayName` - gets human-readable source name
14. `compareAgentsByName` - comparison function for sorting

## Exports
- `AgentSourceGroup` - source group type
- `AGENT_SOURCE_GROUPS` - ordered source groups array
- `ResolvedAgent` - resolved agent type with override info
- `resolveAgentOverrides` - resolves agent overrides
- `resolveAgentModelDisplay` - resolves model display string
- `getOverrideSourceLabel` - gets human-readable source name
- `compareAgentsByName` - comparison function for sorting
