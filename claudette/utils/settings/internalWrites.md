# internalWrites

## Purpose
Tracks timestamps of in-process settings-file writes so the chokidar file watcher can ignore its own echoes, breaking a circular dependency between settings.ts and changeDetector.ts.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none — zero-import module by design to avoid cycles)

## Logic
Maintains a `Map<string, number>` of file paths to write timestamps. When the settings module writes a file, it calls `markInternalWrite` before the write. When chokidar fires a change event, `consumeInternalWrite` checks if the path was recently marked. If so, the change is suppressed as an internal echo. Marks are consumed on match (deleted from the map) so subsequent external changes are not suppressed.

## Exports
- `markInternalWrite(path)` — records the current timestamp for a file path before an internal write
- `consumeInternalWrite(path, windowMs)` — returns true if the path was marked within the given time window; consumes (deletes) the mark on match
- `clearInternalWrites()` — clears all stored marks
