## Purpose
Provides utility functions for file editing operations including quote normalization, patch generation, snippet extraction, and edit input normalization.

## Imports
- **Stdlib**: none
- **External**: `diff` (structuredPatch, StructuredPatchHunk)
- **Internal**: `src/utils/log`, `src/utils/path`, `src/utils/stringUtils`, `utils/diff`, `utils/errors`, `utils/file`, `FileEditTool/types`

## Logic
1. Defines curly quote constants and normalizes curly quotes to straight quotes for matching
2. Strips trailing whitespace from lines while preserving line endings (skipped for markdown files)
3. Finds actual strings in file content accounting for quote normalization
4. Preserves curly quote style when applying edits by detecting open/close context
5. Applies edits to file content with support for single or replace-all operations
6. Generates structured patches from file edits for display purposes
7. Extracts code snippets around patch hunks with configurable context lines
8. Normalizes file edit input by attempting desanitization when exact matches fail
9. Compares edit equivalence by applying both sets to original content and comparing results

## Exports
- `LEFT_SINGLE_CURLY_QUOTE` - constant for left single curly quote character
- `RIGHT_SINGLE_CURLY_QUOTE` - constant for right single curly quote character
- `LEFT_DOUBLE_CURLY_QUOTE` - constant for left double curly quote character
- `RIGHT_DOUBLE_CURLY_QUOTE` - constant for right double curly quote character
- `normalizeQuotes` - converts curly quotes to straight quotes in a string
- `stripTrailingWhitespace` - removes trailing whitespace from each line while preserving line endings
- `findActualString` - finds the actual matching string in file content accounting for quote normalization
- `preserveQuoteStyle` - applies curly quote style from old string to new string
- `applyEditToFile` - applies a single or replace-all edit to file content
- `getPatchForEdit` - generates a patch for a single edit
- `getPatchForEdits` - generates a patch for multiple edits
- `getSnippetForTwoFileDiff` - generates a diff snippet between two file versions with byte cap
- `getSnippetForPatch` - extracts a snippet around patch hunks with line numbers
- `getSnippet` - extracts a snippet around a single edit with line numbers
- `getEditsForPatch` - reconstructs edit operations from patch hunks
- `normalizeFileEditInput` - normalizes edit input by trying desanitization when exact match fails
- `areFileEditsEquivalent` - compares two sets of edits by applying both to original content
- `areFileEditsInputsEquivalent` - compares two file edit inputs for semantic equivalence
