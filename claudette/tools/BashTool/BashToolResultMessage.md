# tools/BashTool/BashToolResultMessage

## Purpose
React component that renders the result of a Bash tool execution, displaying stdout, stderr (with sandbox violations stripped), images, and status messages.

## Imports
- **Stdlib**: None
- **External**: `react` (`c` for compiler runtime)
- **Internal**:
  - `utils/sandbox/sandbox-ui-utils` - `removeSandboxViolationTags`
  - `components/design-system/KeyboardShortcutHint` - `KeyboardShortcutHint`
  - `components/MessageResponse` - `MessageResponse`
  - `components/shell/OutputLine` - `OutputLine`
  - `components/shell/ShellTimeDisplay` - `ShellTimeDisplay`
  - `ink` - `Box`, `Text`

## Logic
- Props: `{ content: Omit<BashOut, 'interrupted'>, verbose: boolean, timeoutMs?: number }`
- Unpacks `stdout`, `stderr`, `isImage`, `returnCodeInterpretation`, `noOutputExpected`, `backgroundTaskId`.
- Extracts sandbox violations from stderr via `<sandbox_violations>...</sandbox_violations>` tags and removes them.
- Extracts "Shell cwd was reset to ..." warning from stderr and displays it separately.
- If `isImage`: renders `[Image data detected and sent to Claude]`.
- Otherwise, renders a `Box` (flex column) containing:
  - `OutputLine` for `stdout` (if non-empty).
  - `OutputLine` for cleaned `stderr` with `isError=true` (if non-empty after trim).
  - CWD reset warning in dim text, if present.
  - Fallback message when no output: either background task hint (with down arrow shortcut), `returnCodeInterpretation`, or `(No output)`.
  - `ShellTimeDisplay` if `timeoutMs` is provided.
- Uses React compiler caching (`_c`) for memoization; early return pattern for branches.

## Exports
- Default export: `BashToolResultMessage` React component (type `Props` implicitly exported via JSX)
