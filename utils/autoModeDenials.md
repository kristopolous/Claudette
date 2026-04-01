# utils/autoModeDenials

## Purpose
Tracks commands recently denied by the auto mode classifier.

## Imports
- **Stdlib**: (none)
- **External**: `bun:bundle`
- **Internal**: (none)

## Logic
1. `AutoModeDenial` - toolName, display, reason, timestamp
2. `display` - human-readable description of denied command (e.g., bash command string)
3. `DENIALS` - array of recent denials (max 20)
4. `MAX_DENIALS` (20) - maximum denials to track
5. `recordAutoModeDenial` - records a denial, prepends to array
6. Feature-gated with TRANSCRIPT_CLASSIFIER
7. Trims array to MAX_DENIALS after adding
8. `getAutoModeDenials` - returns current denials array
9. Populated from useCanUseTool.ts
10. Read from RecentDenialsTab.tsx in /permissions UI

## Exports
- `AutoModeDenial` - denial record type
- `recordAutoModeDenial` - records auto mode denial
- `getAutoModeDenials` - gets recent denials
