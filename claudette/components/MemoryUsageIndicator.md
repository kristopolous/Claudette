## Purpose
Monitors and displays a warning indicator when memory usage is high or critical.

## Imports
- **Stdlib**: none
- **External**: react (React)
- **Internal**: ../hooks/useMemoryUsage.js (useMemoryUsage), ../ink.js (Box, Text), ../utils/format.js (formatFileSize)

## Logic
Uses the useMemoryUsage hook to poll heap usage every 10 seconds. Renders nothing when memory status is normal or when not in the internal build. When usage is high or critical, displays the formatted heap size with color-coded warning or error styling and includes a /heapdump debugging link.

## Exports
- `MemoryUsageIndicator` - shows a high memory usage warning with heap size and debug link
