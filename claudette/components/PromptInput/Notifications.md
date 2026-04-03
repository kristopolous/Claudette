## Purpose
Manages and displays notifications in the prompt footer area including IDE status, token warnings, auto-updater, voice indicator, sandbox hints, and memory usage.

## Imports
- **Stdlib**: none
- **External**: BUILDFLAGS, `react`, `react/compiler-runtime`
- **Internal**: `context/notifications`, `context/voice`, `services/analytics`, `state/AppState`, `hooks/*`, `ink`, `services/claudeAiLimitsHook`, `services/compact/autoCompact`, `services/mcp`, `utils/*`, and sibling components (AutoUpdaterWrapper, ConfigurableShortcutHint, IdeStatusIndicator, MemoryUsageIndicator, SentryErrorBoundary, TokenWarning, SandboxPromptFooterHint, VoiceIndicator)

## Logic
1. Calculates token usage from messages and determines warning state based on model thresholds
2. Sets up environment hook notifier to display file change notifications
3. Shows external editor hint when input is wrapped and conditions are met
4. Renders notification content including IDE selection status, current notification, overage mode indicator, API key status, debug mode, token count, compact message awareness, auto-updater, voice errors, memory usage, and sandbox hints
5. When voice is actively recording or processing, replaces all notifications with just the VoiceIndicator
6. Wraps output in SentryErrorBoundary for error handling

## Exports
- `FOOTER_TEMPORARY_STATUS_TIMEOUT` - constant set to 5000ms for temporary notification duration
- `Notifications` - component that manages and renders all footer notifications based on app state
