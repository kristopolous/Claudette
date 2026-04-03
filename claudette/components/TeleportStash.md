## Purpose
Handles git stash operations when switching branches during teleport, prompting the user to stash uncommitted changes.

## Imports
- **Stdlib**: none
- **External**: REACT (useEffect, useState), `figures`
- **Internal**: `ink` (Box, Text), `utils/debug` (logForDebugging), `utils/git` (GitFileStatus type, getFileStatus, stashToCleanState), `components/CustomSelect` (Select), `components/design-system/Dialog`, `components/Spinner`

## Logic
1. Loads git file status on mount to identify tracked and untracked changed files
2. Displays a dialog listing the changed files (or a count if more than 8)
3. Offers the user options to stash changes and continue or exit
4. On stash selection, calls stashToCleanState with an auto-stash message and proceeds on success
5. Shows loading spinner while checking git status or performing stash, and displays errors if operations fail

## Exports
- `TeleportStash` - prompts the user to stash uncommitted git changes before switching branches during teleport
