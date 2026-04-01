## Purpose
Renders file paths as OSC 8 hyperlinks for terminal compatibility.

## Imports
- **Stdlib**: url (pathToFileURL)
- **External**: react (React)
- **Internal**: ../ink/components/Link.js (Link)

## Logic
Converts an absolute file path to a file:// URL using pathToFileURL and renders it as a terminal hyperlink. Uses the file path as display text when no children are provided, helping terminals like iTerm correctly identify file paths even within surrounding text.

## Exports
- `FilePathLink` - renders a file path as a clickable terminal hyperlink with optional custom display text
