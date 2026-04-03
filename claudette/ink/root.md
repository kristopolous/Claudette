# ink/root

## Purpose
Provides root rendering API for Ink applications.

## Imports
- **Stdlib**: `stream`
- **External**: REACT
- **Internal**: utils debug, ink frame, ink ink, ink instances

## Logic
1. `RenderOptions` - { stdout?, stdin?, stderr?, exitOnCtrlC?, patchConsole?, onFrame? }
2. `stdout` - output stream for rendering (default: process.stdout)
3. `stdin` - input stream for listening (default: process.stdin)
4. `stderr` - error stream (default: process.stderr)
5. `exitOnCtrlC` - whether to exit on Ctrl+C (default: true)
6. `patchConsole` - whether to patch console methods (default: true)
7. `onFrame` - called after each frame render with timing and flicker info
8. `Instance` - { rerender, unmount, waitUntilExit, cleanup }
9. `Root` - { render, unmount, waitUntilExit } - managed Ink root like react-dom's createRoot
10. Separates instance creation from rendering for reuse across sequential screens
11. `renderSync` - mounts component and renders output synchronously
12. Uses getOptions to normalize options
13. `ReactNode` - React node type
14. `FrameEvent` - frame event type
15. `Ink`, `Options` - Ink class and options type
16. `instances` - instances map
17. `logForDebugging` - debug logging
18. `Stream` -Node stream

## Exports
- `RenderOptions` - render options type
- `Instance` - instance type
- `Root` - root type
- `renderSync` - synchronous render function
