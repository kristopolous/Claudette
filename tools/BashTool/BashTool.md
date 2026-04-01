# BashTool

## Purpose
Implements a shell command execution tool with sandboxing, permission checking, progress reporting, auto-backgrounding, and output handling.

## Items

### isSearchOrReadBashCommand
**Purpose**: Determines if a bash command is a search or read operation for UI collapsing.
**Logic**: Parses command into parts using `splitCommandWithOperators`, then checks if all non-neutral parts match search commands (`find`, `grep`, etc.), read commands (`cat`, `head`, etc.), or list commands (`ls`, `tree`, etc.). Semantic-neutral commands (`echo`, `printf`, `true`, `false`, `:`) are skipped in any position. Returns `{isSearch, isRead, isList}`.

### isSilentBashCommand
**Purpose**: Checks if a command is expected to produce no stdout on success.
**Logic**: Parses command parts and checks if all non-fallback commands are in `BASH_SILENT_COMMANDS` (`mv`, `cp`, `rm`, `mkdir`, etc.).

### isAutobackgroundingAllowed
**Purpose**: Determines if a command can be automatically backgrounded.
**Logic**: Returns `false` only for commands in `DISALLOWED_AUTO_BACKGROUND_COMMANDS` (currently just `sleep`).

### detectBlockedSleepPattern
**Purpose**: Detects standalone `sleep N` patterns that should use Monitor instead.
**Logic**: Matches `sleep N` (where N >= 2) as first subcommand. Float durations are allowed. Returns description string if blocked, null otherwise.

### applySedEdit
**Purpose**: Applies a simulated sed edit directly without running sed.
**Logic**: Used by permission dialogs to ensure the preview matches exactly what gets written. Reads original file, detects encoding/line endings, writes new content via `writeTextContent`, notifies VS Code, updates read file state, and tracks file history for undo.

### BashTool
**Purpose**: Main tool definition that satisfies `ToolDef<InputSchema, Out, BashProgress>`.
**Logic**: Built with `buildTool()`. Key methods:
- `isReadOnly`: Checks `checkReadOnlyConstraints` and `commandHasAnyCd`
- `preparePermissionMatcher`: Parses command for security, matches against permission patterns
- `validateInput`: Blocks `sleep N` patterns in favor of Monitor tool
- `mapToolResultToToolResultBlockParam`: Formats output for model, handles images, large output persistence
- `call`: Main execution - handles sed simulation, runs shell command generator, interprets results, handles backgrounding

### runShellCommand
**Purpose**: Async generator that executes a shell command with progress reporting.
**Logic**:
1. Sets up auto-backgrounding on timeout if allowed
2. Creates assistant-mode auto-background timer (15s budget)
3. Honors explicit `run_in_background` requests
4. After 2s threshold, starts progress loop with foreground task registration
5. Polls output via `TaskOutput.startPolling`
6. Handles Ctrl+B backgrounding, timeout backgrounding, and assistant auto-backgrounding
7. Yields progress updates, returns final `ExecResult`

## Imports
- **Stdlib**: `fs/promises` (copyFile, stat, truncate, link), `React`
- **External**: `@anthropic-ai/sdk` (ToolResultBlockParam), `zod` (v4)
- **Internal**: `src/hooks/useCanUseTool`, `src/state/AppState`, `src/Tool`, `src/tasks/LocalShellTask`, `src/utils/*`, `src/bootstrap/state`, `src/services/analytics`, `src/services/mcp/vscodeSdkMcp`, `src/types/*`, `src/constants/*`

## Insights
- Uses async generator pattern to stream progress updates while awaiting command completion
- Auto-backgrounding is sophisticated: respects `sleep` blacklist, has assistant-mode budget (15s), supports Ctrl+B
- Large output (>64MB) is truncated after copying to tool-results dir
- Claudette hints protocol uses stderr as zero-token side channel for plugin recommendations
- Simulated sed edit bypasses actual sed to guarantee preview matches execution
- Compound commands parsed for security hooks ensure `ls && git push` triggers `Bash(git *)` hook

## Exports
- `BashTool` - main tool definition
- `BashToolInput` - input schema type (from fullInputSchema)
- `Out` - output schema type
- `isSearchOrReadBashCommand` - utility for UI classification
- `detectBlockedSleepPattern` - sleep pattern detector
- `BashProgress` - re-exported from centralized types
