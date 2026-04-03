## Purpose
Surfaces plugin installation prompts from `<claude-code-hint />` tags; handles user responses with show-once semantics and analytics.

## Imports
- **External**: REACT (useSyncExternalStore, useEffect, useCallback)
- **Internal**:
  - `./context/notifications` (useNotifications)
  - `./services/analytics/index` (logEvent, AnalyticsMetadata types)
  - `./utils/claudeCodeHints` (clearPendingHint, getPendingHintSnapshot, markShownThisSession, subscribeToPendingHint)
  - `./utils/debug` (logForDebugging)
  - `./utils/plugins/hintRecommendation` (disableHintRecommendations, markHintPluginShown, PluginHintRecommendation, resolvePluginHint)
  - `./utils/plugins/pluginInstallationHelpers` (installPluginFromMarketplace)
  - `/usePluginRecommendationBase` (installPluginAndNotify, usePluginRecommendationBase)

## Logic
1. `usePluginRecommendationBase()` provides { recommendation, clearRecommendation, tryResolve }
2. `useSyncExternalStore` subscribes to pending hint snapshot (external store)
3. When `pendingHint` changes: calls `tryResolve` → `resolvePluginHint` → if resolved, marks shown this session, clears pending hint
4. `handleResponse(response)`:
   - Logs analytics `tengu_plugin_hint_response` with plugin/marketplace names and response (yes/no/disable)
   - "yes": calls `installPluginAndNotify` → `installPluginFromMarketplace` with `trigger: "hint"`
   - "disable": calls `disableHintRecommendations()` to turn off all future hints
   - "no": simply clears recommendation
   - Always `markHintPluginShown(pluginId)` and `clearRecommendation()`
5. Returns `{ recommendation: PluginHintRecommendation | null, handleResponse }`

## Exports
- `useClaudeCodeHintRecommendation` - Hook returning `{ recommendation, handleResponse: (response: 'yes' | 'no' | 'disable') => void }`
- `PluginHintRecommendation` type (from internal utils)
