## Purpose
Provides a UI hook that manages the state and interaction logic for file permission dialogs including option generation, feedback handling, and keyboard shortcuts.

## Imports
- **Stdlib**: none
- **External**: REACT (useCallback, useMemo, useState)
- **Internal**: `useAppState`, `useKeybindings`, `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS`, `logEvent`, `sanitizeToolNameForAnalytics`, `PermissionUpdate`, `CompletionType`, `ToolUseConfirm`, `FileOperationType`, `getFilePermissionOptions`, `PermissionOption`, `PermissionOptionWithLabel`, `PERMISSION_HANDLERS`, `PermissionHandlerParams`

## Logic
1. Generates permission options dynamically based on file path, operation type, and tool permission context
2. Manages accept/reject feedback input modes with state tracking for whether feedback mode was entered
3. Routes option selection through shared permission handlers with parsed input and feedback
4. Wraps toolUseConfirm.onAllow to pass the parsed input instead of raw input
5. Registers keyboard shortcuts for cycling permission modes via the keybindings system
6. Resets input modes when navigating away from an option if no text was typed

## Exports
- `ToolInput` - interface for generic tool input objects
- `UseFilePermissionDialogProps` - type defining hook input parameters
- `UseFilePermissionDialogResult` - type defining hook return value
- `useFilePermissionDialog` - hook that returns options, handlers, feedback state, and input mode state for file permission dialogs
