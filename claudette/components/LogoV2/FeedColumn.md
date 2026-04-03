# components/LogoV2/FeedColumn

## Purpose
Provides feed column component for rendering multiple feeds vertically.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, design-system Divider, LogoV2 Feed

## Logic
1. `FeedColumnProps` - { feeds: FeedConfig[], maxWidth: number }
2. `FeedColumn` - UI component for feed column
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Calculates feedWidths via feeds.map(calculateFeedWidth)
5. Calculates maxOfAllFeeds via Math.max(...feedWidths)
6. Calculates actualWidth via Math.min(maxOfAllFeeds, maxWidth)
7. Renders Box with flexDirection="column"
8. Maps feeds to Feed components with Divider between them
9. Uses React.Fragment with key={index} for each feed
10. Shows Divider with color="claude", width={actualWidth} between feeds
11. `Box` - ink box component
12. `Divider` - divider component
13. `FeedConfig` - feed config type
14. `calculateFeedWidth`, `Feed` - feed utilities

## Exports
- `FeedColumn` - feed column component
