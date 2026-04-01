## Purpose
Defines the memory type taxonomy and provides prompt sections describing each memory type, when to save, how to use, and what not to save.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Defines four memory types (user, feedback, project, reference) as a closed taxonomy. Provides parsing for memory type values from frontmatter. Exports two variants of the types section — one for combined mode with private/team scope tags and one for individual-only mode without scope tags. Also exports sections describing what not to save, when to access memories, how to trust recalled memories, and an example frontmatter format. Memories are constrained to information not derivable from the current project state.

## Exports
- `MEMORY_TYPES` - constant array of the four valid memory type strings
- `MemoryType` - type union of valid memory type values
- `parseMemoryType` - parses a raw frontmatter value into a MemoryType or returns undefined
- `TYPES_SECTION_COMBINED` - prompt lines for combined private/team mode with scope tags
- `TYPES_SECTION_INDIVIDUAL` - prompt lines for individual-only mode without scope tags
- `WHAT_NOT_TO_SAVE_SECTION` - prompt lines listing information that should not be saved as memory
- `MEMORY_DRIFT_CAVEAT` - warning text about memory records becoming stale over time
- `WHEN_TO_ACCESS_SECTION` - prompt lines describing when to access memories
- `TRUSTING_RECALL_SECTION` - prompt lines on how to verify memory claims before acting on them
- `MEMORY_FRONTMATTER_EXAMPLE` - example frontmatter format for memory files
