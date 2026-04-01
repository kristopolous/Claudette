## Purpose
Displays diagnostic issues (errors, warnings) from files with file paths, line numbers, and severity indicators.

## Imports
- **Stdlib**: `path`
- **External**: `react`
- **Internal**: `ink`, `DiagnosticTrackingService`, `MessageResponse`, `CtrlOToExpand`, attachment and cwd utilities

## Logic
1. Returns null if no diagnostic files are present in the attachment
2. Calculates total issue count across all files
3. In verbose mode, renders each file with its relative path and all diagnostics including severity symbol, line/column, message, code, and source
4. In non-verbose mode, renders a summary showing issue count and file count with a ctrl+o expand hint
5. Strips file:// and _claude_fs_right: URI prefixes for display, showing the scheme as a label when present

## Exports
- `DiagnosticsDisplay` - renders diagnostic issues from a diagnostics attachment, showing verbose details or a compact summary based on the verbose flag
