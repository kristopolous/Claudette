## Purpose
Builds and maintains a fuzzy file index for path autocomplete; provides suggestions for file and directory names.

## Imports
- **External**: `fs` (statSync), `ignore`, `path` (basename, join, relative, dirname, sep)
- **Internal**:
  - `src/utils/markdownConfigLoader.js` (CLAUDE_CONFIG_DIRECTORIES, loadMarkdownFilesForSubdir)
  - `../native-ts/file-index/index.js` (CHUNK_MS, FileIndex, yieldToEventLoop)
  - `../services/analytics/index.js` (logEvent)
  - `../types/fileSuggestion.js` (FileSuggestionCommandInput)
  - `../utils/config.js` (getGlobalConfig)
  - `../utils/cwd.js` (getCwd)
  - `../utils/debug.js` (logForDebugging), `../utils/errors.js` (errorMessage)
  - `../utils/execFileNoThrow.js` (execFileNoThrowWithCwd)
  - `../utils/fsOperations.js` (getFsImplementation)
  - `../utils/git.js` (findGitRoot, gitExe)
  - `../utils/hooks.js` (createBaseHookInput, executeFileSuggestionCommand)
  - `../utils/log.js` (logError)
  - `../utils/path.js` (expandPath)
  - `../utils/ripgrep.js` (ripGrep)
  - `../utils/settings/settings.js` (getInitialSettings)
  - `../utils/signal.js` (createSignal)

## Logic
- Singleton `FileIndex` with lazy init; caches tracked/untracked files and directories
- Cache invalidation via clearFileSuggestionCaches (session resume)
- `getPathsForSuggestions()`: builds index from git ls-files (tracked) + config files; merges untracked asynchronously; signature check avoids unnecessary rebuilds
- `startBackgroundCacheRefresh()`: throttled (5s) refresh; also triggers on .git/index mtime change
- `generateFileSuggestions(partialPath, showOnEmpty?)`:
  - Custom command support (configured via fileSuggestion.type)
  - Empty or '.' returns top-level directory entries (and triggers refresh)
  - Otherwise searches FileIndex (partial results while building) and returns up to 15 items
- `applyFileSuggestion`: replaces partial path with selected suggestion
- Utilities: directory enumeration, common prefix for suggestion UI
- Analytics: tengu_file_suggestions_git_ls_files, tengu_file_suggestions_ripgrep, tengu_file_suggestions_query

## Exports
- `clearFileSuggestionCaches()` - Reset all caches
- `pathListSignature(paths)` - Generate cache signature
- `getDirectoryNames(files)`, `getDirectoryNamesAsync(files)`
- `getPathsForSuggestions()` - Promise<FileIndex>
- `findLongestCommonPrefix(suggestions)` - string
- `generateFileSuggestions(partialPath, showOnEmpty?)` - Promise<SuggestionItem[]>
- `applyFileSuggestion(suggestion, input, partialPath, startPos, onInputChange, setCursorOffset)` - void
- `onIndexBuildComplete` - subscribe signal for index completion
