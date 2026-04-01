## Purpose
Defines the SyntheticOutputTool for returning structured output in a specified JSON schema format, with schema validation and caching.

## Imports
- **Stdlib**: None
- **External**: `ajv`, `zod/v4`
- **Internal**: `Tool`, `ToolInputJSONSchema`, `buildTool`, `ToolDef`, `TelemetrySafeError_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS`, `lazySchema`, `PermissionResult`, `jsonStringify`

## Logic
Builds a tool that validates input against a dynamically provided JSON schema using Ajv. The tool caches schema-compiled tools by object identity to avoid repeated Ajv compilation overhead. On invocation, it validates the input against the schema and throws on mismatch, otherwise returns the structured output. Permissions are always auto-allowed since the tool only returns data. Includes minimal UI rendering implementations for non-interactive SDK/CLI use.

## Exports
- `Output` - inferred type for the string output
- `SYNTHETIC_OUTPUT_TOOL_NAME` - the string identifier for the tool
- `isSyntheticOutputToolEnabled` - checks if the tool should be enabled based on session interactivity
- `SyntheticOutputTool` - the base tool definition with schema validation and rendering
- `createSyntheticOutputTool` - creates a schema-configured tool instance with identity-based caching, returns `{tool}` or `{error}`
