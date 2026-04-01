# utils/secureStorage/plainTextStorage

## Purpose
Provides plain text storage implementation (fallback for non-macOS platforms).

## Imports
- **Stdlib**: `fs`, `path`
- **External**: (none)
- **Internal**: envUtils, errors, fsOperations, JSON utils, secureStorage types

## Logic
1. `getStoragePath` - gets storage directory and path
2. Storage dir: getClaudeConfigHomeDir()
3. Storage file: .credentials.json
4. `plainTextStorage` - storage implementation
5. name: 'plaintext'
6. `read()` - sync read from file
7. Returns jsonParse of file content, null on error
8. `readAsync()` - async read from file
9. Returns jsonParse of file content, null on error
10. `update()` - sync update to file
11. Creates storage dir if needed (ignores EEXIST)
12. Writes JSON with 0o600 permissions (owner read/write only)
13. Returns { success: true, warning: 'Warning: Storing credentials in plaintext.' }
14. Returns { success: false } on error
15. `delete()` - sync delete of file
16. Returns true on success or ENOENT (file doesn't exist)
17. Returns false on other errors

## Exports
- `plainTextStorage` - plain text storage implementation
