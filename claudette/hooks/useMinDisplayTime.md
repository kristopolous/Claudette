## Purpose
Ensures each distinct value remains visible for at least `minMs`, preventing rapid flickering when values change quickly (e.g., progress text).

## Imports
- **Stdlib**: None
- **External**: REACT (`useEffect`, `useRef`, `useState`)
- **Internal**: None

## Logic
- Holds a `displayed` state value and `lastShownAtRef` timestamp.
- On effect triggered by `value` or `minMs` change:
  - If elapsed time since last shown >= `minMs`, update `displayed` immediately and reset timestamp.
  - Else, schedule a timeout for `minMs - elapsed`; when fired, updates `displayed` and timestamp.
  - Effect cleanup cancels any pending timeout to avoid late updates.
- Returns the current `displayed` value that respects the minimum display duration.

## Exports
- `useMinDisplayTime<T>` - hook accepting `(value: T, minMs: number)` and returning throttled `T`
