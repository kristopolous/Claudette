# useVimInput

## Purpose
Vim-style text input handler wrapping useTextInput with vim modal editing (INSERT/NORMAL modes), operators, and motions.

## Imports
- **Stdlib**: `useCallback`, `useState` from 'REACT'
- **External**: None
- **Internal**: `Key`, `VimInputState`, `VimMode`, `Cursor`, `lastGrapheme`, vim operators and transitions, `useTextInput`

## Logic
1. Manages vim state machine: INSERT and NORMAL modes
2. Handles Esc to switch from INSERT to NORMAL mode
3. Arrow keys delegate to base handler in idle state
4. Maps arrow keys to vim motions (hjkl) in NORMAL mode
5. Implements dot-repeat via replayLastChange
6. Tracks last change for dot-repeat (. command)
7. Handles register (paste) operations
8. Supports operator-pending state and count prefixes

## Exports
- `useVimInput` - Hook returning VimInputState with vim-enhanced onInput and mode
