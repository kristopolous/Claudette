## Purpose
Format plugin error messages and provide guidance for resolution.

## Imports
- **External**: None
- **Internal**: `getPluginErrorMessage` from types, error type definitions

## Logic
Two main functions:
- `formatErrorMessage(error)` - Converts PluginError into user-readable message via switch on error.type
- `getErrorGuidance(error)` - Returns actionable hint to resolve the error (or null)

Handles error types: path-not-found, git auth/timeout, network, manifest issues, plugin/marketplace problems, MCP config, hooks, components, dependency issues, LSP errors, cache misses, etc.

Centralizes error handling for plugin system.

## Exports
- `formatErrorMessage` - Format error into message string
- `getErrorGuidance` - Get user guidance for error resolution
