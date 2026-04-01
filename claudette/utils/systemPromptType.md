# utils/systemPromptType

## Purpose
Provides branded type for system prompt arrays.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. Dependency-free module - can be imported from anywhere without circular initialization issues
2. `SystemPrompt` - branded type for system prompt arrays
3. readonly string[] & { readonly __brand: 'SystemPrompt' }
4. `asSystemPrompt` - casts readonly string[] to SystemPrompt branded type

## Exports
- `SystemPrompt` - branded system prompt type
- `asSystemPrompt` - casts to SystemPrompt type
