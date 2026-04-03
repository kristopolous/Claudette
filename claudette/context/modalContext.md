# modalContext

## Purpose
Provides UI context for modal slot sizing and scroll management within FullscreenLayout.

## Imports
- **Stdlib**: (none)
- **External**: REACT_COMPILER, REACT
- **Internal**: ScrollBoxHandle type

## Logic
1. `ModalContext` - context set by FullscreenLayout when rendering modal slot
2. Modal is absolute-positioned bottom-anchored pane for slash-command dialogs
3. Consumers use context to:
   - Suppress top-level framing (Pane skips full-terminal-width Divider)
   - Size Select pagination to available rows (modal smaller than terminal)
   - Reset scroll on tab switch (Tabs keys ScrollBox by selectedTabIndex)
4. `useIsInsideModal` - returns true if inside modal context
5. `useModalOrTerminalSize` - returns modal rows/columns or fallback terminal size
6. `useModalScrollRef` - returns scroll ref for scroll control

## Exports
- `ModalContext` - UI context for modal sizing/scroll
- `useIsInsideModal` - checks if component is inside modal
- `useModalOrTerminalSize` - gets modal or terminal dimensions
- `useModalScrollRef` - gets modal scroll box reference
