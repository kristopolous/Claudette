# useDoublePress

## Purpose
Detects double-press patterns within a timeout window (800ms), calling different callbacks for first vs second press.

## Imports
- **Stdlib**: `useCallback`, `useEffect`, `useRef` from 'react'
- **External**: None
- **Internal**: None

## Logic
1. Tracks last press timestamp in a ref
2. Sets a timeout window (DOUBLE_PRESS_TIMEOUT_MS = 800ms)
3. First press: calls onFirstPress, sets pending state, starts timeout
4. Second press within window: calls onDoublePress, clears timeout
5. Timeout expiry: clears pending state

## Exports
- `useDoublePress` - Hook returning handler that detects double-press patterns
- `DOUBLE_PRESS_TIMEOUT_MS` - Constant (800ms) for timeout window
