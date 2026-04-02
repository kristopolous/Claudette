# directMemberMessage

## Purpose
Parses `@agent-name message` syntax for direct team member messaging and sends messages to teammates via a mailbox, bypassing the model.

## Imports
- **Internal**: `../state/AppState` (AppState type)

## Logic
1. `parseDirectMemberMessage` uses regex `/^@([\w-]+)\s+(.+)$/s` to extract `recipientName` and `message` from input. Returns `null` if no match or if fields are empty.
2. `sendDirectMemberMessage` looks up the recipient in `teamContext.teammates` by name. If found, calls `writeToMailbox` with a message object (`from: 'user'`, `text`, `timestamp`) and the team name. Returns success or error (`no_team_context` | `unknown_recipient`).
3. `WriteToMailboxFn` is a private type for the mailbox write callback.

## Exports
- `parseDirectMemberMessage` - parses `@name message` input, returns `{ recipientName, message }` or null
- `DirectMessageResult` - discriminated union: `{ success: true; recipientName }` | `{ success: false; error: 'no_team_context' | 'unknown_recipient'; recipientName? }`
- `sendDirectMemberMessage` - async function sending a message to a team member, returns `DirectMessageResult`

## Source
`claude-code/src/utils/directMemberMessage.ts`
