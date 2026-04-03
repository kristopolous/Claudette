## Purpose
Displays a message indicating that the user rejected a proposed plan, showing the plan content in a bordered markdown block.

## Imports
- **External**: REACT
- **Internal**: `components/Markdown`, `components/MessageResponse`, `ink`

## Logic
Renders a subtle text label stating that the user rejected the plan, followed by the plan content displayed inside a rounded-border box with plan-mode coloring, using the Markdown component for rendering.

## Exports
- `RejectedPlanMessage` - renders a user-rejected plan notification with the plan content formatted as markdown
