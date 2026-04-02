# reconciler

## Purpose
Marketplace reconciler — makes known_marketplaces.json consistent with declared intent in settings. Two layers: diff comparison and bundled diff + install.

## Imports
- **Stdlib**: lodash-es/isEqual, path
- **Internal**: ../../bootstrap/state, ../debug, ../errors, ../file, ../git, ../log, ./marketplaceManager, ./schemas

## Logic
1. `diffMarketplaces()` compares declared marketplaces (from settings) against materialized state (known_marketplaces.json). Resolves relative paths before comparing using git canonical root for worktree stability. Special case: `sourceIsFallback` entries skip source comparison (presence suffices).
2. `reconcileMarketplaces()` is the main idempotent, additive operation. Loads declared and materialized state, computes diff, then processes missing (install) and sourceChanged (update) entries through `addMarketplaceSource()`. Supports skip callback for zip-cache mode and progress events. Guards against non-existent local paths in multi-checkout scenarios.
3. `normalizeSource()` resolves relative directory/file paths against the canonical git root (not worktree cwd) so known_marketplaces.json entries remain stable across worktrees.

## Exports
- `MarketplaceDiff` - Type: `{ missing: string[], sourceChanged: Array<{name, declaredSource, materializedSource}>, upToDate: string[] }`
- `diffMarketplaces` - Compares declared vs materialized marketplace state, returns diff
- `ReconcileOptions` - Type: `{ skip?: (name, source) => boolean, onProgress?: (event) => void }`
- `ReconcileProgressEvent` - Type: union of installing/installed/failed events
- `ReconcileResult` - Type: `{ installed, updated, failed, upToDate, skipped: string[] }`
- `reconcileMarketplaces` - Makes known_marketplaces.json consistent with declared intent. Idempotent, additive, never deletes.

## Source
`reconciler`
