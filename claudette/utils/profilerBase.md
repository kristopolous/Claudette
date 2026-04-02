# profilerBase

## Purpose
Shared infrastructure for profiler modules (startupProfiler, queryProfiler, headlessProfiler), providing lazy-loaded performance API and common timeline formatting.

## Imports
- **Stdlib**: `perf_hooks` (lazy-loaded)
- **Internal**: `./format` (formatFileSize)

## Logic
1. `perf_hooks.performance` is a process-wide singleton; lazy-loaded only when profiling is enabled to avoid startup cost
2. All profilers share the same timeline format: `[+  total.ms] (+  delta.ms) name [extra] [| RSS: .., Heap: ..]`
3. `totalPad`/`deltaPad` control column alignment (startup uses 8/7, query uses 10/9)

## Exports
- `getPerformance()` - lazy-loads and returns the perf_hooks performance singleton
- `formatMs(ms)` - formats milliseconds to 3 decimal places
- `formatTimelineLine(totalMs, deltaMs, name, memory, totalPad, deltaPad, extra?)` - renders a single timeline line with optional memory info (RSS, Heap)