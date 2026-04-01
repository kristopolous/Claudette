## Purpose
Registers the remote-control command metadata with feature flag and enablement check.

## Imports
- **Internal**: `isBridgeEnabled`, `Command` type

## Logic
`isEnabled` checks that the `BRIDGE_MODE` feature flag is on and `isBridgeEnabled()` returns true (checks license/auth). Defines command with type 'local-jsx', name 'remote-control', aliases ['rc'], description, argumentHint '[name]', `isEnabled`, `isHidden` (same condition), immediate: true, lazy loads './bridge.js'.

## Exports
- `default` - The bridge (remote-control) command object
