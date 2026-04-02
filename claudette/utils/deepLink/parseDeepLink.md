# parseDeepLink

## Purpose
Parses `claude-cli://open` deep link URIs into structured actions with strict validation and sanitization against control characters, path traversal, and oversized inputs.

## Imports
- **Internal**: `../sanitization` (partiallySanitizeUnicode)

## Logic
1. Normalizes the URI to accept both `claude-cli://` and `claude-cli:` (without double-slash).
2. Parses with `new URL()`, validates hostname is `open`.
3. Extracts `cwd`, `repo`, and `q` query params with validation:
   - `cwd` must be an absolute path (Unix or Windows), no control chars, max 4096 chars.
   - `repo` must match `^[\w.-]+\/[\w.-]+$` (alphanumerics, dots, hyphens, underscores, exactly one slash).
   - `q` (query) is trimmed, Unicode-sanitized, no control chars, max 5000 chars (chosen to stay within Windows cmd.exe 8191-char limit after shell escaping).
4. `buildDeepLink` constructs a `claude-cli://open` URL from a `DeepLinkAction` object.
5. `containsControlChars` is a private helper checking for ASCII 0x00-0x1F and 0x7F.

Constants: `MAX_QUERY_LENGTH` = 5000, `MAX_CWD_LENGTH` = 4096, `REPO_SLUG_PATTERN` = `/^[\w.-]+\/[\w.-]+$/`.

## Exports
- `DEEP_LINK_PROTOCOL` - constant string `'claude-cli'`
- `DeepLinkAction` - type with optional fields: `query?`, `cwd?`, `repo?`
- `parseDeepLink` - parses a URI string into a `DeepLinkAction`, throws on malformed/dangerous input
- `buildDeepLink` - builds a `claude-cli://open` URL string from a `DeepLinkAction`

## Source
`claude-code/src/utils/deepLink/parseDeepLink.ts`
