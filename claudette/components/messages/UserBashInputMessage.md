## Purpose
Renders bash input commands extracted from XML-tagged content with a "!" prefix.

## Imports
- **Stdlib**: None
- **External**: react, @anthropic-ai/sdk
- **Internal**: ink (Box, Text), messages utils (extractTag)

## Logic
1. Extracts content from bash-input XML tag
2. Returns null if no input found
3. Renders with "!" prefix in bash border color and bash message background

## Exports
- `UserBashInputMessage` - React component rendering bash input commands with styled prefix
