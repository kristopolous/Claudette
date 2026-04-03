# Permissions Command (`permissions`)

## Purpose
Opens a UI to manage tool permission allow/deny rules. Allows viewing and editing of which tools are permitted or denied. Also provides a mechanism to retry previously denied commands.

## Imports
### Stdlib
- REACT

### Internal
- `PermissionRuleList` component from `.././components/permissions/rules/PermissionRuleList`
- `LocalJSXCommandCall` type from `.././types/command`
- `createPermissionRetryMessage` from `.././utils/messages`

## Logic
The `call` async function receives `onDone` and `context`. It renders the `PermissionRuleList` component, passing:
- `onExit`: calls `onDone`
- `onRetryDenials`: Takes an array of command names, creates a permission retry message via `createPermissionRetryMessage()`, and adds it to the conversation by calling `context.setMessages(prev => [...prev, message])`.

## Exports
- `call` (async function) - Renders the permissions management UI