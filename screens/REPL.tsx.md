# screens/REPL.tsx

## Purpose
The main interactive terminal UI - renders messages, handles user input, displays tool results, and manages the overall REPL experience.

## Items (multiple exports/components)

### REPL Component
**Purpose**: Main screen component that orchestrates the terminal interface.

**Logic**:
1. Initialize state: messages, input mode, vim mode, permissions
2. Setup keybinding handlers (global and command-specific)
3. Manage message queue and command lifecycle
4. Handle streaming - yields tokens as they arrive from query()
5. Permission dialogs for dangerous tool calls
6. Render VirtualMessageList with virtual scrolling
7. Handle user input via PromptInput component
8. Submit messages to QueryEngine via handlePromptSubmit

### VirtualMessageList
**Purpose**: Virtualized list for efficient rendering of message history (1000s of messages).

**Logic**:
- Only render visible messages (viewport + buffer)
- Handle resize events
- Scroll to bottom on new messages
- Jump to specific messages (for transcript navigation)

### PromptInput
**Purpose**: User text input component with history, vim mode, keybinding support.

**Logic**:
- Text input with readline-style editing
- History navigation (up/down arrows)
- Vim mode integration (normal/insert mode)
- Submit on Enter, special keys handled
- Queued commands support (Ctrl-C to view queue)

### PermissionRequest
**Purpose**: Dialog for user to approve/deny dangerous tool calls.

**Logic**:
- Display tool name, command to be executed
- Show risk assessment (dangerous patterns)
- User chooses: Allow, Deny, Allow All Similar
- Persist permission for session

### useInput Hook
**Purpose**: Capture keyboard input in terminal.

**Logic**:
- Raw mode input capture
- Key event normalization
- Pass to appropriate handler (vim, shortcuts, etc.)

## Imports
- **External**: `react`, `ink`, `chalk`, `figures`
- **Internal**: `query` (query.ts), `handlePromptSubmit`, `createUserMessage`, `getTools`

## Insights
- **Virtual scrolling**: Essential for long conversations - only DOM renders visible items
- **Streaming**: Tokens yielded from query() as they arrive, not buffered
- **Keybinding layers**: Global → Command → Vim → Input mode priority
- **Generator pattern**: query() returns AsyncGenerator, yields StreamEvents

## Exports
- Main REPL component (default export for this file's purpose)