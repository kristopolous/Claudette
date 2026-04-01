## Purpose
Provides a method to manually exit the Claudette application.

## Imports
- **Stdlib**: none
- **External**: `react` (useContext)
- **Internal**: `components/AppContext`

## Logic
Wraps React's useContext to expose AppContext, which contains the exit method for unmounting the application.

## Exports
- `useApp` - returns the app context with a method to manually exit and unmount the application
