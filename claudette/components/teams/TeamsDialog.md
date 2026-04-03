# components/teams/TeamsDialog

## Purpose
Provides teams dialog component for viewing and managing team members.

## Imports
- **Stdlib**: `crypto`
- **External**: `figures`, REACT, REACT_COMPILER, `usehooks-ts`
- **Internal**: context overlayContext, ink stringWidth, ink, keybindings useKeybinding/useShortcutDisplay, state AppState, Tool, AgentTool agentColorManager, debug, execFileNoThrow, format, permissions getNextPermissionMode/PermissionMode, JSON utils, swarm backends detection/registry/types, swarm constants/teamHelpers, tasks, teamDiscovery, teammateMailbox, design-system Dialog/ThemedText

## Logic
1. `Props` - { initialTeams?, onDone }
2. `DialogLevel` - { type: 'teammateList', teamName } | { type: 'teammateDetail', teamName, memberName }
3. `TeamsDialog` - UI component for team management
4. Uses useRegisterOverlay to register as overlay (prevents CancelRequestHandler intercept)
5. initialTeams derived from teamContext in PromptInput (no filesystem I/O)
6. Uses useSetAppState for state updates
7. Initializes dialogLevel with first team name if available
8. Uses useState for selectedIndex, refreshKey
9. Gets teammateStatuses via getTeammateStatuses (memoized with dialogLevel.teamName, refreshKey)
10. Uses useInterval to periodically refresh (1000ms) for mode changes
11. Gets currentTeammate via useMemo
12. Uses useInput for keyboard navigation (j/k/arrows)
13. Uses useKeybindings for keyboard shortcuts
14. Uses useShortcutDisplay for shortcut display
15. Renders Dialog with teammate list or detail view
16. Shows teammate status, mode, color
17. Handles mode changes via setMemberMode, setMultipleMemberModes
18. Handles teammate removal via removeMemberFromTeam
19. Handles hidden pane management via addHiddenPaneId, removeHiddenPaneId
20. Handles task unassignment via unassignTeammateTasks
21. Handles mailbox communication via sendShutdownRequestToMailbox, writeToMailbox, createModeSetRequestMessage
22. Handles backend registration via ensureBackendsRegistered, getBackendByType, getCachedBackend
23. Handles tmux detection via isInsideTmuxSync, IT2_COMMAND, TMUX_COMMAND
24. `randomUUID` - generates random UUID
25. `stringWidth` - gets string width
26. `Box`, `Text`, `useInput` - ink components/hooks
27. `useAppState`, `useSetAppState` - state hooks
28. `getEmptyToolPermissionContext` - gets empty tool permission context
29. `AGENT_COLOR_TO_THEME_COLOR` - agent color mapping
30. `logForDebugging` - debug logging
31. `execFileNoThrow` - executes file without throwing
32. `truncateToWidth` - truncates to width
33. `getNextPermissionMode` - gets next permission mode
34. `getModeColor`, `PermissionMode`, `permissionModeFromString`, `permissionModeSymbol` - permission mode utilities
35. `jsonStringify` - JSON stringify
36. `IT2_COMMAND`, `isInsideTmuxSync` - tmux detection
37. `ensureBackendsRegistered`, `getBackendByType`, `getCachedBackend` - backend utilities
38. `PaneBackendType` - pane backend type
39. `getSwarmSocketName`, `TMUX_COMMAND` - swarm constants
40. `addHiddenPaneId`, `removeHiddenPaneId`, `removeMemberFromTeam`, `setMemberMode`, `setMultipleMemberModes` - team helpers
41. `listTasks`, `Task`, `unassignTeammateTasks` - task utilities
42. `getTeammateStatuses`, `TeammateStatus`, `TeamSummary` - team discovery utilities
43. `createModeSetRequestMessage`, `sendShutdownRequestToMailbox`, `writeToMailbox` - mailbox utilities
44. `Dialog`, `ThemedText` - design system components

## Exports
- `TeamsDialog` - teams dialog component
