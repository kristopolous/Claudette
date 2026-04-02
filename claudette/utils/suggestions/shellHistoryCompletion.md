# shellHistoryCompletion

## Purpose
Provides shell command autocompletion from shell history. Caches history entries and matches user input against recent commands to produce ghost-text suffixes.

## Imports
- **Internal**: ../../history.js, ../debug.js

## Logic
1. Reads shell history entries via `getHistory()`, filtering for entries starting with `!` (bash history format)
2. Deduplicates and limits to 50 most recent unique commands
3. Caches results for 60 seconds (`CACHE_TTL_MS`) to avoid repeated async reads while typing
4. Matching is prefix-based: finds the first cached command that starts with the exact user input (including spaces)
5. `prependToShellHistoryCache` allows adding a new command to the front of the cache without a full re-read, deduping if already present

## Exports
- `ShellHistoryMatch` - type with `fullCommand` and `suffix` fields for completion ghost text
- `clearShellHistoryCache()` - resets the cache (call when history is updated externally)
- `prependToShellHistoryCache(command)` - adds a command to the front of the cache, deduping if present; no-op if cache not yet populated
- `getShellHistoryCompletion(input)` - async; returns the best matching command from history for the given input, or null if no match or input too short (< 2 chars)

## Source
`shellHistoryCompletion`
