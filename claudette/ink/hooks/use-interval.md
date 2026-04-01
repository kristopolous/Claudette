## Purpose
Provides interval-based timing backed by a shared clock for synchronized animations and periodic callbacks.

## Imports
- **Stdlib**: none
- **External**: `react` (useContext, useEffect, useRef, useState)
- **Internal**: `components/ClockContext`

## Logic
Subscribes to the shared ClockContext rather than creating independent setInterval timers, consolidating all wake-ups into one. The useAnimationTimer hook returns clock time that updates at a given interval without keeping the clock alive on its own. The useInterval hook fires a callback at the specified interval, using a ref to always call the latest callback. Both pause when intervalMs is null.

## Exports
- `useAnimationTimer` - returns the clock time updated at the given interval, subscribes as non-keepAlive
- `useInterval` - executes a callback at the given interval, or pauses when intervalMs is null
