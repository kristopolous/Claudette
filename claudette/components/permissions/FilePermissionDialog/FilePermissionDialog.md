## Purpose
Renders a file permission dialog that requests user approval for file operations with support for IDE diffs, symlink warnings, and feedback input.

## Imports
- **Stdlib**: `path` (relative)
- **External**: REACT
- **Internal**: `useDiffInIDE`, `Box`, `Text`, `ToolUseContext`, `getLanguageName`, `getCwd`, `getFsImplementation`, `safeResolvePath`, `expandPath`, `CompletionType`, `Select`, `ShowInIDEPrompt`, `usePermissionRequestLogging`, `PermissionDialog`, `ToolUseConfirm`, `WorkerBadgeProps`, `IDEDiffSupport`, `FileOperationType`, `PermissionOption`, `ToolInput`, `useFilePermissionDialog`

## Logic
1. Derives language name from file path for logging purposes
2. Resolves symlink targets and generates warnings for symlinks pointing outside the working directory
3. Sets up IDE diff configuration when supported, transforming edits through the IDE diff support interface
4. Delegates option management and input handling to useFilePermissionDialog hook
5. Renders either ShowInIDEPrompt when showing diff in IDE, or PermissionDialog with select options inline
6. Logs permission request events and handles accept/reject with optional feedback

## Exports
- `FilePermissionDialogProps` - type defining all props for the file permission dialog
- `FilePermissionDialog` - generic component that renders a file operation permission request with diff preview and option selection
