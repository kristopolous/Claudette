# ink/components/AppContext

## Purpose
Provides AppContext React context for app exit functionality.

## Imports
- **Stdlib**: (none)
- **External**: `react`
- **Internal**: (none)

## Logic
1. `Props` - { exit }
2. `exit` - exits (unmounts) the whole Ink app
3. Takes optional error parameter
4. `AppContext` - React context exposing method to manually exit app
5. Default value: { exit() {} }
6. displayName: 'InternalAppContext'
7. `createContext` - React context creator

## Exports
- `Props` - app context props type
- `AppContext` - app context (default export)
