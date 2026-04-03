## Purpose
Renders task assignment messages between teammates with cyan-bordered display showing task ID, assigner, subject, and description.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: ink (Box, Text), teammateMailbox utils

## Logic
1. Displays task header with task ID and assigner in cyan color
2. Shows the task subject in bold
3. Optionally renders the description in dimmed color if present
4. Wraps everything in a rounded cyan border box

## Exports
- `TaskAssignmentDisplay` - UI component rendering a task assignment with cyan border
- `tryRenderTaskAssignmentMessage` - Parses raw content and renders if it matches task assignment format, returns null otherwise
- `getTaskAssignmentSummary` - Returns a brief summary string for a task assignment, or null if not a task assignment
