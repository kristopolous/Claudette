# sessionTitle

## Purpose
Generates AI-powered sentence-case session titles using Haiku LLM. Single source of truth for AI-generated titles across all surfaces (SDK print path, CCR remote session path). Designed as a standalone module with minimal dependencies to avoid pulling in React/STYLER/git chains when imported from print.ts.

## Logic
1. `extractConversationText` flattens message arrays into text, skipping meta/non-human messages, tail-slicing to last 1000 chars so recent context wins
2. `generateSessionTitle` sends the description to Haiku with a JSON schema prompt requesting a 3-7 word sentence-case title, parses the response with zod, logs analytics event, returns null on any error
3. Uses lazySchema for the zod schema to avoid circular imports
4. Reflects session mode via `getIsNonInteractiveSession()` in the Haiku query options

## Items

### extractConversationText
**Type**: Function

### generateSessionTitle
**Type**: Function

## Exports
- extractConversationText
- generateSessionTitle

## Source
`sessionTitle`