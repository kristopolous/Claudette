# components/Spinner/FlashingChar

## Purpose
Provides flashing character component for shimmer animation effect.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, theme, Spinner utils

## Logic
1. `Props` - { char, flashOpacity, messageColor, shimmerColor }
2. `FlashingChar` - UI component for flashing character
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Gets theme via useTheme
5. Gets base color from theme[messageColor]
6. Gets shimmer color from theme[shimmerColor]
7. Parses both colors to RGB
8. If both RGB values available: interpolates between base and shimmer based on flashOpacity
9. Returns Text with interpolated color
10. Fallback for ANSI themes: binary switch based on flashOpacity > 0.5
11. Uses shimmerColor if flashOpacity > 0.5, else messageColor
12. `useTheme` - gets current theme
13. `getTheme`, `Theme` - theme functions/types
14. `interpolateColor`, `parseRGB`, `toRGBColor` - color utilities

## Exports
- `FlashingChar` - flashing character component
