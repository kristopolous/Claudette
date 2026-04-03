## Purpose
Returns the current terminal dimensions (columns and rows) for components that need to adapt to terminal size.

## Imports
- **Stdlib**: None
- **External**: REACT (`useContext`)
- **Internal**:
  - `src/ink/components/TerminalSizeContext` - `TerminalSize`, `TerminalSizeContext`

## Logic
- Uses `useContext(TerminalSizeContext)` to retrieve the current size.
- Throws an error if the context is unavailable (i.e., used outside an Ink App component).

## Exports
- `useTerminalSize` - hook returning `TerminalSize` (object with `columns`, `rows`)
