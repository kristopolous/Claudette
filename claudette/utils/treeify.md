# treeify

## Purpose
Custom tree rendering implementation with Ink theme color support. Converts nested objects into a formatted tree string with Unicode branch characters (`├`, `└`, `│`). Handles circular references, arrays, and function hiding.

## Imports
- **Stdlib**: `figures`
- **Internal**: `../components/design-system/color`, `./theme`

## Logic
1. Recursive `growBranch` function traverses the object tree, building lines with proper indentation and branch characters.
2. Circular reference detection via `WeakSet<object>` — outputs `[Circular]` when a previously-visited object is encountered.
3. Arrays are summarized as `[Array(N)]` rather than expanded.
4. Optional `hideFunctions` filter skips function-valued properties.
5. Color support via `treeCharColors` option: separate colors for tree characters, keys, and values, themed by `themeName`.
6. Special case: single empty/whitespace key with string value renders as `└ value` without the key name.
7. Empty objects render as `(empty)`.

## Exports
- `TreeNode` — type: recursive record type `{[key: string]: TreeNode | string | undefined}`
- `TreeifyOptions` — type: `{showValues?, hideFunctions?, useColors?, themeName?, treeCharColors?}`
- `treeify(obj, options?)` — renders an object as a formatted tree string with optional theming
