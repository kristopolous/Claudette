## Purpose
Renders user command messages extracted from XML-tagged content, displaying skill names or command arguments with pointer prefix.

## Imports
- **Stdlib**: None
- **External**: REACT, @anthropic-ai/sdk, figures
- **Internal**: ink (Box, Text), messages utils (extractTag), xml constants

## Logic
1. Extracts command message and command args from XML tags
2. Detects skill format (skill-format="true") and renders as "Skill(name)"
3. For standard format, joins command message and args with "/" prefix
4. Renders with subtle pointer prefix and user message background

## Exports
- `UserCommandMessage` - UI component rendering user command messages with skill or standard formatting
