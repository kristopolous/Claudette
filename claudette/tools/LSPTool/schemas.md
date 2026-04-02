# tools/LSPTool/schemas.ts

## Purpose

Defines Zod schemas and TypeScript types for validating and typing the inputs to the LSPTool (Language Server Protocol operations). Supports 9 different LSP operations using a discriminated union pattern with `operation` as the discriminator.

## Imports

- **Stdlib**: None
- **External**: `z` from 'zod/v4'
- **Internal**: `lazySchema` (utility for lazy schema evaluation)

## Logic

- **`lspToolInputSchema`**: Lazy-evaluated discriminated union schema
  - Uses `z.strictObject()` for each operation type
  - All operations share these required fields:
    - `filePath`: string (absolute or relative path)
    - `line`: positive integer (1-based, editor-style)
    - `character`: positive integer (1-based character offset)
  - Supported operations (9 total):
    1. `goToDefinition` - Find definition location of a symbol
    2. `findReferences` - Find all references to a symbol
    3. `hover` - Get hover info (documentation, type)
    4. `documentSymbol` - Get all symbols in a document
    5. `workspaceSymbol` - Search symbols across workspace
    6. `goToImplementation` - Find implementation locations
    7. `prepareCallHierarchy` - Prepare call hierarchy item
    8. `incomingCalls` - Find functions calling this one
    9. `outgoingCalls` - Find functions called by this one
- **`LSPToolInput`**: TypeScript type inferred from `lspToolInputSchema` using `z.infer<ReturnType<typeof ...>>`
- **`isValidLSPOperation(operation: string)`**: Type guard that checks if a string is one of the 9 valid operation names; narrows type to `LSPToolInput['operation']`

## Exports

- `lspToolInputSchema: z.ZodEffects<...>` (lazy schema)
- `LSPToolInput: type`
- `isValidLSPOperation(operation: string): operation is LSPToolInput['operation']`
