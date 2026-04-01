# utils/settings/validation

## Purpose
Provides settings validation error formatting and utilities.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: services mcp types, JSON utils, stringUtils, settings permissionValidation/schemaOutput/types/validationTips

## Logic
1. `FieldPath` - field path in dot notation (e.g., "permissions.defaultMode", "env.DEBUG")
2. `ValidationError` - { file, path, message, expected, invalidValue, suggestion, docLink, mcpErrorMetadata }
3. `mcpErrorMetadata` - { scope, serverName, severity } for MCP-specific errors
4. `SettingsWithErrors` - { settings, errors }
5. `isInvalidTypeIssue`, `isInvalidValueIssue`, `isUnrecognizedKeysIssue`, `isTooSmallIssue` - Zod issue type guards
6. Zod v4 issue types have different structures than v3
7. `formatZodError` - formats Zod validation error into human-readable validation errors
8. `formatZodIssue` - formats single Zod issue
9. `formatInvalidTypeIssue` - formats invalid type issue
10. `formatInvalidValueIssue` - formats invalid value issue
11. `formatUnrecognizedKeysIssue` - formats unrecognized keys issue
12. `formatTooSmallIssue` - formats too small issue
13. `validatePermissionRule` - validates permission rule
14. `generateSettingsJSONSchema` - generates settings JSON schema
15. `getValidationTip` - gets validation tip for error
16. `jsonParse` - JSON parse
17. `plural` - pluralize string
18. `SettingsSchema` - settings schema
19. `SettingsJson` - settings JSON type

## Exports
- `FieldPath` - field path type
- `ValidationError` - validation error type
- `SettingsWithErrors` - settings with errors type
- `formatZodError` - formats Zod error
- `formatZodIssue` - formats Zod issue
- `formatInvalidTypeIssue` - formats invalid type issue
- `formatInvalidValueIssue` - formats invalid value issue
- `formatUnrecognizedKeysIssue` - formats unrecognized keys issue
- `formatTooSmallIssue` - formats too small issue
- `validatePermissionRule` - validates permission rule
- `generateSettingsJSONSchema` - generates JSON schema
- `getValidationTip` - gets validation tip
