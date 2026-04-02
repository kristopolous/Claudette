# workloadContext

## Purpose
Turn-scoped workload tag via AsyncLocalStorage. Used to mark background/async work (e.g. cron jobs) so downstream code can identify the workload context. Isolated from bootstrap/state.ts to avoid pulling async_hooks into the browser SDK bundle.

## Imports
- **Stdlib**: `async_hooks` (AsyncLocalStorage)

## Logic
1. `Workload` type — currently only `'cron'` is valid. Server-side sanitizer accepts lowercase `[a-z0-9_-]{0,32}` only
2. `WORKLOAD_CRON` — constant `'cron'`
3. `workloadStorage` — AsyncLocalStorage holding `{ workload: string | undefined }`, providing per-turn isolation that survives awaits (unlike a global mutable slot, which would be clobbered by void-detached background agents)
4. `getWorkload()` — returns current workload tag from AsyncLocalStorage store, or undefined
5. `runWithWorkload(workload, fn)` — wraps `fn` in a new ALS context boundary. Always calls `.run()` even when workload is undefined, to prevent context leakage from previous turns (e.g. REPL re-render chains that capture stale ALS at scheduling time)

## Exports
- `Workload` — type alias for workload tag strings (currently `'cron'`)
- `WORKLOAD_CRON` — constant `'cron'`
- `getWorkload` — returns current workload tag from ALS context
- `runWithWorkload` — wraps a function in a workload ALS context boundary

## Source
`workloadContext`
