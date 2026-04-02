# FileEditTool/utils.ts

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

- `LEFT_SINGLE_CURLY_QUOTE: string`
- `RIGHT_SINGLE_CURLY_QUOTE: string`
- `LEFT_DOUBLE_CURLY_QUOTE: string`
- `RIGHT_DOUBLE_CURLY_QUOTE: string`
- `normalizeQuotes(str: string): string`
- `stripTrailingWhitespace(str: string): string`
- `findActualString(fileContent: string, searchString: string): string | null`
- `preserveQuoteStyle(oldString: string, actualOldString: string, newString: string): string`
- `applyEditToFile(originalContent: string, oldString: string, newString: string, replaceAll?: boolean): string`
- `getPatchForEdit(params: { filePath: string; fileContents: string; oldString: string; newString: string; replaceAll?: boolean }): { patch: StructuredPatchHunk[]; updatedFile: string }`
- `getPatchForEdits(params: { filePath: string; fileContents: string; edits: FileEdit[] }): { patch: StructuredPatchHunk[]; updatedFile: string }`
- `getSnippetForTwoFileDiff(fileAContents: string, fileBContents: string): string`
- `getSnippetForPatch(patch: StructuredPatchHunk[], newFile: string): { formattedSnippet: string; startLine: number }`
- `getSnippet(originalFile: string, oldString: string, newString: string, contextLines?: number): { snippet: string; startLine: number }`
- `getEditsForPatch(patch: StructuredPatchHunk[]): FileEdit[]`
- `normalizeFileEditInput(params: { file_path: string; edits: EditInput[] }): { file_path: string; edits: EditInput[] }`
- `areFileEditsEquivalent(edits1: FileEdit[], edits2: FileEdit[], originalContent: string): boolean`
- `areFileEditsInputsEquivalent(input1: { file_path: string; edits: FileEdit[] }, input2: { file_path: string; edits: FileEdit[] }): boolean`
