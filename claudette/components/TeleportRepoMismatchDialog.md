## Purpose
Displays a dialog when teleporting to a repository that has a path mismatch, allowing the user to select a valid checkout path.

## Imports
- **Stdlib**: None
- **External**: react, react/compiler-runtime
- **Internal**: ink (Box, Text), utils/file (getDisplayPath), utils/githubRepoPathMapping (removePathFromRepo, validateRepoAtPath), CustomSelect/index (Select), design-system/Dialog (Dialog), Spinner (Spinner)

## Logic
1. Maintains state for available paths, error messages, and validation status
2. When a path is selected, validates that the path contains the correct repository
3. If validation fails, removes the invalid path from the list and shows an error
4. Renders a Select with options for each available path plus a cancel option
5. Shows a spinner during validation and an error message if present
6. If no valid paths remain, instructs the user to run teleport from a checkout of the target repo

## Exports
- `TeleportRepoMismatchDialog` - React component for resolving repository path mismatches during teleport
