# markdown

## Purpose
Renders markdown content to styled terminal text using marked for parsing. Handles all markdown token types (headings, lists, tables, blockquotes, code, links, images) with theme-aware coloring, syntax highlighting, OSC 8 hyperlinks, and GitHub issue reference linkification.

## Imports
- **Stdlib**: (none)
- **External**: STYLER, marked (Token, Tokens types), strip-ansi
- **Internal**: ../components/design-system/color, ../constants/figures (BLOCKQUOTE_BAR), ../ink/stringWidth, ../ink/supports-hyperlinks, ./cliHighlight (CliHighlight type), ./debug (logForDebugging), ./hyperlink (createHyperlink), ./messages (stripPromptXMLTags), ./theme (ThemeName type)

## Logic
1. **Marked configuration** — `configureMarked` disables strikethrough parsing (~ is often used for "approximate" not strikethrough). Idempotent via `markedConfigured` flag.
2. **Entry point** — `applyMarkdown` strips prompt XML tags, lexes with marked, formats each token, joins and trims.
3. **Token formatting** — `formatToken` recursively handles all marked token types:
   - **Blockquote**: prefixes each line with dim vertical bar, keeps text italic
   - **Code**: syntax highlights if CliHighlight provided and language supported, falls back to plaintext
   - **Codespan**: colors with theme 'permission' color
   - **Em/Strong**: italic/bold via STYLER
   - **Heading**: h1 = bold+italic+underline, h2+/h3+ = bold, all followed by double newline
   - **HR**: renders as '---'
   - **Image**: renders href as plain text
   - **Link**: mailto links rendered as plain email text; other links rendered as OSC 8 hyperlinks (with display text if different from URL)
   - **List/ListItem**: recursive formatting with depth-based indentation (2 spaces per level)
   - **Paragraph/Space/BR**: joined with EOL ('\n' unconditionally, not os.EOL)
   - **Text**: linkifies GitHub issue references (owner/repo#NNN pattern), adds list markers for list items
   - **Table**: computes column widths from display text, formats with alignment (left/center/right), separator row with dashes
   - **Escape**: renders escaped text as-is
   - **Def/Del/HTML**: suppressed (empty string)
4. **Issue linkification** — `linkifyIssueReferences` matches `owner/repo#NNN` pattern (owner disallows dots to avoid hostname false positives) and creates OSC 8 hyperlinks to GitHub. Skipped if hyperlinks unsupported.
5. **List numbering** — `getListNumber` uses different styles per depth: depth 0-1 = numeric, depth 2 = letters (a, b, c...), depth 3 = roman numerals, depth 4+ = numeric.
6. **Table alignment** — `padAligned` pads content to target width with spaces according to alignment (left/center/right), using display width (stripAnsi) to avoid ANSI codes affecting padding.

## Exports
- `configureMarked()` — Configures marked (disables strikethrough). Idempotent.
- `applyMarkdown(content, theme, highlight?)` — Renders markdown string to styled terminal text
- `formatToken(token, theme, listDepth?, orderedListNumber?, parent?, highlight?)` — Recursively formats a marked token to styled string
- `padAligned(content, displayWidth, targetWidth, align?)` — Pads content to target width according to alignment, using pre-computed display width

## Source
`markdown`
