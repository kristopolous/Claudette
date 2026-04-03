## Purpose
Renders image attachments in user messages as clickable links when terminal supports hyperlinks.

## Imports
- **Stdlib**: url (pathToFileURL)
- **External**: REACT
- **Internal**: ink (Box, Text, Link), MessageResponse, imageStore utils, supports-hyperlinks utils

## Logic
1. Generates label from image ID ("[Image #N]" or "[Image]")
2. Retrieves stored image path and checks hyperlink support
3. Renders as clickable Link if image exists and terminal supports hyperlinks, otherwise as plain text
4. Wraps in MessageResponse for connected styling, or adds margin if image starts a new turn

## Exports
- `UserImageMessage` - UI component rendering image attachments with optional hyperlink support
