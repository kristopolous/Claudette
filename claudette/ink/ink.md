## Purpose
Main entry point for the Claudette terminal UI engine, managing the RECONCILER, render loop, terminal modes, selection, search highlighting, and frame buffer lifecycle.

## Imports
- **Stdlib**: `fs`, `util`
- **External**: `auto-bind`, `lodash-es/noop`, `lodash-es/throttle`, REACT, `react-reconciler`, `signal-exit`
- **Internal**: `bootstrap/state`, `native-ts/yoga-layout`, `utils/debug`, `utils/log`, `ink/colorize`, `ink/components/App`, `ink/constants`, `ink/dom`, `ink/events/keyboard-event`, `ink/focus`, `ink/frame`, `ink/hit-test`, `ink/instances`, `ink/log-update`, `ink/node-cache`, `ink/optimizer`, `ink/output`, `ink/reconciler`, `ink/render-node-to-output`, `ink/render-to-screen`, `ink/renderer`, `ink/screen`, `ink/searchHighlight`, `ink/selection`, `ink/terminal`, `ink/termio/csi`, `ink/termio/dec`, `ink/termio/osc`, `ink/useTerminalNotification`

## Logic
Creates a RECONCILER container connected to a custom DOM tree. Throttles renders at a fixed frame interval, deferring to a microtask so layout effects commit before painting. Each frame runs the renderer to produce a screen buffer, applies selection and search highlight overlays, diffs against the previous frame via LogUpdate, optimizes the diff, and writes patches to the terminal. Manages alt-screen mode entry/exit, terminal resize, SIGCONT resume, cursor positioning via declared cursor API, text selection with scroll-follow translation, and pool reset for long sessions. On unmount, synchronously restores all terminal modes via writeSync to prevent escape sequence leakage.

## Exports
- `Options` - configuration for stdout, stdin, stderr, ctrl-C handling, console patching, and frame callbacks
- `Ink` - main class managing the render loop, terminal state, selection, and lifecycle
- `drainStdin` - discards pending stdin bytes to prevent escape sequence leakage on exit
