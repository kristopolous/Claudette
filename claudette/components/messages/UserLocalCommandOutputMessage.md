## Purpose
Renders local command output (stdout and stderr) with diamond-prefixed formatting and special handling for cloud launch content.

## Imports
- **Stdlib**: None
- **External**: react
- **Internal**: ink (Box, Text, Markdown), MessageResponse, messages utils (extractTag), figures constants, messages constants

## Logic
1. Extracts stdout and stderr from local-command-stdout and local-command-stderr XML tags
2. Returns a "no content" message if neither exists
3. Wraps each non-empty output section in IndentedContent
4. IndentedContent detects cloud launch content (starting with diamond characters) and delegates to CloudLaunchContent
5. CloudLaunchContent parses the header line to extract label and suffix, rendering with bold label and dimmed rest

## Exports
- `UserLocalCommandOutputMessage` - React component rendering local command stdout/stderr
- `IndentedContent` - Internal component wrapping content with gutter or delegating to CloudLaunchContent
- `CloudLaunchContent` - Internal component parsing and rendering cloud launch formatted output
