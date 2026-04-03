## Purpose
Provides synchronized animations that automatically pause when offscreen.

## Imports
- **Stdlib**: none
- **External**: REACT (useContext, useEffect, useState)
- **Internal**: `components/ClockContext`, `dom`, `hooks/use-terminal-viewport`

## Logic
Combines the shared clock with viewport visibility detection. Subscribes to the clock as a keepAlive subscriber, meaning visible animations drive the clock for all other non-keepAlive subscribers. Automatically pauses when the element scrolls out of the viewport or when intervalMs is null. The clock slows when the terminal is blurred, so consumers do not need to handle focus state separately.

## Exports
- `useAnimationFrame` - returns a ref to attach to the animated element and the current animation time in milliseconds, pauses when offscreen or when intervalMs is null
