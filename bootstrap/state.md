# state.ts

## Purpose
Centralized global state management for the Claude Code application, providing session tracking, telemetry, metrics collection, and feature flags. The module exports accessors and mutators for all application state, with careful consideration given to avoiding unnecessary global state ("BE JUDICIOUS WITH GLOBAL STATE").

## Imports
- **Stdlib**: `fs` (realpathSync), `process` (cwd), `lodash-es/sumBy`
- **External**: `@anthropic-ai/sdk`, `@opentelemetry/api`, `@opentelemetry/sdk-*`
- **Internal**: `src/entrypoints/agentSdkTypes`, `src/tools/AgentTool/agentColorManager`, `src/types/hooks`, `src/utils/crypto`, `src/utils/model/model`, `src/utils/settings/*`, `src/utils/signal`, `src/types/ids`

## Logic
1. **State Type Definition**: Defines a comprehensive `State` type with ~80 fields covering session identity, cost tracking, timing metrics, telemetry, UI state, feature flags, and session-only ephemeral data.

2. **Initial State Creation**: `getInitialState()` constructs the initial state with sensible defaults:
   - Resolves symlinks in CWD for session storage consistency
   - Initializes all counters to null/zero
   - Sets up empty Maps and Sets for session data
   - Conditionally adds `replBridgeActive` for ant users

3. **Global Singleton**: `STATE` is a module-level constant initialized once, with test-only reset via `resetStateForTests()`.

4. **Session Management**: Functions for session lifecycle:
   - `getSessionId()` / `regenerateSessionId()` / `switchSession()`
   - Parent session tracking for lineage (plan mode -> implementation)
   - Session project directory for transcript storage

5. **Cost and Usage Tracking**: Accumulates API costs, token usage (input/output/cache), lines changed, and timing across turns.

6. **Telemetry Setup**: `setMeter()` initializes OpenTelemetry counters for session count, LOC, PRs, commits, cost, tokens, code edit decisions, and active time.

7. **Beta Header Latches**: Sticky-on flags for AFK mode, fast mode, cache editing, and thinking clear that persist once activated to avoid busting prompt caches.

8. **Scroll Drain Management**: Ephemeral module-level flags (not in STATE) for scroll debouncing to avoid competing with render frames.

9. **Interaction Time**: Deferred timestamp flushing via `flushInteractionTime()` to batch Date.now() calls during active typing.

