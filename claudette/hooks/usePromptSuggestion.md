# usePromptSuggestion

## Purpose
Manages AI prompt suggestions, tracking display, acceptance, and logging engagement telemetry.

## Imports
- **Stdlib**: `useCallback`, `useRef` from 'REACT'
- **External**: None
- **Internal**: `useTerminalFocus`, `logEvent`, `abortSpeculation`, `useAppState`, `useSetAppState`

## Logic
1. Returns suggestion only when assistant is not responding and input is empty
2. Tracks focus state when suggestion appears (wasFocusedWhenShown)
3. Records first keystroke timing while suggestion is visible
4. markShown/markAccepted track user engagement timestamps
5. logOutcomeAtSubmission determines acceptance (Tab press or matching Enter) and logs telemetry

## Exports
- `usePromptSuggestion` - Hook returning suggestion, markAccepted, markShown, logOutcomeAtSubmission
