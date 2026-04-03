# components/Spinner/ShimmerChar

## Purpose
Provides shimmer character component for message shimmer animation.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, theme

## Logic
1. `Props` - { char, index, glimmerIndex, messageColor, shimmerColor }
2. `ShimmerChar` - UI component for shimmer character
3. Uses REACT_COMPILER runtime (_c) for memoization
4. Calculates isHighlighted = index === glimmerIndex
5. Calculates isNearHighlight = Math.abs(index - glimmerIndex) === 1
6. Calculates shouldUseShimmer = isHighlighted || isNearHighlight
7. Uses shimmerColor if shouldUseShimmer, else messageColor
8. Renders Text with appropriate color
9. `Theme` - theme type

## Exports
- `ShimmerChar` - shimmer character component
