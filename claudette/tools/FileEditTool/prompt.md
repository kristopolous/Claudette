## Purpose
Provides the tool description and usage instructions for the file edit tool, including pre-read requirements and formatting guidance.

## Imports
- **Stdlib**: none
- **External**: none
- **Internal**: `utils/file`, `tools/FileReadTool/prompt`

## Logic
1. Generates pre-read instruction requiring the Read tool to be used before editing
2. Constructs edit description with line number prefix format guidance
3. Includes uniqueness hint for old_string sizing based on user type
4. Combines usage instructions covering indentation preservation, emoji policy, and replace_all guidance

## Exports
- `getEditToolDescription` - returns the full description and usage instructions for the file edit tool
