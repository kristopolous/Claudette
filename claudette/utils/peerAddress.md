# peerAddress

## Purpose
Parses peer address strings into a scheme + target tuple. Kept separate from `peerRegistry.ts` so that `SendMessageTool` can import `parseAddress` without transitively loading the bridge (axios) and UDS (fs, net) modules at tool-enumeration time.

## Imports
- (none)

## Logic
1. If address starts with `uds:`, returns `{ scheme: 'uds', target: remainder }`
2. If address starts with `bridge:`, returns `{ scheme: 'bridge', target: remainder }`
3. If address starts with `/` (bare socket path), routes it as `uds` scheme — this handles legacy old-code UDS senders that emit bare socket paths in `from=`. No bare-session-ID fallback exists because bridge messaging is new enough that no old senders exist, and the prefix would hijack teammate names like `session_manager`
4. Otherwise returns `{ scheme: 'other', target: to }`

## Exports
- `parseAddress(to: string): { scheme: 'uds' | 'bridge' | 'other', target: string }` — Parses a URI-style or bare socket path address into a typed scheme and target string

## Source
`peerAddress`
