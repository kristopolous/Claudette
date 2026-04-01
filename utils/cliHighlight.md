# utils/cliHighlight

## Purpose
Provides CLI syntax highlighting via cli-highlight with lazy loading.

## Imports
- **Stdlib**: `path`
- **External**: `cli-highlight`, `highlight.js`
- **Internal**: (none)

## Logic
1. `CliHighlight` type with highlight and supportsLanguage functions
2. DOM reference for type defs (highlight.js pulls lib.dom in)
3. `cliHighlightPromise` - shared promise for lazy loading
4. `loadedGetLanguage` - cached highlight.js getLanguage function
5. `loadCliHighlight` - loads cli-highlight and highlight.js
6. Caches highlight.js via cli-highlight import (cache hit)
7. Returns null on load failure
8. `getCliHighlightPromise` - gets or creates load promise
9. `getLanguageName` - gets language name from file extension
10. Awaits cli-highlight load, extracts extension
11. Uses loadedGetLanguage for language lookup
12. Returns 'unknown' for unrecognized extensions
13. Used for telemetry (OTel counter attributes, permission dialogs)
14. Fire-and-forget or consumer handles Promise<string>

## Exports
- `CliHighlight` - highlight type
- `getCliHighlightPromise` - gets highlight promise
- `getLanguageName` - gets language name from file path
