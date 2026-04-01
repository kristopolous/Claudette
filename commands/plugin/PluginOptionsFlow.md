## Purpose
Walks user through post-install/post-enable plugin configuration steps.

## Imports
- **External**: React
- **Internal**: PluginOptionsDialog, plugin utilities (options storage, MCP config)

## Logic
Given a LoadedPlugin, collects all unconfigured options from:
- Top-level manifest.userConfig  
- Per-channel (assistant mode) userConfig

Builds a step array where each step represents a configurable schema with load/save functions. Renders PluginOptionsDialog sequentially for each step. Immediately calls onDone('skipped') if nothing needs configuration.

## Exports
- `PluginOptionsFlow` - Component that orchestrates multi-step configuration
- `findPluginOptionsTarget` - Helper to locate a plugin after installation
