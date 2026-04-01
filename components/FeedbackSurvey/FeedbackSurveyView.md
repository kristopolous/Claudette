## Purpose
A UI component that provides the visual layout and input mapping for the initial feedback collection screen, allowing users to rate their session experience using single-digit shortcuts.

## Imports
- **Internal**: 
    - UI: `ink`
    - Logic/State: `useDebouncedDigitInput`, `utils`

## Logic
1. **Shortcut Mapping**: Defines a fixed set of digit-to-sentiment mappings:
    - **1**: Bad
    - **2**: Fine
    - **3**: Good
    - **0**: Dismiss (cancel/exit without rating)
2. **Keyboard Interaction**: 
    - Integrates with a debounced digit input hook to automatically trigger a selection when a valid key (0-3) is pressed, without requiring an explicit confirmation step.
    - Validates incoming characters to ensure only the predefined shortcut digits are processed.
3. **Adaptive Layout**: 
    - Renders a prompt message (with a default fallback) alongside a horizontal list of options.
    - Uses color highlights for the digit shortcuts to assist with discoverability.
4. **Input Abstraction**: Captures raw digit input and translates it into a semantic feedback response before notifying the parent controller.

## Exports
- `FeedbackSurveyView` - The UI component for the sentiment selection screen.
- `isValidResponseInput` - Utility to verify if a given input character matches a valid feedback shortcut.
