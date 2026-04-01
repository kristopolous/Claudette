# utils/browser

## Purpose
Provides cross-platform utilities for opening files, folders, and URLs in browser.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: execFileNoThrow

## Logic
1. `validateUrl` - validates URL format and protocol
2. Accepts only http:// and https:// protocols
3. Throws Error for invalid format or protocol
4. `openPath` - opens file/folder using system default handler
5. Windows: uses `explorer` command
6. macOS: uses `open` command
7. Linux: uses `xdg-open` command
8. Returns boolean for success/failure
9. `openBrowser` - opens URL in browser
10. Validates URL before opening
11. Respects BROWSER environment variable
12. Windows: uses BROWSER env or `rundll32 url,OpenURL`
13. macOS: uses BROWSER env or `open`
14. Linux: uses BROWSER env or `xdg-open`
15. Quotes URL for Windows browser commands
16. Returns boolean for success/failure

## Exports
- `validateUrl` - validates URL format
- `openPath` - opens file/folder path
- `openBrowser` - opens URL in browser
