# utils/caCerts

## Purpose
Loads CA certificates for TLS connections with custom CA configuration support.

## Imports
- **Stdlib**: (none)
- **External**: `lodash-es/memoize`, `tls` (dynamic)
- **Internal**: debug, envUtils, fsOperations

## Logic
1. `getCACertificates` - memoized function loading CA certificates
2. Checks `--use-system-ca` or `--use-openssl-ca` Node options
3. Checks `NODE_EXTRA_CA_CERTS` environment variable
4. Returns undefined when no custom CA config needed (runtime defaults)
5. Behavior matrix:
   - Neither set: undefined (runtime defaults)
   - NODE_EXTRA_CA_CERTS only: bundled Mozilla CAs + extra cert file
   - --use-system-ca only: system CAs
   - Both: system CAs + extra cert file
6. Deferred tls module load (~750KB heap cost) only when needed
7. `getCACertificates('system')` - Bun API for system CAs
8. Falls back to tls.rootCertificates if system CA unavailable
9. Under Node.js without extra certs, returns undefined for native handling
10. Always includes base CAs since `ca` option replaces defaults
11. Memoized for performance, clearCACertsCache() invalidates after env changes
12. Reads only NODE_EXTRA_CA_CERTS (populated from settings.json at init)

## Exports
- `getCACertificates` - memoized function loading CA certificates
