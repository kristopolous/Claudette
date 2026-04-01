## Purpose
Computes human-readable age and freshness information for memory files based on their modification time.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Calculates days elapsed since a memory file's modification time using floor-rounded division, clamping negative values to zero. Produces human-readable age strings that help models reason about memory staleness. Generates staleness warnings for memories older than one day, available as plain text or wrapped in system-reminder tags. Fresh warnings are suppressed for memories from today or yesterday to avoid noise.

## Exports
- `memoryAgeDays` - returns the number of whole days since a memory's modification time, clamped to zero
- `memoryAge` - returns a human-readable age string such as "today", "yesterday", or "N days ago"
- `memoryFreshnessText` - returns a plain-text staleness warning for memories older than one day, or empty string
- `memoryFreshnessNote` - returns a staleness warning wrapped in system-reminder tags for memories older than one day, or empty string
