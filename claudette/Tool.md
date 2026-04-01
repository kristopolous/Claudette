# Tool

## Purpose
Defines the core Tool interface and tool registry for Claudette.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: Tool types, tool registry, tool execution context

## Logic
1. `Tool` interface - name, description, input_schema, execute function
2. Tool registry maps tool names to implementations
3. `ToolUseContext` - execution context with permissions, state, callbacks
4. Built-in tools: Bash, Read, Write, Edit, Glob, Grep, WebFetch, etc.
5. Tool execution flow: permission check → executor → result
6. Tool results wrapped as tool_result messages
7. Supports MCP tools discovered dynamically
8. Tool permission context tracks mode and rules
9. Empty tool permission context for headless mode
10. Tool search and read info extraction

## Exports
- `Tool` - core tool interface
- `Tools` - tool registry type
- `ToolUseContext` - tool execution context type
- `getEmptyToolPermissionContext` - creates empty permission context
- `findToolByName` - finds tool by name in registry
- (Tool registry and execution functions)
