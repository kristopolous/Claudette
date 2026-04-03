# components/HighlightedCode/Fallback

## Purpose
Provides fallback component for highlighted code with caching.

## Imports
- **Stdlib**: `path`
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, cliHighlight, debug, file, hash

## Logic
1. `Props` - { code, filePath, dim?, skipColoring? }
2. `HL_CACHE_MAX` (500) - max highlight cache size
3. `hlCache` - module-level highlight cache (Map<string, string>)
4. hl.highlight() is hot cost on virtual-scroll remounts
5. useMemo doesn't survive unmount→remount
6. Keyed by hash of code+language to avoid retaining full source strings (#24180 RSS fix)
7. `cachedHighlight` - cached highlight function
8. Uses hashPair for cache key
9. Moves hit to end of cache (LRU behavior)
10. Evicts first key when cache reaches max size
11. `HighlightedCodeFallback` - UI component for highlighted code fallback
12. Uses REACT_COMPILER runtime (_c) for memoization
13. Converts leading tabs to spaces via convertLeadingTabsToSpaces
14. If skipColoring: renders Ansi with code, wrapped in Text with dimColor
15. Otherwise: gets language from file extension
16. Gets highlighter via getCliHighlightPromise
17. Uses Suspense and use() for async highlighter
18. Uses useMemo for cached highlight
19. Renders Ansi with highlighted code, wrapped in Text with dimColor

## Exports
- `HighlightedCodeFallback` - highlighted code fallback component
