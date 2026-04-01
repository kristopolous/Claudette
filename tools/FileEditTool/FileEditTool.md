# FileEditTool

The FileEditTool is used to modify existing files by performing exact string replacements.

## Tool Name

`Edit`

## Input Schema

```typescript
{
  file_path: string;      // The absolute path to the file to modify
  old_string: string;     // The text to replace
  new_string: string;     // The text to replace it with (must be different from old_string)
  replace_all?: boolean;  // Replace all occurrences of old_string (default: false)
}
```

## Output Schema

```typescript
{
  filePath: string;           // The file path that was edited
  oldString: string;          // The original string that was replaced
  newString: string;          // The new string that replaced it
  originalFile: string;      // The original file contents before editing
  structuredPatch: Hunk[];    // Diff patch showing the changes
  userModified: boolean;      // Whether the user modified the proposed changes
  replaceAll: boolean;        // Whether all occurrences were replaced
  gitDiff?: GitDiff;          // Optional git diff information
}
```

## Key Features

### String Replacement
- Performs exact string matching for replacements
- Supports `replace_all` flag to replace all occurrences
- Normalizes curly quotes to straight quotes when matching (preserves original formatting)

### File Validation
- **File must be read first**: The file must have been read using the Read tool before editing
- **File modification detection**: Warns if file has been modified since being read
- **Size limit**: 1 GiB maximum file size
- **No UNC paths**: Prevents credential leaks by blocking UNC paths (Windows)

### Quote Style Preservation
When `old_string` uses curly quotes (', ", ', ") and the file also uses curly quotes, the `new_string` will automatically be converted to use matching curly quote styles.

### Multi-Match Detection
- If `old_string` appears multiple times but `replace_all` is false, the edit will be rejected
- Provides helpful error message showing the number of matches found

## Validation Rules

The tool validates inputs and may reject edits with the following error codes:

| Error Code | Condition |
|------------|-----------|
| 0 | Secret detected in team memory file |
| 1 | `old_string` and `new_string` are identical |
| 2 | File is in a denied directory per permission settings |
| 3 | File already exists when trying to create new file |
| 4 | File does not exist |
| 5 | File is a Jupyter Notebook (.ipynb) |
| 6 | File has not been read yet |
| 7 | File has been modified since read |
| 8 | String to replace not found in file |
| 9 | Multiple matches found but `replace_all` is false |
| 10 | File is too large (> 1 GiB) |

## File Processing

### Atomic Write Operations
The tool performs atomic read-modify-write operations to prevent data corruption:
1. Creates parent directory if needed
2. Backs up file history before editing
3. Validates file hasn't changed since last read
4. Applies the edit
5. Updates read timestamp to invalidate stale writes

### LSP Integration
After editing, the tool notifies Language Server Protocol servers:
- `didChange`: Content has been modified
- `didSave`: File has been saved to disk

### Quote Normalization
The tool handles quote normalization in two ways:
1. **Matching**: When `old_string` contains curly quotes but the exact match isn't found, it tries normalized (straight) quotes
2. **Preservation**: When applying edits to files with curly quotes, the tool converts straight quotes in `new_string` to matching curly quotes

## Constants

```typescript
FILE_EDIT_TOOL_NAME = 'Edit'
FILE_UNEXPECTEDLY_MODIFIED_ERROR = 'File has been unexpectedly modified. Read it again before attempting to write it.'
MAX_EDIT_FILE_SIZE = 1024 * 1024 * 1024  // 1 GiB
```

## Usage Example

```typescript
// Single replacement
{
  file_path: '/path/to/file.txt',
  old_string: 'Hello World',
  new_string: 'Hello Claude',
  replace_all: false
}

// Replace all occurrences
{
  file_path: '/path/to/config.json',
  old_string: 'debug: true',
  new_string: 'debug: false',
  replace_all: true
}
```

## Special Behaviors

- **New file creation**: An empty `old_string` on a nonexistent file creates a new file (only valid if file doesn't exist and is empty)
- **Empty file editing**: If file exists but is empty, `old_string` must be empty to add content
- **Plan files**: Files in the plans directory have special display behavior showing `/plan to preview` hint
- **Skill discovery**: Automatically discovers and activates skills based on the file path being edited

## Error Handling

When validation fails, the tool returns an error with:
- `result: false`
- `behavior: 'ask'` (prompts user for guidance)
- `message`: Human-readable error description
- `errorCode`: Numeric code for programmatic handling
