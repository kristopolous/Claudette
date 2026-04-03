## Purpose
A tabbed navigation component with keyboard navigation, controlled/uncontrolled modes, scrollable content, and header focus management.

## Imports
- **Stdlib**: none
- **External**: REACT, REACT_COMPILER
- **Internal**: `useIsInsideModal`, `useModalScrollRef`, `useTerminalSize`, `ScrollBox`, `KeyboardEvent`, `stringWidth`, `Box`, `Text`, `useKeybindings`, `Theme`

## Logic
Manages selected tab index in controlled or uncontrolled mode, calculates tab widths for layout, handles keyboard navigation via keybindings for next/previous tabs, supports header focus state with opt-in gating for child components, and renders tab headers with active highlighting and scrollable content area with optional fixed height.

## Exports
- `Tabs` - renders a tabbed interface with navigable headers and content panels
- `Tab` - individual tab content panel that only renders when selected
- `useTabsWidth` - hook returning the content area width from Tabs context
- `useTabHeaderFocus` - hook for child components to opt into header focus gating and receive focus control callbacks
