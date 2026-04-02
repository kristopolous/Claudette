# commandSuggestions

## Purpose
Generates slash command suggestions for the REPL prompt input using fuzzy matching (Fuse.js), with support for inline completion, mid-input slash commands, and usage-based ranking of recently used skills.

## Imports
- **Stdlib**: `fuse.js`
- **External**: none
- **Internal**: `../../commands`, `../../components/PromptInput/PromptInputFooterSuggestions`, `./skillUsageTracking`

## Logic
1. **Fuse.js indexing**: `getCommandFuse()` builds a cached fuzzy search index keyed on command array identity. Each command is indexed by name (weight 3), parts split on `[:_-]` (weight 2), aliases (weight 2), and description words (weight 0.5). The cache avoids rebuilding on every keystroke.
2. **Empty query (`/`)**: When user types just `/`, commands are categorized into recently used (top 5 by skill usage score), built-in, user, project, policy, and other — each sorted alphabetically within its category.
3. **Fuzzy search**: For partial queries, Fuse results are re-sorted with a priority hierarchy: exact name > exact alias > prefix name (shorter first) > prefix alias (shorter first) > fuzzy (by Fuse score, with usage as tiebreaker).
4. **Hidden commands**: If a hidden command's exact name is typed and no visible command shares that name, it's prepended to results so exact-name always wins over weak fuzzy matches.
5. **Mid-input slash commands**: `findMidInputSlashCommand()` detects `/command` patterns appearing mid-input (not at position 0), using a regex that avoids lookbehind for JSC JIT performance.
6. **Inline completion**: `getBestCommandMatch()` finds the first prefix-matching suggestion and returns the completion suffix (e.g., "mit" for partial "com" → "commit").
7. **Application**: `applyCommandSuggestion()` formats the command with a trailing space, updates input/cursor, and auto-executes if the command takes no arguments.
8. **Highlighting**: `findSlashCommandPositions()` finds all `/command` patterns in text for syntax highlighting, requiring whitespace or start-of-string before the slash to avoid matching paths.

## Exports
- `MidInputSlashCommand` - type for mid-input slash command info (token, startPos, partialCommand)
- `findMidInputSlashCommand` - detects `/command` tokens appearing mid-input, returns info or null
- `getBestCommandMatch` - finds best prefix-matching command, returns {suffix, fullCommand} or null
- `isCommandInput` - returns true if input starts with `/`
- `hasCommandArgs` - returns true if command input has arguments (not just trailing space)
- `formatCommand` - formats a command name as `/{name} `
- `generateCommandSuggestions` - main suggestion generator, returns sorted SuggestionItem array
- `applyCommandSuggestion` - applies a selected command to the input field, optionally auto-executing
- `findSlashCommandPositions` - finds all `/command` pattern positions in text for highlighting

## Source
`commandSuggestions`
