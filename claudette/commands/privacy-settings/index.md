## Purpose
Command definition and registration for `privacy-settings`. Provides metadata and lazy-loads the UI component.

## Imports
- **Internal**:
  - `.././commands` (Command type)
  - `.././utils/auth` (isConsumerSubscriber)

## Logic
Defines a command object with:
- `type`: 'local-jsx' (renders UI component)
- `name`: 'privacy-settings'
- `description`: 'View and update your privacy settings'
- `isEnabled`: Only enables for consumer subscribers (paid users)
- `load`: Dynamic import that loads the UI component from './privacysettings' when executed

## Exports
- `default` - The command object conforming to Command interface
