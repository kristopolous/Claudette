# sandbox-ui-utils

## Purpose
UI utilities for sandbox violations — cleaning up error messages for display.

## Imports
- (none)

## Logic
1. `removeSandboxViolationTags` - Strips `<sandbox_violations>...</sandbox_violations>` XML-style tag blocks from text using a global regex, used to clean up error messages before displaying them in the UI

## Exports
- `removeSandboxViolationTags(text: string): string` - Removes all `<sandbox_violations>` tag blocks (including content between open/close tags) from the input text

## Source
`sandbox-ui-utils`
