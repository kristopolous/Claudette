# initReplBridge

## Purpose
REPL-specific wrapper around initBridgeCore that handles bootstrap state reading, gates, OAuth, git context, and title derivation.

## Imports
- **Stdlib**: `os`
- **External**: BUILDFLAGS feature flag
- **Internal**: bootstrap state, SDK types, GrowthBook, oauth, policy limits, auth, config, git, messages, permissions, sessionStorage, bridge modules

## Logic
1. Runtime gate check via `isBridgeEnabledBlocking()` - requires claude.ai subscription
2. OAuth token validation - returns null if no access token
3. Minimum version check for v1/v2 bridge paths
4. Policy limits check - respects org policy restrictions
5. Derives session title from conversation or uses explicit initialName
6. Handles perpetual mode and outbound-only mode flags
7. Tracks previously flushed UUIDs to avoid duplicate poisoning
8. Wires cse_ shim kill switch via GrowthBook gate

## Exports
- `InitBridgeOptions` - configuration interface for bridge initialization
- `initReplBridge` - main entry point returning ReplBridgeHandle or null
