## Purpose
Displays a configurable status line showing model, cost, context window, and workspace information.

## Imports
- **Stdlib**: BUILDFLAGS (feature)
- **External**: react (React, memo, useCallback, useEffect, useRef)
- **Internal**: src/services/analytics/index (logEvent),src/state/AppState (useAppState, useSetAppState),src/utils/permissions/PermissionMode (PermissionMode), ./bootstrap/state (getIsRemoteMode, getKairosActive, getMainThreadAgentType, getOriginalCwd, getSdkBetas, getSessionId), ./constants/outputStyles (DEFAULT_OUTPUT_STYLE_NAME), ./context/notifications (useNotifications), ../costtracker (getTotalAPIDuration, getTotalCost, getTotalDuration, getTotalInputTokens, getTotalLinesAdded, getTotalLinesRemoved, getTotalOutputTokens), ./hooks/useMainLoopModel (useMainLoopModel), ./hooks/useSettings (ReadonlySettings, useSettings), ./ink (Ansi, Box, Text), ./services/claudeAiLimits (getRawUtilization), ./types/message (Message), ./types/statusLine (StatusLineCommandInput), ./types/textInputTypes (VimMode), ./utils/config (checkHasTrustDialogAccepted), ./utils/context (calculateContextPercentages, getContextWindowForModel), ./utils/cwd (getCwd), ./utils/debug (logForDebugging), ./utils/fullscreen (isFullscreenEnvEnabled), ./utils/hooks (createBaseHookInput, executeStatusLineCommand), ./utils/messages (getLastAssistantMessage), ./utils/model/model (getRuntimeMainLoopModel, ModelName, renderModelName), ./utils/sessionStorage (getCurrentSessionTitle), ../utils/tokens (doesMostRecentAssistantMessageExceed200k, getCurrentUsage), ../utils/worktree (getCurrentWorktreeSession), ./PromptInput/utils (isVimModeEnabled)

## Logic
Builds a comprehensive StatusLineCommandInput containing model, workspace, cost, context window, rate limits, vim mode, agent, remote, and worktree information. Executes the configured status line command with debouncing (300ms) and abort control. Caches expensive calculations using refs to avoid unnecessary re-computation. Logs analytics on mount and notifies users when the status line is blocked by workspace trust. Renders the resulting status line text with ANSI support, reserving space in fullscreen mode to prevent layout shifts.

## Exports
- `statusLineShouldDisplay` - determines whether the status line should be visible based on settings and Kairos mode
- `getLastAssistantMessageId` - extracts the UUID of the last assistant message from a message array
- `StatusLine` - memoized component that renders the status line with debounced command execution
