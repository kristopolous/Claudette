## Purpose
Renders a bordered monospace box for displaying markdown preview content with syntax highlighting and truncation support.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `useSettings`, `useTerminalSize`, `stringWidth`, `Ansi`, `Box`, `Text`, `useTheme`, `CliHighlight`, `getCliHighlightPromise`, `applyMarkdown`, `sliceAnsi`

## Logic
1. Renders markdown content using applyMarkdown with theme and highlight support
2. Calculates box dimensions based on content width, min/max constraints, and terminal width
3. Truncates content exceeding maxLines with a visual truncation bar showing hidden line count
4. Pads shorter content to meet minimum height requirements
5. Draws Unicode box borders around the content area

## Exports
- `PreviewBox` - renders preview content in a bordered box with configurable dimensions and truncation
