# crypto

## Purpose
Indirection point for the package.json "browser" field. When bun builds browser-sdk.js with `--target browser`, this file is swapped for `crypto.browser.ts` — avoiding a ~500KB crypto-browserify polyfill. Node/bun builds use this file unchanged. Uses explicit import-then-export (not re-export syntax) to avoid a bun bytecode linking bug.

## Imports
- **Stdlib**: `crypto` (node built-in)

## Logic
1. Imports `randomUUID` from node's `crypto` module
2. Re-exports it explicitly (not via `export { randomUUID } from 'crypto'` syntax) to avoid a bun bytecode compilation bug where the binding doesn't link

## Exports
- `randomUUID` - Re-exported from node's `crypto` module, generates RFC4122 v4 UUIDs

## Source
`crypto`
