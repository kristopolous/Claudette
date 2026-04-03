## Purpose
Displays a notice when the user's prompt has been stashed and will auto-restore after submission.

## Imports
- **Stdlib**: none
- **External**: `figures`, REACT
- **Internal**: `ink`

## Logic
1. Receives a `hasStash` boolean prop
2. Returns null if no stash exists
3. Renders a dimmed text line with a pointer icon and "Stashed (auto-restores after submit)" message when a stash is present

## Exports
- `PromptInputStashNotice` - component that conditionally renders a stash status indicator
