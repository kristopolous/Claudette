# mailbox

## Purpose
Provides React context for Mailbox utility with memoized singleton instance.

## Imports
- **Stdlib**: (none)
- **External**: `react/compiler-runtime`, `react`
- **Internal**: Mailbox utility class

## Logic
1. `MailboxContext` - context created with undefined default
2. `MailboxProvider` - wraps children with memoized Mailbox instance
3. Uses useMemo with empty deps for singleton per-render-tree
4. `useMailbox` - hook that returns Mailbox instance
5. Throws error if used outside MailboxProvider
6. Enables message passing between components via mailbox pattern

## Exports
- `MailboxContext` - React context for Mailbox
- `MailboxProvider` - provider component with memoized instance
- `useMailbox` - hook to access Mailbox instance
