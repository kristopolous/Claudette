## Purpose
Exposes the stdin stream to Claudette components.

## Imports
- **Stdlib**: none
- **External**: REACT (useContext)
- **Internal**: `components/StdinContext`

## Logic
Wraps React's useContext to provide access to StdinContext, which contains the stdin stream and related controls.

## Exports
- `useStdin` - returns the stdin context value containing the stdin stream
