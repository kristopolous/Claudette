# components/Spinner/useStalledAnimation

## Purpose
Provides hook for handling transition to red when tokens stop flowing.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: (none)

## Logic
1. `useStalledAnimation` - hook for stalled animation
2. Driven by parent's animation clock time instead of independent intervals
3. Slows down when terminal is blurred
4. `lastTokenTime` - ref for last token time
5. `lastResponseLength` - ref for last response length
6. `mountTime` - ref for mount time
7. `stalledIntensityRef` - ref for stalled intensity
8. `lastSmoothTime` - ref for last smooth time
9. Resets timer when new tokens arrive (checks actual length change)
10. Sets lastTokenTime, lastResponseLength, stalledIntensity to 0, lastSmoothTime
11. Derives timeSinceLastToken from animation clock
12. If hasActiveTools: timeSinceLastToken = 0, resets lastTokenTime
13. If currentResponseLength > 0: timeSinceLastToken = time - lastTokenTime
14. Else: timeSinceLastToken = time - mountTime
15. Calculates stalled intensity based on time since last token
16. isStalled = timeSinceLastToken > 3000 && !hasActiveTools
17. intensity = min((timeSinceLastToken - 3000) / 2000, 1) if stalled, else 0
18. Smooth intensity transition driven by animation frame ticks
19. If !reducedMotion and (intensity > 0 or stalledIntensityRef.current > 0):
20. Calculates dt = time - lastSmoothTime
21. If dt >= 50: smooths intensity over steps with 0.1 factor
22. When reducedMotion enabled: uses instant intensity change
23. Returns { isStalled, stalledIntensity: effectiveIntensity }

## Exports
- `useStalledAnimation` - stalled animation hook
