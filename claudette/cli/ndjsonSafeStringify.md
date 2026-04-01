# ndjsonSafeStringify

## Purpose
Provides JSON.stringify wrapper that escapes JavaScript line terminators (U+2028, U+2029) for safe NDJSON transport.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: slowOperations jsonStringify

## Logic
1. Standard JSON.stringify emits U+2028/U+2029 raw (valid per ECMA-404)
2. JavaScript line-terminator semantics (ECMA-262) treat \n \r U+2028 U+2029 as line breaks
3. NDJSON receivers splitting on line terminators will cut JSON mid-string
4. `\uXXXX` escape form is equivalent JSON but never mistaken for line terminator
5. Single regex with alternation for efficient escape (one dispatch per match)
6. ProcessTransport silently skips non-JSON lines but truncated fragments are still lost

## Exports
- `ndjsonSafeStringify` - JSON.stringify with escaped line terminators for NDJSON safety
