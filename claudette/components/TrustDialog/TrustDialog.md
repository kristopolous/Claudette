# components/TrustDialog/TrustDialog

## Purpose
Provides trust dialog component for project trust acceptance.

## Imports
- **Stdlib**: `os`
- **External**: REACT, REACT_COMPILER
- **Internal**: analytics, bootstrap state, commands, hooks useExitOnCtrlCDWithKeybindings, ink, keybindings useKeybinding, MCP config, BashTool toolName, config, cwd, fsOperations, gracefulShutdown, CustomSelect index, permissions PermissionDialog, TrustDialog utils

## Logic
1. `Props` - { onDone, commands? }
2. `TrustDialog` - UI component for trust dialog
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Gets project MCP servers via getMcpConfigsByScope("project")
5. Checks hasMcpServers if project servers exist
6. Gets hooks sources via getHooksSources
7. Checks hasHooks if hooksSettingSources exist
8. Gets bash permission sources via getBashPermissionSources
9. Gets API key helper sources via getApiKeyHelperSources
10. Checks hasApiKeyHelper if apiKeyHelperSources exist
11. Gets AWS commands sources via getAwsCommandsSources
12. Gets GCP commands sources via getGcpCommandsSources
13. Gets dangerous env vars sources via getDangerousEnvVarsSources
14. Gets OTEL headers helper sources via getOtelHeadersHelperSources
15. Uses useExitOnCtrlCDWithKeybindings for exit on Ctrl+C
16. Uses useKeybinding for keyboard shortcuts
17. Uses Select component for decision selection
18. Renders PermissionDialog with trust acceptance options
19. Shows project configuration sources requiring trust
20. Calls setSessionTrustAccepted on acceptance
21. Calls saveCurrentProjectConfig to save config
22. Calls checkHasTrustDialogAccepted to check if already accepted
23. Calls gracefulShutdownSync on rejection
24. `logEvent` - logs analytics event
25. `getMcpConfigsByScope` - gets MCP configs by scope
26. `BASH_TOOL_NAME` - bash tool name constant
27. `getFsImplementation` - gets fs implementation
28. `getCwd` - gets current working directory
29. `homedir` - gets home directory

## Exports
- `TrustDialog` - trust dialog component
