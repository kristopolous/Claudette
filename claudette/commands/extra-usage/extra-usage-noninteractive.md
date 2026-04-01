## Purpose
Non-interactive variant of /extra-usage for headless sessions.

## Imports
- **External**: None
- **Internal**: runExtraUsage core function

## Logic
Synchronous-like wrapper around runExtraUsage(). Returns a text message for non-interactive CLI usage. Shows either:
- Browser-open confirmation with URL
- Direct URL to visit
- Status message about admin requests or unlimited usage

Used when running in non-interactive mode (e.g. CI or script).

## Exports
- `call` - Local command function returning {type: 'text', value: string}
