## Purpose
Renders markdown content with syntax highlighting, table support, and streaming optimization.

## Imports
- **Stdlib**: none
- **External**: marked (marked, Token, Tokens), REACT (React, Suspense, use, useMemo, useRef)
- **Internal**: ../hooks/useSettings (useSettings), ./ink (Ansi, Box, useTheme), ./utils/cliHighlight (CliHighlight, getCliHighlightPromise), ./utils/hash (hashContent), ../utils/markdown (configureMarked, formatToken), ../utils/messages (stripPromptXMLTags), ./MarkdownTable (MarkdownTable)

## Logic
Uses a module-level LRU token cache (max 500 entries) keyed by content hash to avoid re-parsing markdown on remounts. Skips marked.lexer entirely for plain text by detecting markdown syntax markers via regex. Splits content into tables (rendered as UI components with flexbox) and non-table content (rendered as ANSI strings). The StreamingMarkdown variant tracks a stable prefix boundary to only re-parse the growing suffix during streaming, avoiding O(full text) re-parsing on each delta.

## Exports
- `Markdown` - main markdown rendering component with optional syntax highlighting and dim color support
- `StreamingMarkdown` - optimized markdown component for streaming content that only re-parses the unstable suffix
