# components/tasks/RemoteSessionDetailDialog

## Purpose
Provides remote session detail dialog component for viewing remote agent task details.

## Imports
- **Stdlib**: (none)
- **External**: `figures`, REACT, REACT_COMPILER
- **Internal**: agentSdkTypes, Tool, types utils, commands, constants figures, hooks useElapsedTime, ink events keyboard-event, ink, tasks RemoteAgentTask, AgentTool constants, AskUserQuestionTool, ExitPlanModeTool, browser, errors, format, messages mappers/messages, stringUtils, teleport, CustomSelect select, design-system Byline/Dialog/KeyboardShortcutHint, Message, tasks RemoteSessionProgress

## Logic
1. `Props` - { session, toolUseContext, onDone, onBack?, onKill? }
2. `formatToolUseSummary` - formats tool use as compact one-line summary
3. plan_ready phase (ExitPlanMode): "Review the plan in Claudette on the web"
4. AskUserQuestion: shows question text as CTA, not tool name
5. For other tools: shows tool name + first meaningful string arg
6. Collapses whitespace for multi-line inputs
7. `PHASE_LABEL` - { needs_input: 'input required', plan_ready: 'ready' }
8. `AGENT_VERB` - { needs_input: 'waiting', plan_ready: 'done' }
9. `RemoteSessionDetailDialog` - UI component for remote session detail
10. Uses REACT_COMPILER runtime (_c) for memoization
11. Uses useElapsedTime for elapsed time
12. Uses useKeybindings for keyboard shortcuts
13. Uses useState for selected option
14. Renders Dialog with remote session details
15. Shows session status, elapsed time, review progress
16. Shows tool activity summaries
17. Shows phase label and agent verb
18. Handles session kill and back navigation
19. `SDKMessage` - SDK message type
20. `ToolUseContext` - tool use context type
21. `DeepImmutable` - deep immutable type
22. `CommandResultDisplay` - command result display type
23. `DIAMOND_FILLED`, `DIAMOND_OPEN` - diamond figure constants
24. `KeyboardEvent` - keyboard event type
25. `RemoteAgentTaskState` - remote agent task state type
26. `getRemoteTaskSessionUrl` - gets remote task session URL
27. `AGENT_TOOL_NAME`, `LEGACY_AGENT_TOOL_NAME` - agent tool name constants
28. `ASK_USER_QUESTION_TOOL_NAME` - ask user question tool name
29. `EXIT_PLAN_MODE_V2_TOOL_NAME` - exit plan mode tool name
30. `openBrowser` - opens browser
31. `errorMessage` - gets error message
32. `formatDuration`, `truncateToWidth` - format functions
33. `toInternalMessages`, `normalizeMessages`, `EMPTY_LOOKUPS` - message utilities
34. `plural` - pluralizes string
35. `teleportResumeCodeSession` - teleports resume code session
36. `Select` - select component
37. `Byline`, `Dialog`, `KeyboardShortcutHint` - design system components
38. `Message` - message component
39. `formatReviewStageCounts`, `RemoteSessionProgress` - remote session utilities

## Exports
- `formatToolUseSummary` - formats tool use summary
- `RemoteSessionDetailDialog` - remote session detail dialog component
