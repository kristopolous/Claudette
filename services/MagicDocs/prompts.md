# MagicDocs/prompts

## Purpose
Provides prompt templates for Magic Docs documentation updates.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: envUtils, fsOperations

## Logic
1. `getUpdatePromptTemplate` - returns main update prompt template
2. Emphasizes: NOT part of user conversation, no references to "magic docs" in content
3. Updates based on NEW learnings from conversation (EXCLUDING update instruction)
4. Shows current doc content in `<current_doc_content>` tags
5. CRITICAL RULES: preserve header exactly, preserve italics, keep CURRENT (not changelog)
6. Update IN-PLACE, remove outdated info, fix errors, keep organized
7. DOCUMENTATION PHILOSOPHY: terse, high signal, overviews/architecture/entry points
8. What TO document: architecture, patterns, entry points, design decisions, dependencies
9. What NOT to document: obvious code info, exhaustive lists, implementation details
10. `loadMagicDocsPrompt` - loads custom prompt from ~/.claude/magic-docs/prompt.md
11. Falls back to default template if custom prompt missing
12. Variable substitution: {{docPath}}, {{docContents}}, {{docTitle}}, {{customInstructions}}

## Exports
- `getUpdatePromptTemplate` - returns default update prompt
- `loadMagicDocsPrompt` - loads custom prompt from file
- `substituteVariables` - substitutes {{variable}} syntax in template
