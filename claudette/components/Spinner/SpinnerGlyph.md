# components/Spinner/SpinnerGlyph

## Purpose
Provides spinner glyph component for animated spinner display.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, theme, Spinner utils

## Logic
1. `DEFAULT_CHARACTERS` - default spinner characters from getDefaultCharacters()
2. `SPINNER_FRAMES` - spinner frames: characters + reversed characters
3. `REDUCED_MOTION_DOT` - '●' for reduced motion
4. `REDUCED_MOTION_CYCLE_MS` (2000) - 2-second cycle: 1s visible, 1s dim
5. `ERROR_RED` - { r: 171, g: 43, b: 63 } for error color
6. `Props` - { frame, messageColor, stalledIntensity?, reducedMotion?, time? }
7. `SpinnerGlyph` - UI component for spinner glyph
8. Uses REACT_COMPILER runtime (_c) for memoization
9. Gets theme via useTheme and getTheme
10. Reduced motion: slowly flashing orange dot
11. Calculates isDim based on time and cycle
12. Renders Box with flexWrap="wrap", height={1}, width={2}
13. Renders Text with messageColor and dimColor={isDim}
14. Stalled intensity > 0: smoothly interpolates from current color to red
15. Gets base color from theme[messageColor]
16. Parses base color to RGB, interpolates with ERROR_RED
17. Falls back to ANSI themes: error color if stalledIntensity > 0.5, else messageColor
18. Normal mode: renders spinner character with messageColor
19. `useTheme` - gets current theme
20. `getTheme`, `Theme` - theme functions/types
21. `getDefaultCharacters`, `interpolateColor`, `parseRGB`, `toRGBColor` - spinner utils

## Exports
- `SpinnerGlyph` - spinner glyph component
