# shellConfig

## Purpose
Utilities for managing shell configuration files (.bashrc, .zshrc, config.fish). Used for finding, reading, and modifying claude aliases and PATH entries during installation and updates.

## Logic
1. `getShellConfigPaths` returns paths to zsh/bash/fish config files, respecting ZDOTDIR for zsh users
2. `filterClaudeAliases` removes installer-created claude aliases (pointing to $HOME/.claude/local/claude) while preserving custom user aliases
3. `findClaudeAlias` scans all shell config files for any `alias claude=` line, extracts and returns the target path
4. `findValidClaudeAlias` like findClaudeAlias but also verifies the target file exists and is executable (expands ~ to home dir)
5. `readFileLines`/`writeFileLines` — safe file I/O with fs.inaccessible error handling and datasync for durability
6. CLAUDE_ALIAS_REGEX matches lines starting with `alias claude=`

## Items

### getShellConfigPaths
**Type**: Function

### filterClaudeAliases
**Type**: Function

### readFileLines
**Type**: Function

### writeFileLines
**Type**: Function

### findClaudeAlias
**Type**: Function

### findValidClaudeAlias
**Type**: Function

### EnvLike
**Type**: Type alias

### ShellConfigOptions
**Type**: Type alias

## Exports
- CLAUDE_ALIAS_REGEX
- getShellConfigPaths
- filterClaudeAliases
- readFileLines
- writeFileLines
- findClaudeAlias
- findValidClaudeAlias

## Source
`shellConfig`