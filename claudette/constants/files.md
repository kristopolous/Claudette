## Purpose
Identifies binary file extensions and detects binary content to skip text-based operations on non-text files.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: none

## Logic
Maintains a set of known binary file extensions grouped by category (images, videos, audio, archives, executables, documents, fonts, bytecode, databases, design files, etc.). Provides functions to check file paths by extension and to inspect buffer content for null bytes or high proportions of non-printable characters.

## Exports
- `BINARY_EXTENSIONS` - set of binary file extensions to skip for text operations
- `hasBinaryExtension` - checks if a file path has a known binary extension
- `isBinaryContent` - checks if a buffer contains binary content by looking for null bytes or non-printable character ratios
