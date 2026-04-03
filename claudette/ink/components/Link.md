# ink/components/Link

## Purpose
Provides Link component for clickable hyperlinks in terminal.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink supports-hyperlinks, ink components Text

## Logic
1. `Props` - { children?, url, fallback? }
2. `children` - optional children to render as link text
3. `url` - hyperlink URL
4. `fallback` - fallback content when hyperlinks not supported
5. `Link` - UI component for hyperlinks
6. Uses REACT_COMPILER runtime (_c) for memoization
7. content = children ?? url (use children if provided, otherwise display URL)
8. If supportsHyperlinks(): renders <Text><ink-link href={url}>{content}</ink-link></Text>
9. ink-link is text element like ink-text
10. Otherwise: renders <Text>{fallback ?? content}</Text>
11. `ReactNode` - React node type
12. `supportsHyperlinks` - checks if terminal supports hyperlinks
13. `Text` - Text component

## Exports
- `Props` - link props type
- `Link` - link component (default export)
