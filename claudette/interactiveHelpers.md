# interactiveHelpers

## Purpose
Provides helper functions for Ink rendering, dialog display, and graceful exit with messages.

## Imports
- **Stdlib**: `fs`
- **External**: BUILDFLAGS, REACT
- **Internal**: analytics, gracefulShutdown, bootstrap state, commands, stats context, systemContext, init entrypoints, ink terminal/components, keybindings, main, GrowthBook, API/services, MCP, state, authPortable, config, deepLink, envUtils, fpsTracker, githubRepoPathMapping, managedEnv, permissions, renderOptions, settings utils

## Logic
1. `completeOnboarding` - saves onboarding completion flag and version
2. `showDialog` - renders dialog JSX and returns promise for result
3. `exitWithError` - renders error message through Ink then exits (Ink swallows console.error)
4. `exitWithMessage` - renders message through Ink then exits with optional beforeExit hook
5. Uses Text component for colored output
6. Unmounts root before process.exit to ensure clean shutdown
7. Supports custom exit codes and pre-exit async operations

## Exports
- `completeOnboarding` - marks onboarding complete
- `showDialog` - shows dialog and returns promise for result
- `exitWithError` - exits with error message rendered through Ink
- `exitWithMessage` - exits with message rendered through Ink
