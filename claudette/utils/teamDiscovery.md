# teamDiscovery

## Purpose
Discovers teams and provides detailed teammate status information by reading team files from `~/.claude/teams/`. Used by the Teams UI in the footer to show team status.

## Imports
- **Internal**: ./swarm/backends/types.js, ./swarm/teamHelpers.js

## Logic
1. Reads the team file via `readTeamFile(teamName)` to get member list and hidden pane IDs
2. Excludes the `team-lead` member from the status list
3. Determines each member's status as `'running'` or `'idle'` based on `member.isActive` (defaults to `true` if undefined)
4. Validates `backendType` against `isPaneBackend()` before including it
5. Marks panes as hidden if their `tmuxPaneId` is in the team file's `hiddenPaneIds` array

## Exports
- `TeamSummary` - type with `name`, `memberCount`, `runningCount`, `idleCount` fields
- `TeammateStatus` - type with detailed per-teammate info: name, agentId, agentType, model, prompt, status (`'running' | 'idle' | 'unknown'`), color, idleSince, tmuxPaneId, cwd, worktreePath, isHidden, backendType, mode
- `getTeammateStatuses(teamName)` - returns an array of `TeammateStatus` for all non-lead team members; returns empty array if team file doesn't exist

## Source
`teamDiscovery`
