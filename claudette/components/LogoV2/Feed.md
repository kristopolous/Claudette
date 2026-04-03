# components/LogoV2/Feed

## Purpose
Provides feed component for rendering feed content with title, lines, and footer.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink stringWidth, ink, format

## Logic
1. `FeedLine` - { text, timestamp? }
2. `FeedConfig` - { title, lines, footer?, emptyMessage?, customContent? }
3. `customContent` - { content: React.ReactNode, width: number }
4. `FeedProps` - { config, actualWidth }
5. `calculateFeedWidth` - calculates feed width based on content
6. Gets title, lines, footer, emptyMessage, customContent from config
7. maxWidth = stringWidth(title)
8. If customContent: maxWidth = Math.max(maxWidth, customContent.width)
9. Else if lines.length === 0 && emptyMessage: maxWidth = Math.max(maxWidth, stringWidth(emptyMessage))
10. Else: calculates maxTimestampWidth, then iterates lines to find max lineWidth
11. lineWidth = stringWidth(line.text) + (timestampWidth > 0 ? timestampWidth + gap.length : 0)
12. If footer: maxWidth = Math.max(maxWidth, stringWidth(footer))
13. `Feed` - UI component for feed display
14. Uses REACT_COMPILER runtime (_c) for memoization
15. Renders title in bold with color="claude"
16. Renders lines with timestamps if present
17. Renders footer if present
18. Renders emptyMessage if lines.length === 0
19. Renders customContent if present
20. `stringWidth` - gets string width
21. `Box`, `Text` - ink components
22. `truncate` - truncates text

## Exports
- `FeedLine` - feed line type
- `FeedConfig` - feed config type
- `calculateFeedWidth` - calculates feed width
- `Feed` - feed component
