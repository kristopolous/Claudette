## Purpose
Renders bash command output (stdout and stderr) extracted from XML-tagged content in user messages.

## Imports
- **Stdlib**: None
- **External**: REACT
- **Internal**: BashToolResultMessage, messages utils (extractTag)

## Logic
1. Extracts stdout from bash-stdout XML tag, unwrapping persisted-output tag if present
2. Extracts stderr from bash-stderr XML tag
3. Passes both to BashToolResultMessage for display with optional verbose mode

## Exports
- `UserBashOutputMessage` - UI component extracting and rendering bash stdout/stderr from tagged content
