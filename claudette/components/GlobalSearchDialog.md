## Purpose
Provides a global search dialog that performs debounced ripgrep searches across the workspace.

## Imports
- **Stdlib**: `path` (resolve)
- **External**: REACT (useEffect, useRef, useState), REACT_COMPILER
- **Internal**: `useRegisterOverlay` (overlayContext), `useTerminalSize` (hooks), `Text` (ink), `logEvent` (analytics), `getCwd` (utils/cwd), `openFileInExternalEditor` (utils/editor), `truncatePathMiddle`, `truncateToWidth` (utils/format), `highlightMatch` (utils/highlightMatch), `relativePath` (utils/permissions/filesystem), `readFileInRange` (utils/readFileInRange), `ripGrepStream` (utils/ripgrep), `FuzzyPicker` (design-system), `LoadingState` (design-system)

## Logic
Registers as an overlay and listens for terminal size changes. Maintains debounced query input that triggers ripgrep streaming searches with abort control. Parses ripgrep output lines handling Windows drive letters, converts paths to relative, deduplicates and caps total matches. Shows file previews on focus by reading context lines around the match. Supports opening files in external editor or inserting file references into the prompt. Layout adapts preview position (right or bottom) based on terminal width.

## Exports
- `GlobalSearchDialog` - renders the global search fuzzy picker interface
- `parseRipgrepLine` - parses a ripgrep output line into file, line number, and text components
