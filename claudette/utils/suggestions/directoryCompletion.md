# directoryCompletion

## Purpose
Provides directory and path completion suggestions for the REPL prompt input, with LRU-cached filesystem scanning, path parsing, and token detection for path-like input.

## Imports
- **Stdlib**: `lru-cache`, `path`
- **External**: none
- **Internal**: `src/components/PromptInput/PromptInputFooterSuggestions`, `src/utils/cwd`, `src/utils/fsOperations`, `src/utils/log`, `src/utils/path`

## Logic
1. **Path parsing**: `parsePartialPath()` splits a partial path into directory and prefix components, handling empty input (defaults to cwd), trailing separators, and path expansion via `expandPath()`.
2. **Directory scanning**: `scanDirectory()` reads a directory and returns subdirectories (excluding hidden ones starting with `.`), limited to 100 results. Results are cached in an LRU cache (500 entries, 5-minute TTL).
3. **Path scanning**: `scanDirectoryForPaths()` reads both files and directories, sorted with directories first then alphabetically. Cache key includes the `includeHidden` flag.
4. **Directory completions**: `getDirectoryCompletions()` parses the partial path, scans the directory, filters by prefix match, and returns SuggestionItem objects with trailing `/` for directories.
5. **Path completions**: `getPathCompletions()` extends directory completions to include files, with options for `includeFiles` and `includeHidden`. Constructs relative display paths preserving the original partial path's directory portion.
6. **Path detection**: `isPathLikeToken()` checks if a token looks like a path by testing for `~/`, `/`, `./`, `../`, `~`, `.`, or `..` prefixes.
7. **Cache management**: `clearDirectoryCache()` clears only the directory cache; `clearPathCache()` clears both directory and path caches.

## Exports
- `DirectoryEntry` - type for directory entries with name, path, and type
- `PathEntry` - type for file/directory entries with name, path, and type
- `CompletionOptions` - type for basePath and maxResults options
- `PathCompletionOptions` - extends CompletionOptions with includeFiles and includeHidden
- `parsePartialPath` - splits a partial path into {directory, prefix} components
- `scanDirectory` - reads and caches subdirectories (excludes hidden, max 100)
- `getDirectoryCompletions` - returns directory completion SuggestionItems for a partial path
- `clearDirectoryCache` - clears the directory LRU cache
- `isPathLikeToken` - returns true if a token looks like a filesystem path
- `scanDirectoryForPaths` - reads and caches both files and directories, sorted
- `getPathCompletions` - returns file+directory completion SuggestionItems for a partial path
- `clearPathCache` - clears both directory and path LRU caches

## Source
`directoryCompletion`
