# ink/components/App

## Purpose
Provides main App component for Ink terminal rendering.

## Imports
- **Stdlib**: (none)
- **External**: REACT
- **Internal**: bootstrap state, utils debug/earlyInput/envUtils/fullscreen/log, ink events emitter/input-event/terminal-event, ink parse-keypress/reconciler/selection/terminal/terminal-focus-state/terminal-querier, ink termio csi/dec, ink components AppContext/ClockContext/CursorDeclarationContext/ErrorOverview/StdinContext/TerminalFocusContext/TerminalSizeContext

## Logic
1. `SUPPORTS_SUSPEND` - true for non-Windows platforms
2. `STDIN_RESUME_GAP_MS` (5000) - stdin silence gap before mode re-assert
3. Catches tmux detach→attach, ssh reconnect, laptop wake
4. Terminal resets DEC private modes but no signal reaches us
5. 5s well above normal inter-keystroke gaps, short enough for first scroll after reattach
6. `Props` - { children, stdin, stdout, stderr, exitOnCtrlC, onExit, terminalColumns, terminalRows, selection, onSelectionChange, onClickAt, onHoverAt, getHyperlinkAt, onOpenHyperlink, onMultiClick, onSelectionDrag, onStdinResume?, onDeclaredCursor? }
7. `App` - extends PureComponent
8. Manages terminal input parsing and event dispatch
9. Handles keyboard, mouse, focus events
10. Manages text selection state
11. Handles cursor declaration
12. Manages terminal modes (kitty keyboard, mouse tracking, modify other keys)
13. Handles process suspension (SIGSTOP/SIGCONT) on Unix
14. Re-asserts terminal modes on stdin resume after gap
15. `updateLastInteractionTime` - updates last interaction time
16. `logForDebugging` - debug logging
17. `stopCapturingEarlyInput` - stops early input capture
18. `isEnvTruthy` - checks env truthy
19. `isMouseClicksDisabled` - checks if mouse clicks disabled
20. `logError` - logs error
21. `EventEmitter` - event emitter class
22. `InputEvent` - input event class
23. `TerminalFocusEvent` - terminal focus event class
24. `INITIAL_STATE`, `ParsedInput`, `ParsedKey`, `ParsedMouse`, `parseMultipleKeypresses` - parse-keypress utilities
25. `reconciler` - Ink reconciler
26. `finishSelection`, `hasSelection`, `SelectionState`, `startSelection` - selection utilities
27. `isXtermJs`, `setXtversionName`, `supportsExtendedKeys` - terminal utilities
28. `getTerminalFocused`, `setTerminalFocused` - terminal focus state
29. `TerminalQuerier`, `xtversion` - terminal querier
30. `DISABLE_KITTY_KEYBOARD`, `DISABLE_MODIFY_OTHER_KEYS`, `ENABLE_KITTY_KEYBOARD`, `ENABLE_MODIFY_OTHER_KEYS`, `FOCUS_IN`, `FOCUS_OUT` - CSI constants
31. `DBP`, `DFE`, `DISABLE_MOUSE_TRACKING`, `EBP`, `EFE`, `HIDE_CURSOR`, `SHOW_CURSOR` - DEC constants
32. `AppContext` - app context
33. `ClockProvider` - clock provider
34. `CursorDeclarationContext`, `CursorDeclarationSetter` - cursor declaration context
35. `ErrorOverview` - error overview component
36. `StdinContext` - stdin context
37. `TerminalFocusProvider` - terminal focus provider
38. `TerminalSizeContext` - terminal size context

## Exports
- `SUPPORTS_SUSPEND` - supports suspend constant
- `STDIN_RESUME_GAP_MS` - stdin resume gap constant
- `Props` - props type
- `App` - App component
