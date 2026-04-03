# components/memory/MemoryUpdateNotification

## Purpose
Provides memory update notification component.

## Imports
- **Stdlib**: `os`, `path`
- **External**: REACT, REACT_COMPILER
- **Internal**: ink, cwd

## Logic
1. `getRelativeMemoryPath` - gets relative memory path for display
2. Calculates relativeToHome: '~' + path.slice(homeDir.length) if starts with homeDir
3. Calculates relativeToCwd: './' + relative(cwd, path) if starts with cwd
4. Returns shorter of relativeToHome or relativeToCwd, or absolute path if neither applicable
5. `MemoryUpdateNotification` - UI component for memory update notification
6. Uses REACT_COMPILER runtime (_c) for memoization
7. Gets display path via getRelativeMemoryPath
8. Renders Box with flexDirection="column", flexGrow={1}
9. Shows Text with color="text": "Memory updated in {displayPath} · /memory to edit"
10. `homedir` - gets home directory
11. `relative` - gets relative path
12. `getCwd` - gets current working directory

## Exports
- `getRelativeMemoryPath` - gets relative memory path
- `MemoryUpdateNotification` - memory update notification component
