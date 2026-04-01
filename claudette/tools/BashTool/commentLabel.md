# BashTool/commentLabel.ts

## Purpose

Extracts a human-readable label from a bash command if the first line is a comment (starting with `#` but not `#!` shebang). Used in fullscreen mode to display a concise tool-use label and collapse-group indicator. This is effectively the note Claude wrote for the human.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic

- `extractBashCommentLabel(command): string | undefined`:
  - Finds first newline; takes first line (or entire command if no newline)
  - Trims whitespace
  - If line starts with `#` but not `#!`, returns the comment text with leading `#` characters and optional space removed
  - Returns undefined otherwise (no label or empty after stripping)

## Exports

- `extractBashCommentLabel(command: string): string | undefined`
