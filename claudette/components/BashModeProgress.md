## Purpose
A UI component designed to display the real-time progress and output of bash commands executed within an interactive shell or "bash mode" context.

## Imports
- **Stdlib**: None
- **External**: `react`, `react/compiler-runtime`
- **Internal**: `ink`, `tools/BashTool/BashTool`, `types/tools`, `components/messages/UserBashInputMessage`, `components/shell/ShellProgressMessage`

## Logic
1. **Input Echo**: Renders the original bash command provided by the user, clearly indicating what was executed.
2. **Progress Visualization**:
    - If detailed progress information is available (via the `progress` prop), it displays:
        - Elapsed time since execution began.
        - Total number of output lines captured.
        - Full output, recent output, elapsed time, and total lines (passed through to ShellProgressMessage).
        - Verbose details if the `verbose` flag is enabled.
    - **Fallback**: If no specific progress data is provided, it defaults to a generic tool use progress message.
3. **Component Structure**: Utilizes Ink `Box` to structure the output, ensuring it integrates well within a terminal UI environment.
4. **Clarity and Context**: Provides essential feedback to the user about the ongoing execution of shell commands, including partial output and timing information.

## Exports
- `BashModeProgress` - A functional component for rendering interactive bash command progress.
