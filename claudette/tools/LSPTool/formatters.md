# tools/LSPTool/formatters.ts

## Purpose

Provides formatting functions for LSP (Language Server Protocol) operation results. Converts various LSP response types (definitions, references, hover, symbols, call hierarchy) into human-readable strings for terminal display. Handles URI formatting, grouping by file, and conversion of LSP-specific data structures.

## Imports

- **Stdlib**: `path/relative`
- **External**: Types from `vscode-languageserver-types` (CallHierarchyIncomingCall, CallHierarchyItem, CallHierarchyOutgoingCall, DocumentSymbol, Hover, Location, LocationLink, MarkedString, MarkupContent, SymbolInformation, SymbolKind)
- **Internal**:
  - Debug: `logForDebugging`
  - Errors: `errorMessage`
  - Utils: `plural`, `lazySchema`

## Logic

**Core Utilities**:
- `formatUri(uri, cwd?)`: Converts file:// URIs to relative (or absolute) paths; handles Windows drive letters, URI decoding, and malformed data
- `groupByFile<T>(items, cwd?)`: Groups Location[] or SymbolInformation[] by file path
- `formatLocation(location, cwd?)`: Formats as `filePath:line:character` (1-based)
- `locationLinkToLocation(link)`: Converts LocationLink to Location
- `isLocationLink(item)`: Type guard distinguishes Location vs LocationLink
- `symbolKindToString(kind)`: Maps SymbolKind enum (1-26) to readable strings (File, Class, Function, etc.)

**Operation-Specific Formatters** (all export as `format*Result`):
- `formatGoToDefinitionResult`: Handles Location/LocationLink or arrays; filters invalid URIs; returns "Defined in..." or multi-location list
- `formatFindReferencesResult`: Returns grouped references by file with line:character positions
- `formatHoverResult`: Extracts text from MarkupContent/MarkedString; includes position if range present
- `formatDocumentSymbolResult`: Hierarchical document outline; supports both DocumentSymbol[] (recursive) and SymbolInformation[] (delegates to workspace formatter)
- `formatWorkspaceSymbolResult`: Flat workspace symbol list, grouped by file, with container names
- `formatPrepareCallHierarchyResult`: Formats CallHierarchyItem[] with location and detail
- `formatIncomingCallsResult`: Shows functions calling the target, grouped by file, with call sites
- `formatOutgoingCallsResult`: Shows functions called by the target, grouped by file, with call sites

All formatters handle null/empty results with helpful "no data" messages. Invalid/malformed LSP data is logged at debug level and filtered out.

## Exports

- `formatGoToDefinitionResult(result, cwd?): string`
- `formatFindReferencesResult(result, cwd?): string`
- `formatHoverResult(result, cwd?): string`
- `formatDocumentSymbolResult(result, cwd?): string`
- `formatWorkspaceSymbolResult(result, cwd?): string`
- `formatPrepareCallHierarchyResult(result, cwd?): string`
- `formatIncomingCallsResult(result, cwd?): string`
- `formatOutgoingCallsResult(result, cwd?): string`
