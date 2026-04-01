# voiceKeyterms

## Purpose
Provides domain-specific vocabulary hints for improving STT accuracy in voice_stream endpoint.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: bootstrap state, git utils

## Logic
1. `GLOBAL_KEYTERMS` - hardcoded coding terms (MCP, symlink, grep, regex, localhost, etc.)
2. Avoids terms nobody speaks aloud as-spelled (stdout → "standard out")
3. `splitIdentifier` - splits camelCase, PascalCase, kebab-case, snake_case, paths into words
4. Filters fragments ≤2 chars to avoid noise
5. `fileNameWords` - extracts words from file basename (strips extension)
6. `MAX_KEYTERMS` (50) - maximum keyterms to send
7. `getVoiceKeyterms` - builds keyterm list combining global + session context
8. Adds project root basename as single term (users say "claude CLI internal" as phrase)
9. Adds git branch name
10. Adds words from recent files
11. No model calls - pure context extraction

## Exports
- `GLOBAL_KEYTERMS` - array of global coding keyterms
- `splitIdentifier` - splits identifier into words
- `fileNameWords` - extracts words from filename
- `MAX_KEYTERMS` - maximum keyterms constant
- `getVoiceKeyterms` - builds keyterm list for STT
