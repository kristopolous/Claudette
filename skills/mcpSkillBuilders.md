# mcpSkillBuilders

## Purpose
Provides write-once registry for MCP skill discovery functions, avoiding circular dependencies.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: loadSkillsDir types

## Logic
1. `MCPSkillBuilders` type defines the two functions MCP skill discovery needs
2. `registerMCPSkillBuilders` - registers builders at module init time
3. `getMCPSkillBuilders` - retrieves registered builders, throws if not yet registered
4. Avoids circular dependency: mcpSkills.ts → loadSkillsDir.ts → ... → client.ts → mcpSkills.ts
5. Uses registration pattern instead of direct import to break cycle
6. Dynamic import fails in Bun-bundled binaries (bunfs path resolution issues)
7. Registration happens at loadSkillsDir.ts module init via static import from commands.ts

## Exports
- `MCPSkillBuilders` - type for skill builder functions
- `registerMCPSkillBuilders` - registers the builder functions
- `getMCPSkillBuilders` - retrieves registered builders
