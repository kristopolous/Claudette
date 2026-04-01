## Purpose
A UI module that allows users to enable or disable the inference provider's "extended thinking" capabilities for the current session, including safety checks for mid-conversation state changes.

## Imports
- **Internal**: 
    - UI: `ink`, `ConfigurableShortcutHint`, `CustomSelect/index`, `design-system/Byline`, `design-system/KeyboardShortcutHint`, `design-system/Pane`
    - Hooks/State: `hooks/useExitOnCtrlCDWithKeybindings`, `keybindings/useKeybinding`

## Logic
1. **Mode Selection**: Provides a binary choice ("Enabled" or "Disabled") to control whether the inference provider should perform internal reasoning steps before generating a response.
2. **Conversation Safety**:
    - **Initial State**: If the toggle is used at the start of a session, the selection is applied immediately.
    - **Mid-Conversation Guard**: If the user attempts to toggle thinking during an active conversation, the module interrupts with a warning about potential latency increases and quality regressions, requiring explicit confirmation before proceeding.
3. **Confirmation Workflow**: Manages an internal "pending" state to handle the transition between selection and final application, ensuring users are fully aware of the consequences of changing reasoning modes mid-stream.
4. **Navigation and Exit**:
    - Integrates with standard keyboard shortcuts (Enter to confirm, Esc to cancel/exit).
    - Includes specialized "double-tap to exit" logic (Ctrl+C/D) to ensure users don't accidentally terminate the application while interacting with the toggle.

## Exports
- `ThinkingToggle` - The primary component for managing the session's reasoning mode configuration.
