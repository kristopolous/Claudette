# utils/settings/pluginOnlyPolicy

## Purpose
Provides plugin-only customization policy enforcement utilities.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: settings settings/types

## Logic
1. `CustomizationSurface` - type for customization surfaces from CUSTOMIZATION_SURFACES
2. `isRestrictedToPluginOnly` - checks if customization surface locked to plugin-only sources
3. "Locked" means user-level (~/.claude/*) and project-level (.claude/*) sources skipped for that surface
4. Managed (policySettings) and plugin-provided sources always load regardless
5. Policy is admin-set, so managed sources already admin-controlled
6. Plugins gated separately via strictKnownMarketplaces
7. `true` locks all four surfaces; array form locks only those listed
8. Absent/undefined → nothing locked (default)
9. `ADMIN_TRUSTED_SOURCES` - Set of admin-trusted sources
10. Includes: plugin, policySettings, built-in, builtin, bundled
11. Plugin - gated separately by strictKnownMarketplaces
12. policySettings - from managed settings, admin-controlled by definition
13. built-in/builtin/bundled - ship with CLI, not user-authored
14. Everything else (userSettings, projectSettings, localSettings, flagSettings, mcp, undefined) is user-controlled and blocked when surface locked
15. Covers both AgentDefinition.source ('built-in' with hyphen) and Command.source ('builtin' no hyphen, plus 'bundled')
16. `isSourceAdminTrusted` - checks if source is admin-trusted under strictPluginOnlyCustomization
17. Used to gate frontmatter-hook registration and similar per-item checks

## Exports
- `CustomizationSurface` - customization surface type
- `isRestrictedToPluginOnly` - checks if restricted to plugin-only
- `ADMIN_TRUSTED_SOURCES` - admin-trusted sources Set
- `isSourceAdminTrusted` - checks if source admin-trusted
