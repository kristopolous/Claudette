## Purpose
Provides access to primitive tools that are hidden from direct inference provider use when REPL mode is enabled but still accessible inside the REPL VM context.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `Tool`, `AgentTool`, `BashTool`, `FileEditTool`, `FileReadTool`, `FileWriteTool`, `GlobTool`, `GrepTool`, `NotebookEditTool`

## Logic
Implements a lazy getter that caches and returns an array of primitive tool instances. The lazy pattern avoids circular dependency initialization errors that would occur with top-level const declarations due to the import chain through collapseReadSearch, FileReadTool, and the tool registry.

## Exports
- `getReplPrimitiveTools` - returns the cached array of primitive tools accessible in REPL mode
