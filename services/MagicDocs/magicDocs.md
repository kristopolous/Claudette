# MagicDocs/magicDocs

## Purpose
Implements Magic Docs - automatically maintained markdown documentation files updated by background subagent.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: Tool, AgentTool types/runAgent, FileEditTool constants, FileReadTool, errors, fileStateCache, hooks, messages, sequential, MagicDocs prompts

## Logic
1. Magic Doc header pattern: `# MAGIC DOC: [title]` at file start
2. `ITALICS_PATTERN` - matches optional instructions on line after header
3. `MagicDocInfo` - tracks path for each magic doc
4. `trackedMagicDocs` - Map of tracked magic docs
5. `clearTrackedMagicDocs` - clears tracking map
6. `detectMagicDocHeader` - detects header, returns title and optional instructions
7. Matches header at start of file (first line)
8. Looks for italics on next line (after optional blank line)
9. Uses forked subagent with FileRead/FileEdit tools for updates
10. Registers post-sampling hook for periodic background updates
11. Clones file state cache for isolated subagent execution
12. `buildMagicDocsUpdatePrompt` - generates update prompt with conversation context

## Exports
- `MAGIC_DOC_HEADER_PATTERN` - regex for magic doc header detection
- `ITALICS_PATTERN` - regex for instructions detection
- `MagicDocInfo` - magic doc tracking type
- `clearTrackedMagicDocs` - clears tracking map
- `detectMagicDocHeader` - detects and parses magic doc header
