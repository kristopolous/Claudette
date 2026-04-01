# services/api/errorUtils

## Purpose
Extracts connection error details from Anthropic SDK error chains.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`
- **Internal**: (none)

## Logic
1. `SSL_ERROR_CODES` - Set of OpenSSL error codes for SSL/TLS errors
2. Includes: certificate verification, self-signed, chain, hostname, handshake errors
3. `ConnectionErrorDetails` - code, message, isSSLError
4. `extractConnectionErrorDetails` - walks error cause chain
5. SDK wraps underlying errors in cause property
6. Walks up to maxDepth (5) to find root error with code
7. Checks if code is in SSL_ERROR_CODES set
8. Returns { code, message, isSSLError } or null
9. Handles Error instances with cause chains
10. Prevents infinite loops with depth limit

## Exports
- `SSL_ERROR_CODES` - set of SSL error codes
- `ConnectionErrorDetails` - error details type
- `extractConnectionErrorDetails` - extracts details from error chain
