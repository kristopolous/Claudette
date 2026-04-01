## Purpose
A UI module that prompts users for permission to share their session transcript with the service provider for quality improvement and diagnostic purposes.

## Imports
- **Internal**: 
    - UI: `ink`, `constants/figures`
    - Logic/State: `useDebouncedDigitInput`

## Logic
1. **Response Options**: Defines three possible user decisions:
    - **1: Yes**: Grants permission to share the current transcript.
    - **2: No**: Declines sharing for the current session.
    - **3: Don't ask again**: Declines sharing and requests to suppress future prompts of this type.
2. **Input Mapping**: 
    - Maps the digits '1', '2', and '3' to the semantic responses 'yes', 'no', and 'dont_ask_again' respectively.
    - Employs debounced digit input logic for immediate, one-touch response handling.
3. **Contextual Layout**:
    - Displays a high-visibility query alongside a reference link to the provider's data usage documentation.
    - Groups the options horizontally with consistent spacing and colored digit indicators for clarity.
4. **Validation**: Enforces strict input validation to ensure only the specified shortcut digits are processed as valid response actions.

## Exports
- `TranscriptSharePrompt` - The primary UI component for the transcript sharing decision interface.
- `TranscriptShareResponse` (Type) - Defines the allowed response values: `'yes'`, `'no'`, or `'dont_ask_again'`.
