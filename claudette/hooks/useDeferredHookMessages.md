## Purpose
Defers SessionStart hook messages to avoid blocking REPL initial render; provides callback to await pending hooks before first API request.

## Imports
- **External**: REACT (useCallback, useEffect, useRef)
- **Internal**: `../types/message` (HookResultMessage, Message)

## Logic
- `pendingRef` holds the incoming `pendingHookMessages` promise; `resolvedRef` tracks completion
- `useEffect` watches `pendingHookMessages`: when set, subscribes to its resolution; prepends resulting messages to existing ones
- Returns `awaitHooks` callback: if unresolved, awaits the promise and prepends messages; safe to call multiple times (guarded)
- REPL pattern: render immediately; call `awaitHooks()` on submit before first API request to include hook context

## Exports
- `useDeferredHookMessages` - Hook `(pendingHookMessages: Promise<HookResultMessage[]> | undefined, setMessages: (action: React.SetStateAction<Message[]>) => void) => () => Promise<void>`
