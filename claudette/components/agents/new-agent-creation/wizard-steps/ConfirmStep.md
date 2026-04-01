## Purpose
The final summary and confirmation view for the agent creation wizard, providing a comprehensive overview of the agent's configuration and facilitating the final save actions.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `keybindings/useKeybinding`, `memdir/paths`, `Tool`, `tools/AgentTool/agentMemory`, `tools/AgentTool/loadAgentsDir`, `utils/format`, `utils/model/agent`, `components/ConfigurableShortcutHint`, `components/design-system/Byline`, `components/design-system/KeyboardShortcutHint`, `components/wizard`, `components/wizard/WizardDialogLayout`, `components/agents/agentFileUtils`, `components/agents/validateAgent`, `components/agents/new-agent-creation/types`

## Logic
1. **Configuration Summary**: Aggregates and displays all attributes of the new agent:
    - **Identity**: Name/identifier and the relative filesystem path where it will be saved.
    - **Capabilities**: Formatted list of assigned tools and the chosen reasoning model.
    - **Persistence**: Long-term memory scope (if enabled).
    - **Behavior**: Truncated previews of the "When to Use" description and the system prompt.
2. **Validation and Safety**:
    - Runs a validation check against the current tools and existing agents to detect errors (e.g., name collisions) or warnings.
    - Displays validation feedback directly in the summary view to prevent saving invalid configurations.
3. **Interactive Finalization**:
    - Supports multiple completion paths: "Save" (via `s` or `Enter`) and "Save and Edit" (via `e`), which persists the agent and opens it for manual fine-tuning.
    - Provides a "Back" action (via `Esc`) to return to previous steps for corrections.
4. **CLI-Optimized Formatting**: Uses specialized utilities to truncate text for terminal width constraints and to format tool lists with correct natural language punctuation.
5. **Error Reporting**: Displays any persistence-level errors passed down from the parent wrapper (e.g., filesystem permission issues).

## Exports
- `ConfirmStep` - A functional component that provides the final review screen and execution triggers for the agent creation workflow.
