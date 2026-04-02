# xml

## Purpose
Escapes XML/HTML special characters for safe interpolation of untrusted strings (process stdout, user input, external data) into XML element text content and attribute values.

## Imports
(none)

## Logic
1. `escapeXml(s)` — escapes `&` → `&amp;`, `<` → `&lt;`, `>` → `&gt;`. Use for text content between tags: `<tag>${escapeXml(s)}</tag>`
2. `escapeXmlAttr(s)` — calls `escapeXml(s)` then additionally escapes `"` → `&quot;` and `'` → `&apos;`. Use for attribute values: `<tag attr="${escapeXmlAttr(s)}">`

## Exports
- `escapeXml` — escapes &, <, > for safe text content interpolation
- `escapeXmlAttr` — escapes &, <, >, ", ' for safe attribute value interpolation

## Source
`xml`
