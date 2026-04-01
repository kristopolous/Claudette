## Purpose
Renders a user's implementation plan in a bordered box with plan-mode styling.

## Imports
- **Stdlib**: None
- **External**: react
- **Internal**: ink (Box, Text), Markdown

## Logic
1. Displays a bold "Plan to implement" header in plan mode color
2. Renders the plan content as Markdown inside a rounded border with plan mode color
3. Optionally adds top margin based on the addMargin prop

## Exports
- `UserPlanMessage` - React component that renders a user's plan content with plan-mode visual styling
