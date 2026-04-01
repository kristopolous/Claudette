## Purpose
An interactive selection component that allows users to assign a specific theme color to an agent or opt for automatic color assignment.

## Imports
- **Stdlib**: None
- **External**: `figures`, `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `tools/AgentTool/agentColorManager`, `utils/stringUtils`

## Logic
1. **Option Definition**: Provides a predefined list of color options (e.g., red, green, blue) sourced from a central color manager, plus a special "Automatic" option.
2. **Keyboard Interaction**:
    - Uses up/down arrow keys to cycle through the color list with wrapping behavior.
    - Uses the "return" key to confirm the selection.
3. **Live Preview**: Displays a real-time visualization of the agent's name (formatted as `@name`) using the currently highlighted color, allowing the user to see the visual impact before confirming.
4. **Visual Rendering**:
    - Each option displays a color swatch alongside its capitalized name.
    - Uses inverse text colors for contrast where necessary.
    - Employs a pointer figure and bold text to indicate the current selection.
5. **Selection Result**: Returns the specific color name on confirmation, or `undefined` if "Automatic" is chosen, signaling the system to use its default assignment logic.

## Exports
- `ColorPicker` - A functional component that renders the color selection interface and preview.
