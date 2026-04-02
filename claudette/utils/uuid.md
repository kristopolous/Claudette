# uuid

## Purpose
UUID validation and agent ID generation utilities.

## Imports
- **Stdlib**: `crypto` (randomBytes, UUID type)
- **Internal**: `src/types/ids` (AgentId type)

## Logic
1. `uuidRegex` — validates UUID format: 8-4-4-4-12 lowercase hex digits (case-insensitive)
2. `validateUuid(maybeUuid)` — returns the string cast as `UUID` if it matches the regex, null otherwise; returns null for non-string inputs
3. `createAgentId(label?)` — generates a prefixed agent ID using 8 random bytes (16 hex chars). Format: `a{suffix}` (e.g. `aa3f2c1b4d5e6f7a8`) or `a{label}-{suffix}` (e.g. `acompact-a3f2c1b4d5e6f7a8`). Returns type `AgentId`

## Exports
- `validateUuid` — validates and returns UUID or null
- `createAgentId` — generates a prefixed random agent ID

## Source
`uuid`
