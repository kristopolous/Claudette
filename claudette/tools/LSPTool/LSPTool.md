# tools/LSPTool/LSPTool.ts

## Purpose
Tool for performing Language Server Protocol (LSP) operations including go-to-definition, find-references, hover, document symbols, workspace symbols, call hierarchy, and implementation lookup.

## Imports
- **Stdlib**: `fs/promises`, `path`, `url`
- **External**: `zod/v4`, `vscode-languageserver-types`
- **Internal**: 
  - LSP service: `getInitializationStatus`, `getLspServerManager`, `isLspConnected`, `waitForInitialization`
  - Tool: `buildTool`, `ToolDef`, `ValidationResult`
  - Utils: `uniq`, `getCwd`, `logForDebugging`, `isENOENT`, `toError`, `execFileNoThrowWithCwd`, `getFsImplementation`, `lazySchema`, `logError`, `expandPath`, `checkReadPermissionForTool`, `PermissionDecision`
  - Local formatters: `formatDocumentSymbolResult`, `formatFindReferencesResult`, `formatGoToDefinitionResult`, `formatHoverResult`, `formatIncomingCallsResult`, `formatOutgoingCallsResult`, `formatPrepareCallHierarchyResult`, `formatWorkspaceSymbolResult`
  - Local constants: `DESCRIPTION`, `LSP_TOOL_NAME`
  - Local schemas: `lspToolInputSchema`
  - Local UI: `renderToolResultMessage`, `renderToolUseErrorMessage`, `renderToolUseMessage`, `userFacingName`

## Logic
1. Validates input against discriminated union schema for type safety
2. Checks file exists, is a regular file, and skips UNC paths for security
3. Verifies read permissions via permission system
4. Waits for LSP initialization if pending
5. Opens file in LSP server if not already open (with 10MB size limit)
6. Maps operation to LSP method and sends request to server
7. Handles special two-step process for incoming/outgoing calls
8. Filters out gitignored locations from results for efficiency
9. Formats results using specialized formatters
10. Errors are logged and returned in structured format

## Exports
- `LSPTool` - Main tool definition
- `Input` - Type for input (operation, filePath, line, character)
- `Output` - Type for output (operation, result, filePath, resultCount, fileCount)
