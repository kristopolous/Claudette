# utils/fingerprint

## Purpose
Computes 3-character fingerprint for Claudette attribution.

## Imports
- **Stdlib**: `crypto`
- **External**: (none)
- **Internal**: message types

## Logic
1. `FINGERPRINT_SALT` - '59cf53e54c78' (must match backend validation)
2. `extractFirstMessageText` - extracts text from first user message
3. Handles string content and content block arrays
4. Returns first text block content or empty string
5. `computeFingerprint` - computes 3-char hex fingerprint
6. Algorithm: SHA256(SALT + msg[4] + msg[7] + msg[20] + version)[:3]
7. Extracts chars at indices [4, 7, 20], uses '0' if not found
8. IMPORTANT: Do not change without coordination with 1P/3P APIs
9. `computeFingerprintFromMessages` - computes from message array
10. Uses MACRO.VERSION for version string
11. Used for Claudette attribution tracking

## Exports
- `FINGERPRINT_SALT` - fingerprint salt constant
- `extractFirstMessageText` - extracts first message text
- `computeFingerprint` - computes fingerprint from text
- `computeFingerprintFromMessages` - computes from messages
