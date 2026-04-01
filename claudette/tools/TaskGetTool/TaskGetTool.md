## Purpose
Implements the TaskGet tool that retrieves task details by ID from the task list, including subject, description, status, and dependency information.

## Imports
- **Stdlib**: None
- **External**: `zod/v4`
- **Internal**: `Tool`, `utils/lazySchema`, `utils/tasks`, `TaskGetTool/constants`, `TaskGetTool/prompt`

## Logic
Defines input and output schemas using zod with lazy evaluation. The tool takes a task ID and retrieves the full task object including subject, description, status, blocks, and blockedBy fields. Maps the result to a formatted text block showing task details and dependencies. Checks if TodoV2 is enabled before allowing tool use. Returns null task when not found.

## Exports
- `Output` - TypeScript type for the tool's output schema
- `TaskGetTool` - the complete tool definition built via buildTool with call implementation, result mapping, and metadata
