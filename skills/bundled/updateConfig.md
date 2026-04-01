# updateConfig

## Purpose
Implements the /update-config bundled skill for generating and updating settings configuration files.

## Imports
- **Stdlib**: (none)
- **External**: `zod/v4`
- **Internal**: settings types, JSON utils, bundledSkills

## Logic
1. `generateSettingsSchema` - generates JSON Schema from Zod settings schema
2. Provides settings file locations table (global/project/local)
3. Documents settings load order: user → project → local
4. Includes examples for permissions, env vars, model/agent config
5. Permission rule syntax: exact match, prefix wildcard, tool-only
6. Shows JSON schema reference for all settings fields
7. Helps users create properly formatted settings files

## Exports
- `registerUpdateConfigSkill` - function that registers the /update-config skill
- `generateSettingsSchema` - generates JSON Schema from Zod schema
