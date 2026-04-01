## Purpose
Finds memory files relevant to a user query by scanning memory file headers and using an inference provider model to select the most relevant ones.

## Imports
- **Stdlib**: none
- **External**: bun:bundle (feature flag)
- **Internal**: utils/debug, utils/errors, utils/model/model, utils/sideQuery, utils/slowOperations, memoryScan

## Logic
Scans the memory directory for available memory files, filters out already-surfaced paths, then sends the query and a formatted manifest of available memories to a side-query model (default Sonnet) which returns up to 5 selected filenames as JSON. The function maps selected filenames back to their full headers and returns absolute paths with modification times. Optionally logs telemetry for memory recall shape. Excludes MEMORY.md since it is already loaded in the system prompt.

## Exports
- `RelevantMemory` - type representing a relevant memory with path and mtimeMs fields
- `findRelevantMemories` - async function that returns up to 5 relevant memory file paths and their modification times for a given query
