## Purpose
Generates a kebab-case session name from conversation using Claude Haiku.

## Imports
- **External**: None
- **Internal**: API queryHaiku, message/text extraction, session title utils

## Logic
Extracts conversation text, sends to Haiku with system prompt asking for 2-4 word kebab-case name. Requests JSON output with 'name' field. Parses response, extracts name. Errors are logged at debug level (not error) since this runs automatically and shouldn't flood logs. Returns null on any failure.

## Exports
- `generateSessionName` - Async function generating name from messages
