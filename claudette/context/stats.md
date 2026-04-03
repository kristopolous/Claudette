# stats

## Purpose
Provides UI context and hooks for stats/metrics collection with counters, histograms, and sets.

## Imports
- **Stdlib**: (none)
- **External**: REACT_COMPILER, REACT
- **Internal**: config utils

## Logic
1. `StatsStore` interface with increment, set, observe, add, getAll methods
2. `percentile` - calculates percentile from sorted array
3. `Histogram` type with reservoir sampling (Algorithm R, size 1024)
4. `createStatsStore` - factory creating store with metrics/histograms/sets maps
5. `observe` - reservoir sampling for memory-bounded distribution tracking
6. `add` - adds unique values to named sets
7. `getAll` - returns all metrics with calculated histogram stats (count, min, max, mean, p50, p95, p99)
8. `StatsProvider` - provides stats store via context
9. `useStats` - hook to get stats store
10. `useStatsStore` - returns store, throws if outside provider

## Exports
- `StatsStore` - interface for stats collection
- `createStatsStore` - factory for creating stats store
- `StatsProvider` - provider component
- `useStats` - hook to get stats store
