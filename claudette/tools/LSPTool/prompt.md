# tools/LSPTool/prompt.ts

## Purpose

Exports constants defining the LSP tool's display name and description. The description documents all supported LSP operations, their required parameters, and important notes about server configuration.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic

- `LSP_TOOL_NAME`: Constant string `'LSP'` (as const) - used as user-facing tool name
- `DESCRIPTION`: Multi-line template literal containing:
  - **Overview**: "Interact with Language Server Protocol (LSP) servers to get code intelligence features."
  - **Supported Operations** (9 listed):
    1. `goToDefinition` - Find where a symbol is defined
    2. `findReferences` - Find all references to a symbol
    3. `hover` - Get hover information (documentation, type info)
    4. `documentSymbol` - Get all symbols in a document
    5. `workspaceSymbol` - Search symbols across workspace
    6. `goToImplementation` - Find implementations of interface/abstract method
    7. `prepareCallHierarchy` - Get call hierarchy item at position
    8. `incomingCalls` - Find functions/methods that call this function
    9. `outgoingCalls` - Find functions/methods called by this function
  - **Required Parameters** (all operations):
    - `filePath`: The file to operate on
    - `line`: Line number (1-based, as shown in editors)
    - `character`: Character offset (1-based, as shown in editors)
  - **Note**: LSP servers must be configured for the file type; errors returned if no server available

## Exports

- `LSP_TOOL_NAME: 'LSP'`
- `DESCRIPTION: string`
