# utils/markdownConfigLoader

## Purpose
Provides markdown configuration file loading for commands, agents, skills, etc.

## Imports
- **Stdlib**: `fs`, `fs/promises`, `os`, `path`
- **External**: BUILDFLAGS, `lodash-es/memoize`
- **Internal**: analytics, bootstrap state, debug, envUtils, errors, file, frontmatterParser, git, permissions permissionSetup, ripgrep, settings constants/managedPath/pluginOnlyPolicy

## Logic
1. `CLAUDE_CONFIG_DIRECTORIES` - commands, agents, output-styles, skills, workflows, templates
2. `ClaudeConfigDirectory` - config directory type
3. `MarkdownFile` - { filePath, baseDir, frontmatter, content, source }
4. `extractDescriptionFromMarkdown` - extracts description from first non-empty line
5. Strips header prefix if present, limits to 100 chars
6. `parseToolListString` - parses tools from frontmatter (string or array)
7. Supports both string and array formats
8. `loadMarkdownConfig` - loads markdown config files
9. Discovers files in CLAUDE_CONFIG_DIRECTORIES
10. Parses frontmatter from markdown files
11. Handles managed, user, project, local settings sources
12. `loadCommandsFromMarkdown` - loads commands from markdown
13. `loadAgentsFromMarkdown` - loads agents from markdown
14. `loadSkillsFromMarkdown` - loads skills from markdown
15. `loadOutputStylesFromMarkdown` - loads output styles from markdown
16. `loadWorkflowsFromMarkdown` - loads workflows from markdown
17. `loadTemplatesFromMarkdown` - loads templates from markdown

## Exports
- `CLAUDE_CONFIG_DIRECTORIES` - config directory names
- `ClaudeConfigDirectory` - config directory type
- `MarkdownFile` - markdown file type
- `extractDescriptionFromMarkdown` - extracts description
- `parseToolListString` - parses tool list
- `loadMarkdownConfig` - loads markdown config
- `loadCommandsFromMarkdown` - loads commands
- `loadAgentsFromMarkdown` - loads agents
- `loadSkillsFromMarkdown` - loads skills
- `loadOutputStylesFromMarkdown` - loads output styles
- `loadWorkflowsFromMarkdown` - loads workflows
- `loadTemplatesFromMarkdown` - loads templates
