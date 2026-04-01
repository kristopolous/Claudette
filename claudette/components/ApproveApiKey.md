## Purpose
Prompts the user to approve or reject a custom API key detected in their environment.

## Imports
- **Stdlib**: none
- **External**: `react`
- **Internal**: `../ink`, `../utils/config`, `./CustomSelect/index`, `./design-system/Dialog`

## Logic
Displays the truncated API key and asks the user whether to use it. On approval, saves the key to the approved list in global config. On rejection, saves to the rejected list. Defaults to rejection as the recommended option.

## Exports
- `ApproveApiKey` - dialog that requests user confirmation for using a custom inference provider API key
