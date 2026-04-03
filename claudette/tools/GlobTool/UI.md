# tools/GlobTool/UI.tsx

## Purpose
Provides UI rendering functions for the Glob tool, including user-facing messages, error handling, and result summaries.

## Imports
- **Stdlib**: None
- **External**: `@anthropic-ai/sdk`, REACT
- **Internal**: `components/MessageResponse`, `utils/messages`, `components/FallbackToolUseErrorMessage`, `constants/toolLimits`, `ink`, `utils/file`, `utils/format`, `GrepTool/GrepTool`

## Logic
Implements UI components for displaying Glob tool interactions in the terminal interface. Renders tool use messages showing the search pattern and path, handles error messages with special cases for file-not-found errors, reuses GrepTool's result message renderer, and generates truncated summaries of tool usage. The user-facing name is displayed as 'Search' rather than 'Glob'.

## Exports
- `userFacingName` - Returns 'Search' as the user-friendly tool name
- `renderToolUseMessage` - Renders the tool invocation message showing pattern and path
- `renderToolUseErrorMessage` - Renders error messages with special handling for file-not-found cases
- `renderToolResultMessage` - Reuses GrepTool's result message renderer
- `getToolUseSummary` - Returns a truncated summary of the glob pattern for display
