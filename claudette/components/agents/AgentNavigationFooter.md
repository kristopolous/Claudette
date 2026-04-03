## Purpose
A UI footer component that provides contextual navigation instructions and handles termination/exit confirmation messaging within the agent management interface.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., REACT), `ui-components` (e.g., ink)
- **Internal**: `hooks/useExitOnCtrlCDWithKeybindings`

## Logic
1. **Instruction Display**: Shows a configurable or default set of instructions for common CLI navigation actions (e.g., arrow keys for movement, Enter for selection, Esc for back).
2. **Exit Interception**: Monitors the application's exit state. If a termination sequence is initiated (e.g., via a keyboard shortcut), the footer dynamically replaces its navigation hints with a prompt to confirm the exit (e.g., "Press Ctrl+C again to exit").
3. **Visual Feedback**: Renders text in a dimmed style to provide secondary information without distracting from the main interaction area.

## Exports
- `AgentNavigationFooter` - A functional component that renders the contextual helper text at the bottom of the screen.
