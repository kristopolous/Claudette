# ink/components/ErrorOverview

## Purpose
Provides error overview component for displaying error details with source code context.

## Imports
- **Stdlib**: `fs`
- **External**: `code-excerpt`, `react`, `stack-utils`
- **Internal**: ink components Box/Text

## Logic
1. `cleanupPath` - removes file://[cwd] prefix from stack trace paths
2. Error's source file reported as file:///home/user/file.js
3. Removes file://${process.cwd()}/ prefix
4. `getStackUtils` - gets or creates StackUtils instance
5. Uses process.cwd() for cwd
6. Uses StackUtils.nodeInternals() for internals
7. `Props` - { error: Error }
8. `ErrorOverview` - displays error with source code context
9. Parses error stack, gets first line
10. Uses getStackUtils().parseLine to parse stack line
11. Gets filePath via cleanupPath(origin?.file)
12. Reads source code via readFileSync if filePath and origin?.line exist
13. Uses codeExcerpt to get code excerpt around error line
14. Calculates lineWidth for line number padding
15. Renders Box with flexDirection="column", padding={1}
16. Shows ERROR banner with ansi:red background, ansi:white color
17. Shows error.message
18. Shows filePath:line:column if origin exists
19. Shows code excerpt with highlighted error line
20. Error line shown with ansi:red background, ansi:white color
21. Other lines shown dimmed
22. `codeExcerpt`, `CodeExcerpt` - code excerpt utilities
23. `readFileSync` - sync file read
24. `StackUtils` - stack utilities
25. `Box`, `Text` - ink components

## Exports
- `cleanupPath` - cleans up path
- `getStackUtils` - gets stack utils
- `Props` - props type
- `ErrorOverview` - error overview component (default export)
