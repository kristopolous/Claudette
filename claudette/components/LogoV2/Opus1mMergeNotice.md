# components/LogoV2/Opus1mMergeNotice

## Purpose
Provides Opus 1M merge notice component and utilities.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: constants figures, ink, config, model model, LogoV2 AnimatedAsterisk

## Logic
1. `MAX_SHOW_COUNT` (6) - max show count for notice
2. `shouldShowOpus1mMergeNotice` - checks if should show Opus 1M merge notice
3. Returns isOpus1mMergeEnabled() && (getGlobalConfig().opus1mMergeNoticeSeenCount ?? 0) < MAX_SHOW_COUNT
4. `Opus1mMergeNotice` - UI component for Opus 1M merge notice
5. Uses REACT_COMPILER runtime (_c) for memoization
6. Uses useState with shouldShowOpus1mMergeNotice
7. useEffect increments opus1mMergeNoticeSeenCount in global config
8. Returns null if !show
9. Renders Box with paddingLeft={2}
10. Renders AnimatedAsterisk with char={UP_ARROW}
11. Renders Text with dimColor: "Opus now defaults to 1M context · 5x more room, same pricing"
12. `UP_ARROW` - up arrow constant
13. `useEffect`, `useState` - UI hooks
14. `Box`, `Text` - ink components
15. `getGlobalConfig`, `saveGlobalConfig` - config functions
16. `isOpus1mMergeEnabled` - checks if Opus 1M merge enabled
17. `AnimatedAsterisk` - animated asterisk component

## Exports
- `shouldShowOpus1mMergeNotice` - checks if should show notice
- `Opus1mMergeNotice` - Opus 1M merge notice component
