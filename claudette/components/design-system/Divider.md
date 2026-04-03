## Purpose
A horizontal divider line that spans the terminal width with optional color, custom character, padding, and centered title.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `useTerminalSize`, `stringWidth`, `Ansi`, `Text`, `Theme`

## Logic
Calculates effective width from terminal size or explicit width minus padding. When a title is present, computes left and right segment widths to center the title, then renders the divider as left chars + title + right chars. Without a title, renders a single repeated character string.

## Exports
- `Divider` - renders a horizontal line with optional themed color and centered title
