## Purpose
Command registration for the `voice` command, which toggles voice mode with feature flags and availability logic.

## Imports
- **Internal**:
  - `../../commands.js` (Command type)
  - `../../voice/voiceModeEnabled.js` (isVoiceGrowthBookEnabled, isVoiceModeEnabled)

## Logic
Defines a command object:
- `type`: 'local' (non-JSX command)
- `name`: 'voice'
- `description`: 'Toggle voice mode'
- `availability`: ['claude-ai'] (only in Claude AI context)
- `isEnabled`: Only enabled when feature flag `isVoiceGrowthBookEnabled` is true
- `isHidden`: Hidden when global voice mode `isVoiceModeEnabled` is false
- `supportsNonInteractive`: false (requires interactive session)
- `load`: Lazy-loads the command implementation from './voice.js'

## Exports
- `default` - The command object satisfying the Command interface
