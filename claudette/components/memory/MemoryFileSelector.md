# components/memory/MemoryFileSelector

## Purpose
Provides memory file selector component for choosing memory files.

## Imports
- **Stdlib**: `fs/promises`, `path`
- **External**: BUILDFLAGS, `chalk`, `react`, `react/compiler-runtime`
- **Internal**: bootstrap state, hooks useExitOnCtrlCDWithKeybindings, ink, keybindings useKeybinding, memdir paths, analytics, autoDream config/consolidationLock, state AppState, AgentTool agentMemory, browser, claudemd, envUtils, file, format, memory versions, settings settings, CustomSelect index, design-system ListItem

## Logic
1. `ExtendedMemoryFileInfo` - MemoryFileInfo with isNested?, exists
2. `lastSelectedPath` - remembers last selected path
3. `OPEN_FOLDER_PREFIX` - '__open_folder__'
4. `Props` - { onSelect, onCancel }
5. `MemoryFileSelector` - React component for memory file selection
6. Uses React compiler runtime (_c) for memoization
7. Gets existing memory files via use(getMemoryFiles())
8. Creates userMemoryPath (~/.claude/CLAUDE.md) and projectMemoryPath (cwd/CLAUDE.md)
9. Checks hasUserMemory and hasProjectMemory
10. Builds allMemoryFiles array with existing files + placeholders for missing user/project memory
11. Calculates depths for nested files
12. Creates memoryOptions with display paths, exists labels, depth-based indentation
13. Labels: "User memory", "Project memory", or indented nested paths
14. Uses Select component for file selection
15. Handles OPEN_FOLDER_PREFIX for opening folder in editor
16. Uses useKeybinding for keyboard shortcuts
17. Uses useExitOnCtrlCDWithKeybindings for exit on Ctrl+C
18. `getAutoMemPath`, `isAutoMemoryEnabled` - auto memory functions
19. `logEvent` - logs analytics event
20. `isAutoDreamEnabled` - checks auto dream enabled
21. `readLastConsolidatedAt` - reads last consolidated at
22. `getAgentMemoryDir` - gets agent memory directory
23. `openPath` - opens path in system
24. `getMemoryFiles`, `MemoryFileInfo` - memory file functions
25. `getClaudeConfigHomeDir` - gets config home directory
26. `getDisplayPath` - gets display path
27. `formatRelativeTimeAgo` - formats relative time
28. `projectIsInGitRepo` - checks if project in git repo
29. `updateSettingsForSource` - updates settings for source

## Exports
- `MemoryFileSelector` - memory file selector component
