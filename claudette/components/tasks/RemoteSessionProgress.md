# components/tasks/RemoteSessionProgress

## Purpose
Provides remote session progress component with review stage counts and rainbow text animation.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: tasks RemoteAgentTask, types utils, constants figures, hooks useSettings, ink, array, thinking

## Logic
1. `TICK_MS` (80) - animation tick interval (module-level constant)
2. `ReviewStage` - RemoteAgentTaskState['reviewProgress']['stage'] (type alias)
3. `formatReviewStageCounts` - formats review stage counts for display
4. Pre-stage (no stage field): "{found} found · {verified} verified"
5. synthesizing stage: "{verified} verified · {refuted} refuted · deduping" (hides refuted if 0)
6. verifying stage: "{found} found · {verified} verified · {refuted} refuted" (hides refuted if 0)
7. finding stage: "{found} found" or "finding" if found is 0
8. `RainbowText` - renders per-character rainbow gradient text
9. Uses phase offset for color cycling on each animation frame
10. Maps each character to Text with getRainbowColor(i + phase)
11. `useSmoothCount` - smooth-ticks count toward target, +1 per frame
12. Same pattern as token counter in SpinnerAnimationRow
13. Ref survives re-renders, animation clock drives tick
14. Target jumps (2→5) display as 2→3→4→5 instead of snapping
15. When snap set (reduced motion or frozen clock), bypasses tick and jumps to target
16. `ReviewRainbowLine` - renders review session rainbow line with animated counts
17. `DIAMOND_FILLED`, `DIAMOND_OPEN` - diamond figure constants
18. `useSettings` - gets settings
19. `Text`, `useAnimationFrame` - ink components/hooks
20. `count` - count array elements
21. `getRainbowColor` - gets rainbow color for index

## Exports
- `formatReviewStageCounts` - formats review stage counts
- `RemoteSessionProgress` - remote session progress component
