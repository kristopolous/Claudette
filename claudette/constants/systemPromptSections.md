## Purpose
Defines the structure and caching behavior for system prompt sections that are assembled into the full system prompt.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `bootstrap/state`

## Logic
Provides factory functions for creating cached and uncached system prompt sections, resolves all sections by computing or retrieving from cache, and clears all section state along with beta header latches when the conversation is reset.

## Exports
- `systemPromptSection` - creates a memoized section computed once and cached until clear or compact
- `DANGEROUS_uncachedSystemPromptSection` - creates a volatile section that recomputes every turn and breaks the prompt cache
- `resolveSystemPromptSections` - resolves all sections, returning an array of computed or cached strings
- `clearSystemPromptSections` - clears all section state and beta header latches
