## Purpose
Provides lazy-loaded command metadata for the `fast` command with dynamic description and immediate flag.

## Imports
- **Internal**: Command type, fastMode utils (FAST_MODE_MODEL_DISPLAY, isFastModeEnabled), immediateCommand utils

## Logic
1. Command with type 'local-jsx'
2. Name: 'fast'
3. Dynamic description: `Toggle fast mode (${FAST_MODE_MODEL_DISPLAY} only)` where model name is from utils
4. `availability: ['claude-ai', 'console']` (indicates where command appears)
5. `isEnabled` returns isFastModeEnabled() (feature flag check)
6. `isHidden` returns opposite of isFastModeEnabled (hidden when disabled)
7. Argument hint: '[on|off]' (optional, though UI doesn't use arg)
8. `immediate` getter uses shouldInferenceConfigCommandBeImmediate() for UX
9. Lazy loads implementation via `load: () => import('./fast.js')`
10. Toggles fast mode (cheaper/faster model for simple tasks)

## Exports
- `default` - Command object
