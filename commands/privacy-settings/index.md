## Purpose
Command definition and registration for `privacy-settings`. Provides metadata and lazy-loads the UI component.

## Imports
- **Internal**:
  - `../../commands.js` (Command type)
  - `../../utils/auth.js` (isConsumerSubscriber)

## Logic
Defines a command object with:
- `type`: 'local-jsx' (renders React component)
- `name`: 'privacy-settings'
- `description`: 'View and update your privacy settings'
- `isEnabled`: Only enables for consumer subscribers (paid users)
- `load`: Dynamic import that loads the React component from './privacy-settings.js' when executed

## Exports
- `default` - The command object conforming to Command interface
