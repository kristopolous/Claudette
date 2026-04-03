# ink/components/Box

## Purpose
Provides Box component - essential Ink layout component like flexbox div.

## Imports
- **Stdlib**: (none)
- **External**: REACT, REACT_COMPILER, `type-fest`
- **Internal**: ink global.d, ink dom, ink events click-event/focus-event/keyboard-event, ink styles, ink warn

## Logic
1. `Props` - extends Styles (excluding textWrap)
2. Includes ref, tabIndex, autoFocus, onClick, onFocus, onFocusCapture, onBlur, onBlurCapture, onKeyDown, onKeyDownCapture, onMouseEnter, onMouseLeave
3. `tabIndex` - tab order index for Tab/Shift+Tab cycling
4. tabIndex >= 0 participates in cycling, -1 means programmatically focusable only
5. `autoFocus` - focuses element on mount (like HTML autofocus attribute)
6. FocusManager calls focus(node) during reconciler's commitMount phase
7. `onClick` - fired on left-button click (press + release without drag)
8. Only works inside <AlternateScreen> where mouse tracking enabled
9. Event bubbles from deepest hit Box up through ancestors
10. Call event.stopImmediatePropagation() to stop bubbling
11. `onFocus`, `onFocusCapture`, `onBlur`, `onBlurCapture` - focus event handlers
12. `onKeyDown`, `onKeyDownCapture` - keyboard event handlers
13. `onMouseEnter` - fired when mouse moves into Box's rendered rect
14. Like DOM mouseenter, does NOT bubble
15. Moving between children does not re-fire on parent
16. Only works inside <AlternateScreen> where mode-1003 mouse tracking enabled
17. `onMouseLeave` - fired when mouse moves out of Box's rendered rect
18. `Box` - essential Ink component for layout, like <div style="display: flex">
19. Uses REACT_COMPILER runtime (_c) for memoization
20. Extracts props: children, flexWrap, flexDirection, flexGrow, flexShrink, ref, tabIndex, autoFocus, etc.
21. `PropsWithChildren`, `Ref` - React types
22. `Except` - type-fest utility
23. `DOMElement` - DOM element type
24. `ClickEvent`, `FocusEvent`, `KeyboardEvent` - event types
25. `Styles` - styles type
26. `warn` - warn utilities

## Exports
- `Props` - box props type
- `Box` - box component
