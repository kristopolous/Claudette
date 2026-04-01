## Purpose
Provides a testing-only tool that always triggers a permission dialog when invoked by the model, used for end-to-end testing of permission flows.

## Imports
- **Stdlib**: None
- **External**: `zod/v4`
- **Internal**: `Tool`, `buildTool`, `ToolDef`, `lazySchema`

## Logic
Defines a test tool named "TestingPermission" that is only enabled in test environments. When called, it always returns a permission request with `behavior: 'ask'`, forcing a permission dialog. The tool returns a success message on execution and maps results to tool result blocks. All render methods return null since this is testing-only.

## Exports
- `TestingPermissionTool` - a tool that always asks for permission before executing, used for end-to-end testing
