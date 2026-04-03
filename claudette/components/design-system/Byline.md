## Purpose
Joins child elements with a middot separator (" · ") for inline metadata display, automatically filtering out falsy children.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `Text`

## Logic
Converts children to an array, filters out invalid elements, then maps over them inserting a dimmed middot separator between each valid child using React fragments.

## Exports
- `Byline` - renders children separated by middot delimiters for compact inline display
