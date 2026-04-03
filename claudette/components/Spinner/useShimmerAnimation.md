# components/Spinner/useShimmerAnimation

## Purpose
Provides hook for shimmer animation timing and glimmer index calculation.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: ink stringWidth, ink, Spinner types

## Logic
1. `useShimmerAnimation` - hook for shimmer animation
2. Takes mode, message, isStalled parameters
3. Returns [ref, glimmerIndex] tuple
4. `glimmerSpeed` - 50ms for 'requesting' mode, 200ms otherwise
5. Passes null to useAnimationFrame when stalled to unsubscribe from clock
6. setInterval keeps firing at 20fps even when shimmer not visible
7. If caller never attaches ref (conditional JSX), useTerminalViewport stays at initial isVisible:true
8. viewport-pause never kicks in, so this is only stop mechanism
9. `messageWidth` - calculated via useMemo with stringWidth
10. If isStalled: returns [ref, -100]
11. Calculates cyclePosition = Math.floor(time / glimmerSpeed)
12. Calculates cycleLength = messageWidth + 20
13. If mode === 'requesting': returns [ref, (cyclePosition % cycleLength) - 10]
14. Otherwise: returns [ref, messageWidth + 10 - (cyclePosition % cycleLength)]
15. `useMemo` - React memoization hook
16. `stringWidth` - gets string width
17. `useAnimationFrame` - animation frame hook
18. `DOMElement` - DOM element type
19. `SpinnerMode` - spinner mode type

## Exports
- `useShimmerAnimation` - shimmer animation hook
