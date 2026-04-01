# useTypeahead

## Purpose
Comprehensive typeahead/autocomplete system handling commands, files, paths, shell completions, team members, and Slack channels.

## Imports
- **Stdlib**: `useCallback`, `useEffect`, `useMemo`, `useRef`, `useState` from 'react'
- **External**: `useDebounceCallback` from 'usehooks-ts'
- **Internal**: `useNotifications`, `Text`, `logEvent`, `Command`, `getCommandName`, `getModeFromInput`, `getValueFromInput`, `SuggestionItem`, `SuggestionType`, `useIsModalOverlayActive`, `useRegisterOverlay`, `KeyboardEvent`, `useInput`, `useOptionalKeybindingContext`, `useRegisterKeybindingContext`, `useKeybindings`, `useShortcutDisplay`, `useAppState`, `useAppStateStore`, `AgentDefinition`, `InlineGhostText`, `PromptInputMode`, `isAgentSwarmsEnabled`, `generateProgressiveArgumentHint`, `parseArguments`, `getShellCompletions`, `formatLogMetadata`, `getSessionIdFromLog`, `searchSessionsByCustomTitle`, `applyCommandSuggestion`, `findMidInputSlashCommand`, `generateCommandSuggestions`, `getBestCommandMatch`, `isCommandInput`, `getDirectoryCompletions`, `getPathCompletions`, `isPathLikeToken`, `getShellHistoryCompletion`, `getSlackChannelSuggestions`, `hasSlackMcpServer`, `applyFileSuggestion`, `findLongestCommonPrefix`, `startBackgroundCacheRefresh`, `generateUnifiedSuggestions`

## Logic
1. Handles multiple suggestion types: command, file, directory, shell, agent (@mentions), slack-channel (#), custom-title (/resume)
2. Uses debounced async fetching for file/resource suggestions
3. Maintains inline ghost text for bash history and mid-input slash commands
4. Registers autocomplete overlay to handle ESC deferral to running tasks
5. Supports keyboard navigation (Tab, Enter, arrows, Ctrl+N/P)
6. Pre-warms file index on mount for faster first @ mention

## Exports
- `useTypeahead` - Hook returning suggestions, selection state, ghost text, handleKeyDown
- `extractSearchToken` - Extract search token from completion token
- `formatReplacementValue` - Format replacement with proper @/quotes
- `applyShellSuggestion` - Apply shell completion suggestion
- `applyDirectorySuggestion` - Apply directory suggestion
- `extractCompletionToken` - Extract completable token at cursor
