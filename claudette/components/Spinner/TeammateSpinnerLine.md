# components/Spinner/TeammateSpinnerLine

## Purpose
Provides teammate spinner line component for displaying individual teammate status.

## Imports
- **Stdlib**: (none)
- **External**: `figures`, `lodash-es/sample`, REACT
- **Internal**: constants spinnerVerbs/turnCompletionVerbs, hooks useElapsedTime/useTerminalSize, ink stringWidth, ink, tasks InProcessTeammateTask types, collapseReadSearch, format, ink, Spinner teammateSelectHint

## Logic
1. `Props` - { teammate, isLast, isSelected?, isForegrounded?, allIdle?, showPreview? }
2. `getMessagePreview` - extracts last 3 lines of content from teammate's conversation
3. Shows recent activity from any message type (user or assistant)
4. Collects lines from recent messages (newest first)
5. For tool_use blocks: shows "Using {name}…" or extracts description/prompt/command/query/pattern
6. For text blocks: splits by newline, takes from end (most recent lines)
7. Truncates lines to maxLineLength (80)
8. Reverses so oldest of 3 is first (reading order)
9. `TeammateSpinnerLine` - UI component for teammate spinner line
10. Uses useState for randomVerb (teammate.spinnerVerb ?? sample(getSpinnerVerbs()))
11. Uses useElapsedTime for elapsed time tracking
12. Uses useTerminalSize for terminal columns
13. Calculates isIdle (teammate status === 'idle')
14. Calculates isLeader (teammate.isLeader)
15. Calculates showActivity (isForegrounded || isSelected)
16. Renders Box with teammate status, verb, elapsed time
17. Shows message preview if showPreview enabled
18. Shows selection pointer if isSelected
19. Uses toInkColor for color conversion
20. Uses formatDuration, formatNumber, truncateToWidth for formatting
21. Uses summarizeRecentActivities for activity summary
22. `figures` - figures library
23. `sample` - lodash sample function
24. `getSpinnerVerbs` - gets spinner verbs
25. `TURN_COMPLETION_VERBS` - turn completion verbs
26. `useElapsedTime` - gets elapsed time
27. `useTerminalSize` - gets terminal size
28. `stringWidth` - gets string width
29. `summarizeRecentActivities` - summarizes recent activities
30. `formatDuration`, `formatNumber`, `truncateToWidth` - format functions
31. `toInkColor` - converts to ink color
32. `TEAMMATE_SELECT_HINT` - teammate select hint

## Exports
- `TeammateSpinnerLine` - teammate spinner line component
