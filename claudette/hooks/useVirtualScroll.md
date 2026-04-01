## Purpose
Virtualizes large lists inside a ScrollBox by mounting only visible items plus overscan, dramatically reducing memory usage and render cost for long conversations.

## Imports
- **External**: `react` (useCallback, useDeferredValue, useLayoutEffect, useMemo, useRef, useSyncExternalStore)
- **Internal**:
  - `../ink/components/ScrollBox.js` (ScrollBoxHandle)
  - `../ink/dom.js` (DOMElement)

## Logic
- **Height cache**: Map of itemKey → measured Yoga height; updated in useLayoutEffect from mounted DOM nodes
- **Offsets array**: cumulative heights (0 .. totalHeight); rebuilt lazily from cache + DEFAULT_ESTIMATE (3) for unknown items
- **Scroll subscription**: useSyncExternalStore with quantized snapshot (SCROLL_QUANTUM = 40 rows) to avoid excessive commits; sticky encoded via sign bit
- **Range computation**:
  - Cold start: render last COLD_START_COUNT items (sticky assumed)
  - Sticky: walk backward from tail to cover viewport + OVERSCAN_ROWS (80)
  - Normal: binary search offsets to find start, then extend end until coverage ≥ viewportH + 2×overscan; unmeasured items use PESSIMISTIC_HEIGHT (1) to ensure coverage
- **Resize scaling**: on column change, scale cached heights by oldCols/newCols ratio; bump offsetVersion; skip measurement for 2 renders to avoid pre-resize Yoga pollution
- **Fast scroll cap**: when scroll velocity > 2×viewportH, limit range growth by SLIDE_STEP (25) to bound fresh mount count
- **Deferred rendering**: useDeferredValue to time-slice expensive range growth; sticky and downward scroll bypass deferral
- **Clamp bounds**: setClampBounds on ScrollBox so scrollTop stays within mounted content during async re-renders; sticky disables clamp
- **Measurement refs**: stable per-key callback refs capture item elements and their Yoga heights on layout; also measure topSpacer to establish listOrigin (accounting for pre-list siblings)

Constants: DEFAULT_ESTIMATE=3, OVERSCAN_ROWS=80, COLD_START_COUNT=30, SCROLL_QUANTUM=40, PESSIMISTIC_HEIGHT=1, MAX_MOUNTED_ITEMS=300, SLIDE_STEP=25

## Exports
- `useVirtualScroll` - Hook `(scrollRef: RefObject<ScrollBoxHandle | null>, itemKeys: readonly string[], columns: number) => VirtualScrollResult`
- `VirtualScrollResult` type with:
  - `range: [start, end)`
  - `topSpacer, bottomSpacer: number`
  - `measureRef: (key: string) => (el: DOMElement | null) => void`
  - `spacerRef: RefObject<DOMElement | null>`
  - `offsets: ArrayLike<number>`
  - `getItemTop(index): number`
  - `getItemElement(index): DOMElement | null`
  - `getItemHeight(index): number | undefined`
  - `scrollToIndex(i): void`
