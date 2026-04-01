## Purpose
Renders markdown tables in the terminal with adaptive column widths, text wrapping, and fallback to vertical format for narrow terminals.

## Imports
- **Stdlib**: none
- **External**: `marked`, `react`, `strip-ansi`
- **Internal**: `useTerminalSize`, `stringWidth`, `wrapAnsi`, `Ansi`, `useTheme`, `formatToken`, `padAligned`

## Logic
Calculates minimum and ideal column widths based on longest word and full content, distributes available terminal space proportionally, wraps text within cells using ANSI-aware wrapping, and switches to vertical key-value format when rows would exceed the maximum line threshold. Includes a safety margin to prevent flicker during terminal resize.

## Exports
- `MarkdownTable` - renders a markdown table token with adaptive layout and ANSI formatting
