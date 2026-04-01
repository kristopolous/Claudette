## Purpose
Toggle brief-only mode, which restricts output to only the Brief tool and hides plain text responses.

## Imports
- **External**: `zod/v4` (schema validation), `bun:bundle` (feature flags)
- **Internal**: GrowthBook feature flags, BriefTool entitlement check, userMsgOptIn state management, analytics logging

## Logic
1. Checks if KAIROS or KAIROS_BRIEF feature is enabled
2. Toggles `isBriefOnly` state in app state
3. Validates user entitlement before enabling (can disable anytime)
4. Updates `userMsgOptIn` to match brief mode state for tool availability
5. Injects system reminder about Brief tool usage change
6. Logs analytics events for toggle actions
7. Returns null (interactive JSX command)

## Exports
- `default` - local-jsx Command object with React-based call function