## Exports
- **Session Identity**: `getSessionId`, `regenerateSessionId`, `getParentSessionId`, `switchSession`, `onSessionSwitch`, `getSessionProjectDir`, `getOriginalCwd`, `getProjectRoot`
- **Cost & Usage**: `getTotalCostUSD`, `addToTotalCostState`, `getTotalAPIDuration`, `getTotalAPIDurationWithoutRetries`, `getTotalToolDuration`, `addToToolDuration`, `getTotalLinesAdded`, `getTotalLinesRemoved`, `getTotalInputTokens`, `getTotalOutputTokens`, `getTotalCacheReadInputTokens`, `getTotalCacheCreationInputTokens`, `getTotalWebSearchRequests`
- **Turn Metrics**: `getTurnHookDurationMs`, `addToTurnHookDuration`, `resetTurnHookDuration`, `getTurnToolDurationMs`, `resetTurnToolDuration`, `getTurnClassifierDurationMs`, `addToTurnClassifierDuration`, `resetTurnClassifierDuration`, `getTurnOutputTokens`, `snapshotOutputTokensForTurn`, `getBudgetContinuationCount`, `incrementBudgetContinuationCount`
- **Model Settings**: `getMainLoopModelOverride`, `setMainLoopModelOverride`, `getInitialMainLoopModel`, `setInitialMainLoopModel`, `getSdkBetas`, `setSdkBetas`, `getModelStrings`, `setModelStrings`
- **Telemetry**: `setMeter`, `getMeter`, `getSessionCounter`, `getLocCounter`, `getPrCounter`, `getCommitCounter`, `getCostCounter`, `getTokenCounter`, `getCodeEditToolDecisionCounter`, `getActiveTimeCounter`, `getLoggerProvider`, `setLoggerProvider`, `getEventLogger`, `setEventLogger`, `getMeterProvider`, `setMeterProvider`, `getTracerProvider`, `setTracerProvider`
- **API Request Tracking**: `setLastAPIRequest`, `getLastAPIRequest`, `setLastAPIRequestMessages`, `getLastAPIRequestMessages`, `setLastClassifierRequests`, `getLastClassifierRequests`, `getLastMainRequestId`, `setLastMainRequestId`, `getLastApiCompletionTimestamp`, `setLastApiCompletionTimestamp`, `markPostCompaction`, `consumePostCompaction`
- **Interaction**: `updateLastInteractionTime`, `flushInteractionTime`, `getLastInteractionTime`
- **Scroll Management**: `markScrollActivity`, `getIsScrollDraining`, `waitForScrollIdle`
- **Model Usage**: `getModelUsage`, `getUsageForModel`, `setHasUnknownModelCost`, `hasUnknownModelCost`, `getPromptId`, `setPromptId`
- **Feature Flags**: `getIsInteractive`, `setIsInteractive`, `getKairosActive`, `setKairosActive`, `getStrictToolResultPairing`, `setStrictToolResultPairing`, `getSdkAgentProgressSummariesEnabled`, `setSdkAgentProgressSummariesEnabled`, `getUserMsgOptIn`, `setUserMsgOptIn`, `getClientType`, `setClientType`, `getSessionSource`, `setSessionSource`
- **Settings**: `getFlagSettingsPath`, `setFlagSettingsPath`, `getFlagSettingsInline`, `setFlagSettingsInline`, `getAllowedSettingSources`, `setAllowedSettingSources`, `getSessionIngressToken`, `setSessionIngressToken`, `getOauthTokenFromFd`, `setOauthTokenFromFd`, `getApiKeyFromFd`, `setApiKeyFromFd`, `preferThirdPartyAuthentication`
- **Plugins & Extensions**: `setInlinePlugins`, `getInlinePlugins`, `setChromeFlagOverride`, `getChromeFlagOverride`, `setUseCoworkPlugins`, `getUseCoworkPlugins`, `setSessionBypassPermissionsMode`, `getSessionBypassPermissionsMode`
- **Scheduled Tasks**: `getScheduledTasksEnabled`, `setScheduledTasksEnabled`, `getSessionCronTasks`, `addSessionCronTask`, `removeSessionCronTasks`
- **Session Trust & Persistence**: `getSessionTrustAccepted`, `setSessionTrustAccepted`, `isSessionPersistenceDisabled`, `setSessionPersistenceDisabled`
- **Plan/Auto Mode**: `hasExitedPlanModeInSession`, `setHasExitedPlanMode`, `needsPlanModeExitAttachment`, `setNeedsPlanModeExitAttachment`, `handlePlanModeTransition`, `needsAutoModeExitAttachment`, `setNeedsAutoModeExitAttachment`, `handleAutoModeTransition`
- **LSP & Recommendations**: `hasShownLspRecommendationThisSession`, `setLspRecommendationShownThisSession`
- **SDK Integration**: `setInitJsonSchema`, `getInitJsonSchema`, `registerHookCallbacks`, `getRegisteredHooks`, `clearRegisteredHooks`, `clearRegisteredPluginHooks`, `resetSdkInitState`
- **Teams & Skills**: `getSessionCreatedTeams`, `getPlanSlugCache`, `addInvokedSkill`, `getInvokedSkills`, `getInvokedSkillsForAgent`, `clearInvokedSkills`, `clearInvokedSkillsForAgent`
- **Teleportation**: `setTeleportedSessionInfo`, `getTeleportedSessionInfo`, `markFirstTeleportMessageLogged`
- **Slow Operations**: `addSlowOperation`, `getSlowOperations`
- **Remote & Agent**: `getMainThreadAgentType`, `setMainThreadAgentType`, `getIsRemoteMode`, `setIsRemoteMode`, `getDirectConnectServerUrl`, `setDirectConnectServerUrl`
- **System Prompt Cache**: `getSystemPromptSectionCache`, `setSystemPromptSectionCacheEntry`, `clearSystemPromptSectionState`
- **Date & Directories**: `getLastEmittedDate`, `setLastEmittedDate`, `getAdditionalDirectoriesForClaudeMd`, `setAdditionalDirectoriesForClaudeMd`
- **Channels**: `getAllowedChannels`, `setAllowedChannels`, `getHasDevChannels`, `setHasDevChannels`
- **Prompt Cache**: `getPromptCache1hAllowlist`, `setPromptCache1hAllowlist`, `getPromptCache1hEligible`, `setPromptCache1hEligible`
- **Beta Headers**: `getAfkModeHeaderLatched`, `setAfkModeHeaderLatched`, `getFastModeHeaderLatched`, `setFastModeHeaderLatched`, `getCacheEditingHeaderLatched`, `setCacheEditingHeaderLatched`, `getThinkingClearLatched`, `setThinkingClearLatched`, `clearBetaHeaderLatches`
- **Error Log**: `addToInMemoryErrorLog`
- **Cached Content**: `setCachedClaudeMdContent`, `getCachedClaudeMdContent`
- **Stats Store**: `getStatsStore`, `setStatsStore`
- **Cost State**: `resetCostState`, `setCostStateForRestore`, `resetTotalDurationStateAndCost_FOR_TESTS_ONLY`
- **Reset**: `resetStateForTests`, `resetModelStringsForTestingOnly`
- **Types**: `ChannelEntry`, `AttributedCounter`, `SessionCronTask`, `InvokedSkillInfo`
