## Purpose
Displays a configurable status line showing model, cost, context window, and workspace information.

## Imports
- **Stdlib**: bun:bundle (feature)
- **External**: react (React, memo, useCallback, useEffect, useRef)
- **Internal**: src/services/analytics/index.js (logEvent), src/state/AppState.js (useAppState, useSetAppState), src/utils/permissions/PermissionMode.js (PermissionMode), ../bootstrap/state.js (getIsRemoteMode, getKairosActive, getMainThreadAgentType, getOriginalCwd, getSdkBetas, getSessionId), ../constants/outputStyles.js (DEFAULT_OUTPUT_STYLE_NAME), ../context/notifications.js (useNotifications), ../cost-tracker.js (getTotalAPIDuration, getTotalCost, getTotalDuration, getTotalInputTokens, getTotalLinesAdded, getTotalLinesRemoved, getTotalOutputTokens), ../hooks/useMainLoopModel.js (useMainLoopModel), ../hooks/useSettings.js (ReadonlySettings, useSettings), ../ink.js (Ansi, Box, Text), ../services/claudeAiLimits.js (getRawUtilization), ../types/message.js (Message), ../types/statusLine.js (StatusLineCommandInput), ../types/textInputTypes.js (VimMode), ../utils/config.js (checkHasTrustDialogAccepted), ../utils/context.js (calculateContextPercentages, getContextWindowForModel), ../utils/cwd.js (getCwd), ../utils/debug.js (logForDebugging), ../utils/fullscreen.js (isFullscreenEnvEnabled), ../utils/hooks.js (createBaseHookInput, executeStatusLineCommand), ../utils/messages.js (getLastAssistantMessage), ../utils/model/model.js (getRuntimeMainLoopModel, ModelName, renderModelName), ../utils/sessionStorage.js (getCurrentSessionTitle), ../utils/tokens.js (doesMostRecentAssistantMessageExceed200k, getCurrentUsage), ../utils/worktree.js (getCurrentWorktreeSession), ./PromptInput/utils.js (isVimModeEnabled)

## Logic
Builds a comprehensive StatusLineCommandInput containing model, workspace, cost, context window, rate limits, vim mode, agent, remote, and worktree information. Executes the configured status line command with debouncing (300ms) and abort control. Caches expensive calculations using refs to avoid unnecessary re-computation. Logs analytics on mount and notifies users when the status line is blocked by workspace trust. Renders the resulting status line text with ANSI support, reserving space in fullscreen mode to prevent layout shifts.

## Exports
- `statusLineShouldDisplay` - determines whether the status line should be visible based on settings and Kairos mode
- `getLastAssistantMessageId` - extracts the UUID of the last assistant message from a message array
- `StatusLine` - memoized component that renders the status line with debounced command execution
