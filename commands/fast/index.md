## Purpose
Registers the fast command metadata with dynamic description and gating.

## Imports
- **Internal**: `Command` type, `FAST_MODE_MODEL_DISPLAY`, `isFastModeEnabled`, `shouldInferenceConfigCommandBeImmediate`

## Logic
Defines a 'local-jsx' command named 'fast' with getter description that includes the model display name. Available to 'claude-ai' and 'console' users. `isEnabled` and `isHidden` both depend on `isFastModeEnabled()`. Accepts optional argument '[on|off]' and is immediate based on config. Lazy loads './fast.js'.

## Exports
- `default` - The fast command object
