# zipCacheAdapters

## Purpose
I/O helpers for the plugin zip cache. Handles reading/writing zip-cache-local metadata files, extracting ZIPs to session directories, and creating ZIPs for newly installed plugins. Designed for ephemeral container environments with mounted persistent volumes.

## Imports
- **Stdlib**: fs/promises, path
- **Internal**: ../debug, ../slowOperations, ./marketplaceManager, ./schemas, ./zipCache

## Logic
1. `readZipCacheKnownMarketplaces()` reads known_marketplaces.json from the zip cache with schema validation. Returns empty object on any failure (shared mounted volume — other containers may write corrupted data).
2. `writeZipCacheKnownMarketplaces()` writes atomically via `atomicWriteToZipCache()`.
3. `readMarketplaceJson()` reads a marketplace JSON from the zip cache by name, validates against PluginMarketplaceSchema.
4. `saveMarketplaceJsonToZipCache()` reads marketplace.json content from an install location and saves it to the zip cache. For directory sources, checks `.claude-plugin/marketplace.json` then `marketplace.json`. For URL sources, the installLocation IS the JSON file.
5. `syncMarketplacesToZipCache()` syncs all marketplace data to zip cache for offline access. Saves marketplace JSONs, then merges with previously cached data so ephemeral containers can access marketplaces without re-cloning.

## Exports
- `readZipCacheKnownMarketplaces` - Reads known_marketplaces.json from zip cache, returns empty object on failure
- `writeZipCacheKnownMarketplaces` - Atomically writes known_marketplaces.json to zip cache
- `readMarketplaceJson` - Reads a marketplace JSON from zip cache by name, validates schema
- `saveMarketplaceJsonToZipCache` - Saves marketplace JSON from install location to zip cache
- `syncMarketplacesToZipCache` - Syncs all marketplace data to zip cache for offline/ephemeral container access

## Source
`zipCacheAdapters`
