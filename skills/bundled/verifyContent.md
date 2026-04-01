# verifyContent

## Purpose
Provides embedded skill content files for the verify bundled skill.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: verify skill markdown files (examples/cli.md, examples/server.md, SKILL.md)

## Logic
1. Imports verify skill markdown files as strings (Bun text loader)
2. `SKILL_MD` - main skill prompt template
3. `SKILL_FILES` - record mapping example paths to content
4. Includes CLI and server verification examples

## Exports
- `SKILL_MD` - main verify skill prompt string
- `SKILL_FILES` - record of embedded example files
