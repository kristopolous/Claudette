## Purpose
Automatically truncates long pasted input on mount and resets the truncation flag when input is cleared.

## Imports
- **Stdlib**: none
- **External**: REACT
- **Internal**: `utils/config`, `inputPaste`

## Logic
1. Tracks whether truncation has been applied to the current input value via state
2. On mount, checks if input exceeds 10,000 characters and truncation has not yet been applied
3. Calls maybeTruncateInput to split long text and store the truncated portion in pastedContents
4. Updates the input value, cursor offset, and pasted contents with the truncated result
5. Resets the truncation flag when input is cleared (e.g., after submission) so the next paste can be truncated

## Exports
- `useMaybeTruncateInput` - hook that applies input truncation once per input value and resets on clear
