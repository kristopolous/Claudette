# components/shell/ExpandShellOutputContext

## Purpose
Provides context for indicating shell output should be shown in full (not truncated).

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER
- **Internal**: (none)

## Logic
1. `ExpandShellOutputContext` - React.createContext(false)
2. Boolean context that child components can check to modify behavior
3. Follows same pattern as MessageResponseContext and SubAgentContext
4. Used to auto-expand most recent user `!` command output
5. `ExpandShellOutputProvider` - provides context with value=true
6. Wraps children in ExpandShellOutputContext.Provider
7. `useExpandShellOutput` - returns true if rendered inside ExpandShellOutputProvider
8. Indicates shell output should be shown in full rather than truncated
9. Uses useContext(ExpandShellOutputContext)

## Exports
- `ExpandShellOutputProvider` - expand shell output provider component
- `useExpandShellOutput` - hook for checking expand shell output
