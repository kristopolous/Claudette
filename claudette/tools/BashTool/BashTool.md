# tools/BashTool/BashTool

## Purpose
Implements a shell command execution tool with sandboxing, permission checking, progress reporting, auto-backgrounding, and output handling.

## Imports
- **Stdlib**: `fs/promises` (copyFile, stat, truncate, link)
- **External**: `@anthropic-ai/sdk`, `zod/v4`, REACT
- **Internal**: bootstrap state, tool limits, analytics, MCP vscodeSdkMcp, Tool, LocalShellTask, various utils (bash/ast, bash/commands, claudeCodeHints, codeIndexing, envUtils, errors, file, fileHistory, format, fsOperations, lazySchema, path, permissions, plugins, Shell, sandbox, semanticBoolean/number, stringUtils, task/diskOutput, TaskOutput, terminal, toolResultStorage), FileEditTool UI, gitOperationTracking, bashPermissions, commandSemantics, prompt, readOnlyValidation, sedEditParser, shouldUseSandbox, toolName, UI, utils

## Logic
1. Defines constants for progress thresholds, command classification (search, read, list, silent), and semantic-neutral commands
2. `isSearchOrReadBashCommand` - classifies commands as search/read/list for UI collapsing
3. `detectBlockedSleepPattern` - detects standalone `sleep N` that should use Monitor tool
4. `applySedEdit` - applies simulated sed edit directly without running sed (used in permission dialogs)
5. `BashTool` is built with `buildTool()`:
   - `isReadOnly` combines read-only constraint check and cd detection
   - `preparePermissionMatcher` parses command for security and matches permission patterns
   - `validateInput` blocks sleep N patterns
   - `mapToolResultToToolResultBlockParam` formats output, handles images, large output persistence
   - `call` main execution: handles sed simulation, runs shell command generator, interprets results, handles backgrounding
6. `runShellCommand` async generator executes shell command with progress: auto-backgrounding on timeout, assistant-mode budget, explicit background requests, foreground task registration, output polling, Ctrl+B handling
7. Supports large output truncation (>64MB) with persistence to tool-results dir
8. Sandboxing via SandboxManager
9. Git operation tracking
10. VS Code file update notifications

## Exports
- `BashTool` - main tool definition
- `BashToolInput` - input schema type
- `Out` - output schema type
- `BashProgress` - progress type (re-export)
- `isSearchOrReadBashCommand` - command classification utility
- `detectBlockedSleepPattern` - sleep pattern detector
