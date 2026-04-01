# extractMemories/prompts

## Purpose
Provides prompt templates for background memory extraction agent.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`
- **Internal**: memoryTypes, tool constants

## Logic
1. `opener` - shared opener for both extract-prompt variants
2. Lists available tools (Read, Grep, Glob, read-only Bash, Edit/Write for memory dir only)
3. Emphasizes efficient two-turn strategy: parallel reads then parallel writes
4. Restricts to last N messages only - no grepping source files or git commands
5. `buildExtractAutoOnlyPrompt` - four-type taxonomy, no scope guidance (single directory)
6. How-to-save: frontmatter format, semantic organization, update/remove wrong memories, avoid duplicates
7. Optional skipIndex mode for simplified flow
8. `buildExtractCombinedPrompt` - extends auto-only with team memory scope guidance
9. TEAMMEM feature-gated team memory support
10. MEMORY_FRONTMATTER_EXAMPLE, TYPES_SECTION_*, WHAT_NOT_TO_SAVE_SECTION from memoryTypes

## Exports
- `buildExtractAutoOnlyPrompt` - builds auto-only extraction prompt
- `buildExtractCombinedPrompt` - builds combined (auto + team) extraction prompt
- `opener` - shared prompt opener
