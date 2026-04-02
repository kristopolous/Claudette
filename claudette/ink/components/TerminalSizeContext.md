# ink/components/TerminalSizeContext

## Purpose
Provides a React context for terminal dimensions (columns and rows), allowing components to access the current terminal size.

## Imports
- **Stdlib**: none
- **External**: `react` — `createContext`
- **Internal**: none

## Logic
1. Defines a `TerminalSize` type with `columns: number` and `rows: number`
2. Creates a React context typed as `TerminalSize | null`, initialized to `null`
3. The context is meant to be provided by a parent component that tracks terminal resize events

## Exports
- `TerminalSize` — type with `columns: number` and `rows: number`
- `TerminalSizeContext` — React context object of type `Context<TerminalSize | null>`, default value `null`
