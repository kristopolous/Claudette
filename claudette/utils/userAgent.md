# userAgent

## Purpose
User-Agent string helper. Kept dependency-free so SDK-bundled code (bridge, cli/transports) can import without pulling in `auth.ts` and its transitive dependency tree.

## Imports
- (none)

## Logic
Returns a User-Agent string in the format `claude-code/<VERSION>` where `MACRO.VERSION` is a build-time constant injected by the bundler.

## Exports
- `getClaudeCodeUserAgent()` — returns the User-Agent string (e.g. `claude-code/2.1.70`)
