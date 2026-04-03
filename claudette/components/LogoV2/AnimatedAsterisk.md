# components/LogoV2/AnimatedAsterisk

## Purpose
Provides animated asterisk component with rainbow sweep effect.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: constants figures, ink, settings settings, Spinner utils

## Logic
1. `SWEEP_DURATION_MS` (1500) - sweep duration
2. `SWEEP_COUNT` (2) - number of sweeps
3. `TOTAL_ANIMATION_MS` - total animation duration (SWEEP_DURATION_MS * SWEEP_COUNT)
4. `SETTLED_GREY` - settled grey color { r: 153, g: 153, b: 153 }
5. `AnimatedAsterisk` - UI component for animated asterisk
6. Default char: TEARDROP_ASTERISK
7. Reads prefersReducedMotion once at mount - no useSettings() subscription
8. Since that would re-render whenever settings change
9. `done` state initialized to reducedMotion
10. useAnimationFrame's clock is shared - capture start offset so sweep always begins at hue 0
11. Regardless of when we mount
12. `startTimeRef` - ref for start time
13. Wires ref so useAnimationFrame's viewport-pause kicks in
14. If user submits message before sweep finishes, clock stops automatically
15. Once row enters scrollback (prevents flicker)
16. useEffect sets timeout to setDone after TOTAL_ANIMATION_MS
17. If done: renders Box with Text in SETTLED_GREY color
18. If startTimeRef.current === null: sets to time
19. elapsed = time - startTimeRef.current
20. hue = (elapsed / SWEEP_DURATION_MS) * 360 % 360
21. Renders Box with Text in hueToRgb(hue) color
22. `TEARDROP_ASTERISK` - teardrop asterisk constant
23. `useEffect`, `useRef`, `useState` - UI hooks
24. `Box`, `Text`, `useAnimationFrame` - ink components/hooks
25. `getInitialSettings` - gets initial settings
26. `hueToRgb`, `toRGBColor` - color utilities

## Exports
- `AnimatedAsterisk` - animated asterisk component
