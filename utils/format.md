# utils/format

## Purpose
Provides display formatters for file sizes, durations, and numbers.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: intl

## Logic
1. `formatFileSize` - formats bytes to KB/MB/GB
2. Returns "X bytes" for < 1KB, "X.XKB" for < 1MB, etc.
3. Strips trailing .0 for cleaner display
4. `formatSecondsShort` - formats ms as seconds with 1 decimal
5. Always keeps decimal for sub-minute timings (TTFT, hook durations)
6. `formatDuration` - formats ms to human-readable duration
7. Options: hideTrailingZeros, mostSignificantOnly
8. Handles days, hours, minutes, seconds with carry-over
9. Special case for 0 and sub-second durations
10. `formatNumber` - formats number with locale separators
11. `formatPercentage` - formats as percentage
12. `formatTimestamp` - formats Date to locale string
13. `formatRelativeTime` - formats relative time (e.g., "2 hours ago")
14. Uses getRelativeTimeFormat and getTimeZone from intl utils

## Exports
- `formatFileSize` - formats file size
- `formatSecondsShort` - formats seconds short
- `formatDuration` - formats duration
- `formatNumber` - formats number
- `formatPercentage` - formats percentage
- `formatTimestamp` - formats timestamp
- `formatRelativeTime` - formats relative time
