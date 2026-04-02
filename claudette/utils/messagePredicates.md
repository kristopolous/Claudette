# messagePredicates

## Purpose
Discriminates human turn messages from tool_result messages, which both share `type: 'user'`. The discriminant is the optional `toolUseResult` field and the `isMeta` flag.

## Imports
- **Internal**: ../types/message (Message, UserMessage)

## Logic
1. A message is a human turn if it has `type === 'user'`, is NOT a meta message (`!m.isMeta`), and does NOT have a `toolUseResult` field
2. This prevents miscounting tool_result messages as human turns — a bug fixed across four PRs (#23977, #24016, #24022, #24025)

## Exports
- `isHumanTurn(m: Message): m is UserMessage` - Type guard that returns true if the message represents a genuine human turn (not a tool result or meta message)

## Source
`messagePredicates`
