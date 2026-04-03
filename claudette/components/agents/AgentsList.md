## Purpose
A primary navigation component that displays a categorized, searchable, and interactive list of available agents, including built-in system agents and user-defined custom agents.

## Imports
- **Stdlib**: None
- **External**: `figures`, `ui-framework` (e.g., REACT), `ui-components` (e.g., ink)
- **Internal**: `utils/settings/constants`, `tools/AgentTool/agentDisplay`, `tools/AgentTool/loadAgentsDir`, `utils/array`, `components/design-system/Dialog`, `components/design-system/Divider`, `components/agents/utils`

## Logic
1. **Grouping and Sorting**: 
    - Categorizes agents into groups based on their source (Project-local, User-level, Global, and Built-in).
    - Sorts agents within each group alphabetically by name.
2. **Override Detection (Shadowing)**: Identifies and highlights when an agent definition in one source (e.g., a project) is overriding or "shadowing" another agent with the same name in a more global source, providing a visual warning to the user.
3. **Interactive Navigation**:
    - Implements full keyboard support for cycling through the list of agents and a "Create new agent" entry point.
    - Manages focus and selection state, using visual pointers and color changes to indicate the current selection.
4. **Onboarding and Empty States**: 
    - When no custom agents are found, it provides helpful introductory text describing how Claudette can delegate tasks to specialized subagents.
    - Suggests common agent archetypes (e.g., "Code Reviewer", "Security Reviewer") to inspire user creation.
5. **Metadata Rendering**: Displays concise agent information such as the assigned model, memory scope, and directory location for each entry.
6. **Styling and Visual Hierarchy**: Uses dividers to separate system agents from custom ones, dimmed text for overridden items, and specialized colors for active selections.

## Exports
- `AgentsList` - A functional component that renders the comprehensive list of agents within a dialog interface.
