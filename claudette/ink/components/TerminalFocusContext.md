# ink/components/TerminalFocusContext

## Purpose
Provides a React context and provider for terminal focus state, allowing components to subscribe to focus changes without causing unnecessary re-renders of the parent App tree.

## Imports
- **Stdlib**: none
- **External**: `react` — `createContext`, `useMemo`, `useSyncExternalStore`
- **Internal**: `../terminal-focus-state.js` — `getTerminalFocused`, `getTerminalFocusState`, `subscribeTerminalFocus`, `TerminalFocusState` type

## Logic
1. Creates a React context with default values (`isTerminalFocused: true`, `terminalFocusState: 'unknown'`)
2. Sets `displayName` for debugging
3. `TerminalFocusProvider` uses `useSyncExternalStore` with the terminal focus subscription to track both `isTerminalFocused` (boolean) and `terminalFocusState` (TerminalFocusState enum)
4. Memoizes the context value object to prevent unnecessary re-renders when values haven't changed
5. Children receive a stable prop reference so they don't re-render — only components that explicitly consume the context will re-render on focus changes

## Exports
- `TerminalFocusContext` (default export) — React context object of type `Context<TerminalFocusContextProps>`
- `TerminalFocusProvider({ children }: { children: React.ReactNode })` — provider component that subscribes to focus state and supplies context value
- `TerminalFocusState` — re-exported type from terminal-focus-state
- `TerminalFocusContextProps` — type with `isTerminalFocused: boolean` and `terminalFocusState: TerminalFocusState`
