## Purpose
A visual component for a CLI tree-style display that shows the progress, status, and resource usage (tools/tokens) of a specific agent or sub-task.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., react), `ui-components` (e.g., ink)
- **Internal**: `utils/format`, `utils/theme`

## Logic
1. **Tree Formatting**: Determines the correct box-drawing characters (e.g., `└─` vs `├─`) based on whether the item is the last in a list.
2. **Status Resolution**: 
    - If active, shows the current tool being used or an "Initializing" message.
    - If backgrounded/resolved, shows the task description or a "Running in background" message.
    - If completed, displays "Done".
3. **Identity Display**:
    - Renders the agent type (e.g., "Researcher") with optional background colors and descriptions.
    - Supports a "hidden type" mode where only the name or description is shown.
4. **Metric Reporting**: Displays the total count of tool uses and the number of tokens consumed by the agent, formatted for readability.
5. **Visual Styling**: Uses dimmed text for inactive or resolved states and conditional coloring for error or high-priority states.

## Exports
- `AgentProgressLine` - A functional component that renders a single line of agent progress with tree-nesting artifacts.
