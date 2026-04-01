## Purpose
Display trust warning to users before installing plugins.

## Imports
- **External**: React, figures
- **Internal**: `getPluginTrustMessage` from marketplace helpers

## Logic
Shows a warning message emphasizing that plugins can contain arbitrary code (MCP servers, file access) and Anthropic doesn't verify their behavior. Displays custom message from marketplace helper if present (e.g. enterprise warnings). Styled with warning icon and dimmed italic text.

Rendered during plugin installation flow to ensure user awareness.

## Exports
- `PluginTrustWarning` - Component that displays the trust warning banner
