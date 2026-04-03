## Purpose
Public API surface for the Claudette terminal UI, re-exporting components, hooks, types, and utilities for building terminal interfaces.

## Imports
- **External**: REACT
- **Internal**: `ink/components/design-system/*`, `ink/root`, `ink/dom`, `ink/events/*`, `ink/focus`, `ink/frame`, `ink/hooks/*`, `ink/measure-element`, `ink/termio/osc`, `ink/wrap-text`

## Logic
Wraps all render calls with a ThemeProvider so themed components work without manual mounting. Provides `render` and `createRoot` functions that delegate to the internal Ink reconciler with theme wrapping. Re-exports all public components (Box, Text, Button, Link, etc.), hooks (useInput, useApp, useStdin, etc.), event types, and utility types for consumers.

## Exports
- `RenderOptions` - options for rendering
- `Instance` - instance type returned by render
- `Root` - root type returned by createRoot
- `render` - renders a React node to the terminal with theme wrapping
- `createRoot` - creates a root with theme-wrapped render method
- `color` - color utility from design system
- `Box` - themed box component
- `Text` - themed text component
- `ThemeProvider` - theme provider component
- `usePreviewTheme` - hook for preview theme
- `useTheme` - hook for current theme
- `useThemeSetting` - hook for theme setting
- `Ansi` - raw ANSI component
- `BaseBox` - base box component
- `Button` - button component
- `Link` - link component
- `Newline` - newline component
- `NoSelect` - non-selectable region component
- `RawAnsi` - raw ANSI content component
- `Spacer` - spacer component
- `BaseText` - base text component
- `DOMElement` - DOM element type
- `ClickEvent` - click event class
- `EventEmitter` - event emitter class
- `Event` - base event class
- `Key` - key type
- `InputEvent` - input event class
- `TerminalFocusEventType` - terminal focus event type
- `TerminalFocusEvent` - terminal focus event class
- `FocusManager` - focus manager class
- `FlickerReason` - flicker reason type
- `useAnimationFrame` - animation frame hook
- `useApp` - app context hook
- `useInput` - input handling hook
- `useAnimationTimer` - animation timer hook
- `useInterval` - interval hook
- `useSelection` - selection hook
- `useStdin` - stdin context hook
- `useTabStatus` - tab status hook
- `useTerminalFocus` - terminal focus hook
- `useTerminalTitle` - terminal title hook
- `useTerminalViewport` - terminal viewport hook
- `measureElement` - element measurement utility
- `supportsTabStatus` - tab status support check
- `wrapText` - text wrapping utility
