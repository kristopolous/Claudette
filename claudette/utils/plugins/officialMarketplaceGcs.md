# utils/plugins/officialMarketplaceGcs

## Purpose
Fetches official marketplace from GCS mirror instead of git-cloning GitHub on every startup.

## Imports
- **Stdlib**: `path`
- **External**: `axios`
- **Internal**: fs/promises, bootstrap state, analytics, debug, dxt zip, errors

## Logic
1. Backend publishes marketplace-only zip alongside titanium squashfs, keyed by base repo SHA
2. Fetches `latest` pointer, compares against local sentinel, downloads+extracts when new SHA
3. `GCS_BASE` - CDN-fronted domain for public GCS bucket
4. `{sha}.zip` is content-addressed, CDN caches indefinitely
5. `latest` has Cache-Control: max-age=300, CDN staleness bounded
6. `ARC_PREFIX` - zip arc paths are seed-dir-relative
7. `fetchOfficialMarketplaceFromGcs` - fetches and extracts official marketplace
8. Idempotent - checks `.gcs-sha` sentinel before downloading ~3.5MB zip
9. Defense in depth: refuses paths outside marketplaces cache dir
10. Waits for scroll idle before network + zip extraction
11. Tracks outcome (noop/updated/failed), sha, bytes, errKind for telemetry
12. Fetches latest pointer (~40 bytes, backend sets Cache-Control: no-cache, max-age=300)
13. Compares against local `.gcs-sha` sentinel
14. Downloads zip if SHA changed, extracts to installLocation
15. Returns fetched SHA on success (including no-op), null on failure

## Exports
- `GCS_BASE` - GCS base URL constant
- `ARC_PREFIX` - archive prefix constant
- `fetchOfficialMarketplaceFromGcs` - fetches official marketplace from GCS
