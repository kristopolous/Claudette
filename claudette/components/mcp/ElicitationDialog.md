## Purpose
Handles MCP server elicitation requests, presenting form-based or URL-based dialogs for user input.

## Imports
- **Stdlib**: None
- **External**: `modelcontextprotocol/sdk/types` (ElicitRequestFormParams, ElicitRequestURLParams, ElicitResult, PrimitiveSchemaDefinition), `figures`, REACT (useCallback, useEffect, useMemo, useRef, useState), REACT_COMPILER
- **Internal**: `context/overlayContext` (useRegisterOverlay), `hooks/useNotifyAfterTimeout`, `hooks/useTerminalSize`, `ink` (Box, Text, useInput), `keybindings/useKeybinding`, `services/mcp/elicitationHandler` (ElicitationRequestEvent), `utils/browser` (openBrowser), `utils/mcp/elicitationValidation` (getEnumLabel, getEnumValues, getMultiSelectLabel, getMultiSelectValues, isDateTimeSchema, isEnumSchema, isMultiSelectEnumSchema, validateElicitationInput, validateElicitationInputAsync), `utils/stringUtils` (plural), `ConfigurableShortcutHint`, `design-system/Byline` (Byline), `design-system/Dialog` (Dialog), `design-system/KeyboardShortcutHint` (KeyboardShortcutHint), `TextInput`

## Logic
1. Routes between ElicitationFormDialog (form mode) and ElicitationURLDialog (URL mode) based on event.params.mode
2. ElicitationFormDialog renders form fields from requestedSchema with support for text, boolean, enum, multi-select, and date/datetime types
3. Implements scroll windowing for large forms with visible field range calculation
4. Handles keyboard navigation (up/down arrows, enter, escape, space, backspace) for field traversal and value manipulation
5. Supports accordion-style dropdowns for enum and multi-select fields with typeahead search
6. Performs sync and async validation with debouncing for date fields
7. Shows resolving spinners for fields being validated asynchronously
8. ElicitationURLDialog displays URL with highlighted domain, handles accept/decline in prompt phase, and shows waiting state with reopen/action/cancel buttons
9. Manages abort signals for cancellation during elicitation

## Exports
- `ElicitationDialog` - main elicitation component that routes to form or URL dialog
