# Doctor

## Purpose
Implements the doctor diagnostic screen that checks system health, installation status, and configuration issues.

## Imports
- **Stdlib**: `path`
- **External**: `react/compiler-runtime`, `figures`, `react`
- **Internal**: Keybinding/MCP parsing warnings, context utils, envUtils, settings, bootstrap state, commands, design-system Pane, PressEnterToContinue, SandboxDoctor, ValidationErrorsList, hooks, ink components, keybindings, state, plugin types, autoUpdater, doctor diagnostics/warnings, envValidation, file utils, nativeInstaller locks, settings, shell/task output limits, xdg utils

## Logic
1. `DistTagsDisplay` - shows npm dist tags (latest/stable) fetched async
2. Runs comprehensive diagnostic checks on startup
3. Checks sandbox configuration and issues
4. Validates environment variables with bounded int checks
5. Detects stale PID-based locks and offers cleanup
6. Shows agent configuration (active agents, dirs, failed files)
7. Displays version information from npm
8. Handles settings errors and validation issues
9. Shows keybinding and MCP parsing warnings
10. Provides fix suggestions for detected issues

## Exports
- `Doctor` - React component for diagnostic screen
