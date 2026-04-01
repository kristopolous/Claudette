# utils/displayTags

## Purpose
Strips XML-like display tags from text for UI titles.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: (none)

## Logic
1. `XML_TAG_BLOCK_PATTERN` - matches `<tag>…</tag>` blocks (lowercase tag names)
2. Only matches lowercase tags so user prose with JSX/HTML passes through
3. Non-greedy body with backreferenced closing tag keeps adjacent blocks separate
4. `stripDisplayTags` - strips XML tag blocks from text
5. Returns original if stripping would result in empty text
6. Used for UI titles (/rewind, /resume, bridge session titles)
7. Strips IDE metadata, hook output, task notifications
8. `stripDisplayTagsAllowEmpty` - strips tags, returns empty if all tags
9. Used by getLogDisplayTitle for command-only prompts
10. Used by extractTitleText to skip pure-XML messages
11. `IDE_CONTEXT_TAGS_PATTERN` - matches ide_opened_file, ide_selection tags
12. `stripIdeContextTags` - strips only IDE context tags
13. Used by textForResubmit to preserve user-typed content

## Exports
- `stripDisplayTags` - strips XML tag blocks
- `stripDisplayTagsAllowEmpty` - strips tags allowing empty result
- `stripIdeContextTags` - strips IDE context tags only
