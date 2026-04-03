## Purpose
Prompts the user to confirm whether to open a file edit in an IDE, with support for accept/reject options and symlink warnings.

## Imports
- **Stdlib**: `path`
- **External**: REACT
- **Internal**: `Box`, `Text`, `getCwd`, `isSupportedVSCodeTerminal`, `Select`, `Pane`

## Logic
Displays the file basename and asks the user to confirm the edit. Shows a symlink target warning if the file is a symlink pointing outside the working directory. In VS Code terminals, prompts the user to save the file to continue. Handles selection by mapping the chosen option to its type (reject or accept-once) and passing trimmed feedback to the onChange callback.

## Exports
- `ShowInIDEPrompt` - renders a permission prompt for opening file edits in an IDE with accept/reject options
