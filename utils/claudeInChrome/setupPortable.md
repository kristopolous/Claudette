# utils/claudeInChrome/setupPortable

## Purpose
Provides portable Chrome extension detection and setup utilities.

## Imports
- **Stdlib**: `fs/promises`, `os`, `path`
- **External**: (none)
- **Internal**: errors

## Logic
1. `CHROME_EXTENSION_URL` - 'https://claude.ai/chrome'
2. `PROD_EXTENSION_ID` - 'fcoeoabgfenejglbffodgkkbkcdhcgfn'
3. `DEV_EXTENSION_ID` - 'dihbgbndebgnbjfmelmegjepbnkhlgni'
4. `ANT_EXTENSION_ID` - 'dngcpimnedloihjnnfngkgjoidhnaolf'
5. `getExtensionIds` - returns extension IDs based on USER_TYPE
6. Ant users get all three IDs, external users get production only
7. `ChromiumBrowser` type - chrome, brave, arc, chromium, edge, vivaldi, opera
8. `BrowserPath` - browser and path tuple
9. `BROWSER_DETECTION_ORDER` - detection priority order
10. `CHROMIUM_BROWSERS` - browser data paths for detection
11. macOS, Linux, Windows path configurations
12. `isChromeExtensionInstalledPortable` - checks if extension installed
13. Scans browser data directories for extension folders
14. Matches against known extension IDs
15. Returns true if any extension ID found in any browser
16. Handles fs inaccessible errors gracefully

## Exports
- `CHROME_EXTENSION_URL` - extension URL constant
- `getExtensionIds` - gets extension IDs
- `ChromiumBrowser` - browser type
- `BrowserPath` - browser path type
- `isChromeExtensionInstalledPortable` - checks extension installation
