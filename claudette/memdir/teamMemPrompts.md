## Purpose
Builds the combined system prompt for when both auto memory and team memory are enabled.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: memdir, memoryTypes, paths, teamMemPaths

## Logic
Constructs a comprehensive memory system prompt that describes two directories (private and team), their scope levels, the four-type memory taxonomy with per-type scope guidance, what not to save, how to save memories in either single-step or two-step mode depending on whether an index is used, when to access memories, how to trust recalled memories, and how memory relates to other persistence mechanisms like plans and tasks. Assembles prompt sections from imported constants and dynamically computed directory paths.

## Exports
- `buildCombinedMemoryPrompt` - builds the full memory system prompt string for combined auto and team memory mode, accepting optional extra guidelines and a flag to skip the index step
