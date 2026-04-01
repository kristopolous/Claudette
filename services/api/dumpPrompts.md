# services/api/dumpPrompts

## Purpose
Dumps API prompts to JSONL files for debugging and /issue command support.

## Imports
- **Stdlib**: `crypto`, `fs/promises`, `path`
- **External**: `@anthropic-ai/sdk`
- **Internal**: bootstrap state, envUtils, JSON utils

## Logic
1. `hashString` - SHA256 hash for change detection
2. `MAX_CACHED_REQUESTS` (5) - caches last few API requests for ant users
3. `cachedApiRequests` - array of { timestamp, request }
4. `DumpState` - tracks initialized, messageCountSeen, lastInitDataHash, lastInitFingerprint
5. `lastInitFingerprint` - cheap proxy for change detection (skips expensive stringify+hash)
6. `dumpState` - Map keyed by session ID
7. `getLastApiRequests` - returns cached requests copy
8. `clearApiRequestCache` - clears request cache
9. `clearDumpState`, `clearAllDumpState` - clears dump state
10. `addApiRequestToCache` - adds request to cache (ant-only)
11. `getDumpPromptsPath` - gets JSONL file path in config home
12. `appendToFile` - appends entries to file (creates dir if needed)
13. `initFingerprint` - creates fingerprint from tools/system for change detection

## Exports
- `getLastApiRequests` - gets cached API requests
- `clearApiRequestCache` - clears request cache
- `clearDumpState`, `clearAllDumpState` - clears dump state
- `addApiRequestToCache` - adds request to cache
- `getDumpPromptsPath` - gets dump prompts file path
