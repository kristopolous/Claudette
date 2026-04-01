# ink/components/AlternateScreen

## Purpose
Provides AlternateScreen component for running children in terminal's alternate screen buffer.

## Imports
- **Stdlib**: (none)
- **External**: `react`, `react/compiler-runtime`
- **Internal**: ink instances, ink termio dec, ink useTerminalNotification, ink components Box/TerminalSizeContext

## Logic
1. `Props` - PropsWithChildren<{ mouseTracking?: boolean }>
2. `mouseTracking` - enable SGR mouse tracking (wheel + click/drag), default true
3. `AlternateScreen` - runs children in alternate screen buffer, constrained to viewport height
4. While mounted:
   - Enters alt screen (DEC 1049), clears it, homes cursor
   - Constrains own height to terminal row count
   - Overflow handled via overflow: scroll / flexbox (no native scrollback)
   - Optionally enables SGR mouse tracking
   - Events surface as ParsedKey (wheel) and update Ink instance's selection state (click/drag)
5. On unmount:
   - Disables mouse tracking
   - Exits alt screen, restoring main screen's content
   - Safe for ctrl-o transcript overlays and similar temporary fullscreen views
   - Main screen preserved
6. Notifies Ink instance via setAltScreenActive()
7. Renderer keeps cursor inside viewport (prevents cursor-restore LF from scrolling content)
8. signal-exit cleanup can exit alt screen if component's own unmount doesn't run
9. Uses useInsertionEffect (not useLayoutEffect) for timing
10. react-reconciler calls resetAfterCommit between mutation and layout commit phases
11. Ink's resetAfterCommit triggers onRender
12. With useLayoutEffect, first onRender fires BEFORE effect - writing full frame to main screen with altScreen=false
13. That frame preserved when we enter alt screen and revealed on exit as broken view
14. Insertion effects fire during mutation phase, before resetAfterCommit
15. ENTER_ALT_SCREEN reaches terminal before first frame does
16. Cleanup timing unchanged: both insertion and layout effect cleanups run in mutation phase on unmount
17. `PropsWithChildren`, `useContext`, `useInsertionEffect` - React hooks
18. `instances` - ink instances
19. `DISABLE_MOUSE_TRACKING`, `ENABLE_MOUSE_TRACKING`, `ENTER_ALT_SCREEN`, `EXIT_ALT_SCREEN` - DEC constants
20. `TerminalWriteContext` - terminal write context
21. `Box` - Box component
22. `TerminalSizeContext` - terminal size context

## Exports
- `Props` - props type
- `AlternateScreen` - alternate screen component
