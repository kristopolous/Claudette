## Purpose
Perform a security-focused code review of pending changes on the current branch.

## Imports
- **Internal**: Frontmatter parser, markdown config loader, shell execution utility, createMovedToPluginCommand helper

## Logic
1. Uses createMovedToPluginCommand wrapper for plugin migration path
2. Contains extensive SECURITY_REVIEW_MARKDOWN with:
   - Allowed tools: git diff/status/log/show, Read, Glob, Grep, LS, Task
   - Detailed security review methodology (3 phases)
   - Categories to examine (injection, auth, crypto, data exposure, etc.)
   - Severity and confidence guidelines
   - False positive filtering rules (16 hard exclusions)
   - Required markdown output format with examples
3. Parses frontmatter to extract allowed tools
4. Executes shell commands in prompt to gather git diff data
5. Command delegates actual review to Claude with comprehensive security instructions

## Exports
- `default` - Command created by createMovedToPluginCommand, may redirect to plugin
