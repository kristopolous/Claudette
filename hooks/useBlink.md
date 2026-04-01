# useBlink

## Purpose
Synchronized blinking animations that pause when terminal is offscreen, with all instances blinking in sync.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `useAnimationFrame`, `useTerminalFocus`, `DOMElement`

## Logic
1. Uses useAnimationFrame with intervalMs to drive blink cycle
2. Only animates when enabled AND terminal is focused
3. Derives isVisible from shared animation clock (all instances sync together)
4. Returns ref to attach to animated element

## Exports
- `useBlink` - Hook returning [ref, isVisible] tuple
