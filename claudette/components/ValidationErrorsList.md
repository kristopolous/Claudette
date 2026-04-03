## Purpose
Groups and displays configuration validation errors as a nested tree structure organized by file.

## Imports
- **Stdlib**: none
- **External**: `lodashes/setWith`, REACT
- **Internal**: `Box`, `Text`, `useTheme`, `treeify`

## Logic
Errors are first grouped by file, then each file's errors are converted from dot-notation paths into a nested tree structure using lodash setWith. Numeric path indices are replaced with the actual invalid value for readability. The tree is rendered using treeify with themed tree characters. Suggestions and documentation links are deduplicated and displayed below each file's error tree.

## Exports
- `ValidationErrorsList` - renders validation errors grouped by file as nested trees with suggestions and doc links
