# sessionUrl

## Purpose
Parses session resume identifiers which can be a URL, plain UUID, or JSONL file path. Handles Windows path edge cases (e.g., C:\path\file.jsonl parsed as URL with C: protocol) by checking .jsonl extension before URL parsing.

## Logic
1. Checks for .jsonl extension first — if found, returns a ParsedSessionUrl with isJsonlFile=true, generates a random session ID
2. Checks if input is a plain UUID via validateUuid — if so, returns it as sessionId with isUrl=false
3. Attempts URL parsing — if valid, returns the full URL as ingressUrl with a random session ID
4. Returns null if none of the above match

## Items

### parseSessionIdentifier
**Type**: Function

### ParsedSessionUrl
**Type**: Type alias

## Exports
- ParsedSessionUrl
- parseSessionIdentifier

## Source
`sessionUrl`