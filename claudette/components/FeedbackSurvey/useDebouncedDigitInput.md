## Purpose
A UI utility that detects and debounces single-digit numeric inputs from the main prompt, preventing accidental submissions when users are typing larger blocks of text starting with numbers.

## Imports
- **Stdlib**: None
- **External**: `ui-framework` (e.g., REACT)
- **Internal**: `utils/stringUtils`

## Logic
1. **Input Monitoring**: Tracks changes to the main input field value.
2. **Digit Detection**: Checks if the most recently typed character is a valid numeric digit (normalizing full-width characters if necessary).
3. **Debouncing**: Starts a short timer (defaulting to 400ms) when a digit is detected. If the input changes again before the timer expires, the submission is cancelled, allowing for multi-character typing (e.g., "1. First item").
4. **Input Cleanup**: If the timer expires, the digit is automatically removed from the input field to keep the prompt clean.
5. **Callback Execution**: Triggers a provided callback function with the detected digit once the debounce period passes successfully.
6. **State Persistence**: Uses references to track if the trigger has already fired (for "once" mode) and to manage active timeouts across renders.

## Exports
- `useDebouncedDigitInput` - A functional hook/utility that attaches debounced numeric input detection to an input state.
