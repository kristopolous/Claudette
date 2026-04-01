## Purpose
An interactive menu-driven editor for modifying agent configurations, allowing users to update tools, models, colors, or open the source file in an external editor.

## Imports
- **Stdlib**: None
- **External**: `chalk`, `figures`, `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `state/AppState`, `keybindings/useKeybinding`, `Tool`, `tools/AgentTool/agentColorManager`, `tools/AgentTool/loadAgentsDir`, `utils/promptEditor`, `components/agents/agentFileUtils`, `components/agents/ColorPicker`, `components/agents/ModelSelector`, `components/agents/ToolSelector`, `components/agents/utils`

## Logic
1. **Mode Management**: Uses a state machine to switch between the main selection menu and specific sub-editors (`edit-tools`, `edit-color`, `edit-model`).
2. **File Editing**: Provides a bridge to launch an external text editor for the agent's definition file, allowing for deep configuration changes.
3. **Persistence**:
    - When changes are confirmed, it updates the physical agent definition file on disk.
    - Synchronizes the application's global state to reflect updates immediately in the UI without requiring a full restart.
    - Specifically handles color persistence via a dedicated manager.
4. **Validation**: Restricts editing capabilities to custom or plugin-based agents, preventing modifications to built-in system agents.
5. **Navigation**: Implements keyboard-based menu navigation (up/down/return) and handles "escape" to either return to the main menu or exit the editor.
6. **Error Handling**: Captures and displays errors during file operations or state updates.

## Exports
- `AgentEditor` - A functional component that provides the interactive interface for agent modification.
