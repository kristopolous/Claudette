# utils/settings/types

## Purpose
Provides settings schema definitions and types.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`, `zod/v4`
- **Internal**: entrypoints sandboxTypes, envUtils, lazySchema, permissions PermissionMode, plugins schemas, settings constants/permissionValidation, schemas hooks, array

## Logic
1. Re-exports hook schemas and types from centralized location for backward compatibility
2. `AgentHook`, `BashCommandHook`, `HookCommand`, `HookCommandSchema`, `HookMatcher`, `HookMatcherSchema`, `HooksSchema`, `HooksSettings`, `HttpHook`, `PromptHook` - hook types/schemas
3. `EnvironmentVariablesSchema` - schema for environment variables (record of string to string)
4. `PermissionsSchema` - schema for permissions section
5. allow, deny, ask - arrays of PermissionRuleSchema
6. defaultMode - enum of PERMISSION_MODES or EXTERNAL_PERMISSION_MODES (feature-gated)
7. disableBypassPermissionsMode - enum ['disable']
8. disableAutoMode - enum ['disable'] (TRANSCRIPT_CLASSIFIER feature-gated)
9. additionalDirectories - array of strings
10. `SandboxSettingsSchema` - sandbox settings schema
11. `isEnvTruthy` - checks env var truthy
12. `lazySchema` - lazy schema factory
13. `EXTERNAL_PERMISSION_MODES`, `PERMISSION_MODES` - permission mode constants
14. `MarketplaceSourceSchema` - marketplace source schema
15. `CLAUDE_CODE_SETTINGS_SCHEMA_URL` - settings schema URL constant
16. `PermissionRuleSchema` - permission rule schema
17. `count` - count array elements
18. `SettingsJson` - settings JSON type
19. `SettingsSchema` - main settings schema
20. `CUSTOMIZATION_SURFACES` - customization surfaces array
21. `CustomizationSurface` - customization surface type
22. `ModelOverrideConfig` - model override config type
23. `UserConfigSchema`, `UserConfigValues` - user config schema/values
24. `validateUserConfig` - validates user config
25. `McpServerConfigSchema` - MCP server config schema
26. `McpServerConfig` - MCP server config type
27. `PluginConfig` - plugin config type
28. `SettingsWithErrors` - settings with errors type

## Exports
- `EnvironmentVariablesSchema` - env vars schema
- `PermissionsSchema` - permissions schema
- `SandboxSettingsSchema` - sandbox settings schema
- `SettingsJson` - settings JSON type
- `SettingsSchema` - settings schema
- `CUSTOMIZATION_SURFACES` - customization surfaces
- `CustomizationSurface` - customization surface type
- `ModelOverrideConfig` - model override config type
- `UserConfigSchema`, `UserConfigValues` - user config schema/values
- `validateUserConfig` - validates user config
- `McpServerConfigSchema` - MCP server config schema
- `McpServerConfig` - MCP server config type
- `PluginConfig` - plugin config type
- `SettingsWithErrors` - settings with errors type
- (Hook schemas and types)
