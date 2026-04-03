## Purpose
Displays the capabilities (tools, resources, prompts) available on an MCP server.

## Imports
- **Stdlib**: None
- **External**: REACT, REACT_COMPILER
- **Internal**: `ink` (Box, Text), `design-system/Byline` (Byline)

## Logic
1. Builds a capabilities array based on which counts are greater than zero (tools, resources, prompts)
2. Renders a "Capabilities:" label followed by the list of capabilities or "none"
3. Uses Byline component to format the capabilities list

## Exports
- `CapabilitiesSection` - renders a summary of an MCP server's available capabilities
