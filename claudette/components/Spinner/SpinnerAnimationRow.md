# components/Spinner/SpinnerAnimationRow

## Purpose
Provides spinner animation row component for 50ms-animated spinner portion.

## Imports
- **Stdlib**: (none)
- **External**: `figures`, REACT, REACT_COMPILER
- **Internal**: ink stringWidth, ink, tasks InProcessTeammateTask types, format, ink, theme, design-system Byline, Spinner GlimmerMessage/SpinnerGlyph/types/useStalledAnimation/utils

## Logic
1. `SEP_WIDTH` - stringWidth(' · ')
2. `THINKING_BARE_WIDTH` - stringWidth('thinking')
3. `SHOW_TOKENS_AFTER_MS` (30,000) - show tokens after this time
4. `THINKING_INACTIVE` - { r: 153, g: 153, b: 153 }
5. `THINKING_INACTIVE_SHIMMER` - { r: 185, g: 185, b: 185 }
6. `THINKING_DELAY_MS` (3000) - thinking delay
7. `THINKING_GLOW_PERIOD_S` (2) - thinking glow period
8. `SpinnerAnimationRowProps` - props for spinner animation row
9. Animation inputs: mode, reducedMotion, hasActiveTools, responseLengthRef
10. Message (stable within turn): message, messageColor, shimmerColor, overrideColor?
11. Timer refs: loadingStartTimeRef, totalPausedMsRef, pauseStartTimeRef
12. Display flags: spinnerSuffix?, verbose, columns
13. Teammate-derived: hasRunningTeammates, teammateTokens, foregroundedTeammate, leaderIsIdle?
14. Thinking: thinkingStatus ('thinking' | number | null), effortSuffix
15. `SpinnerAnimationRow` - 50ms-animated portion of SpinnerWithVerb
16. Owns useAnimationFrame(50) and all values derived from animation clock
17. Parent SpinnerWithVerb freed from 50ms render loop (~25x/turn instead of ~383x)
18. Keeps outer Box shells, useAppState selectors, task filtering, tip/tree subtrees out of hot animation path
19. `figures` - figures library
20. `useMemo`, `useRef` - UI hooks
21. `stringWidth` - gets string width
22. `useAnimationFrame` - animation frame hook
23. `formatDuration`, `formatNumber` - format functions
24. `toInkColor` - converts to ink color
25. `Byline` - byline component
26. `GlimmerMessage`, `SpinnerGlyph` - spinner components
27. `SpinnerMode` - spinner mode type
28. `useStalledAnimation` - stalled animation hook
29. `interpolateColor`, `toRGBColor` - color utilities

## Exports
- `SpinnerAnimationRowProps` - props type
- `SpinnerAnimationRow` - spinner animation row component
