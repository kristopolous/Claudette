# BashTool/UI.tsx

## Purpose

Renders terminal UI for BashTool, displaying command execution progress, results, errors, and background task management. Includes special handling for sed in-place edits (display file path only), command truncation, and a background tasks hint with keybinding.

## Imports

- **Stdlib**: React compiler runtime (`_c`), process
- **External**: `ToolResultBlockParam` type from Anthropic SDK
- **Internal**:
  - Components: `KeyboardShortcutHint`, `FallbackToolUseErrorMessage`, `MessageResponse`, `ShellProgressMessage`
  - UI: `Box`, `Text` from `ink.js`
  - State: `useAppStateStore`, `useSetAppState`
  - Tasks: `backgroundAll` from LocalShellTask
  - Types: `Tool`, `ProgressMessage`, `ThemeName`
  - Utils: `env`, `isEnvTruthy`, `getDisplayPath`, `isFullscreenEnvEnabled`
  - Related Tool: `BashTool` types (`BashProgress`, `BashToolInput`, `Out`)
  - Components: `BashToolResultMessage` (custom result renderer)
  - Helpers: `extractBashCommentLabel`, `parseSedEditCommand`

## Logic

**Constants**:
- `MAX_COMMAND_DISPLAY_LINES = 2`
- `MAX_COMMAND_DISPLAY_CHARS = 160`

**Components**:
- `BackgroundHint(t0)`: Shows interactive hint to background tasks (Ctrl+B). Uses `useKeybinding("task:background")` to call `backgroundAll`. Adjusts shortcut for tmux (`ctrl+b ctrl+b`). Hidden if `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` truthy. Renders dimmed `KeyboardShortcutHint` with "run in background" action.

**Functions**:
- `renderToolUseMessage(input, {verbose})`:
  - If no command: null
  - If sed in-place edit (`parseSedEditCommand` returns info): returns file path (display or raw)
  - Non-verbose: truncates command to 2 lines and/or 160 chars; adds ellipsis. If fullscreen env enabled, tries to extract a label from comment (`extractBashCommentLabel`) and uses that if available.
  - Verbose: returns full command string
- `renderToolUseProgressMessage(progressMessages, options)`:
  - If no progress data: returns dimmed "Running…"
  - Otherwise renders `ShellProgressMessage` with fullOutput, output, elapsed time, total lines/bytes, timeout, taskId, verbose
- `renderToolUseQueuedMessage()`: Returns dimmed "Waiting…"
- `renderToolResultMessage(content, progressMessages, options)`:
  - Delegates to `BashToolResultMessage` component with content, verbose, and timeoutMs from last progress
- `renderToolUseErrorMessage(result, options)`:
  - Uses `FallbackToolUseErrorMessage` for error rendering

## Exports

- `BackgroundHint(props: {onBackground?: () => void}): React.ReactNode`
- `renderToolUseMessage(input: Partial<BashToolInput>, options: {verbose: boolean; theme: ThemeName}): React.ReactNode`
- `renderToolUseProgressMessage(progressMessages: ProgressMessage<BashProgress>[], options: {tools: Tool[]; verbose: boolean; terminalSize?: {columns: number; rows: number}; inProgressToolCallCount?: number}): React.ReactNode`
- `renderToolUseQueuedMessage(): React.ReactNode`
- `renderToolResultMessage(content: Out, progressMessages: ProgressMessage<BashProgress>[], options: {verbose: boolean; theme: ThemeName; tools: Tool[]; style?: 'condensed'}): React.ReactNode`
- `renderToolUseErrorMessage(result: ToolResultBlockParam['content'], options: {verbose: boolean; progressMessages: ProgressMessage<BashProgress>[]; tools: Tool[]}): React.ReactNode`
