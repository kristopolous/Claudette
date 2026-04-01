## Purpose
A UI module that provides a visual activity indicator (spinner) for long-running background operations, incorporating status messages, token usage metrics, and contextual user tips.

## Imports
- **External**: `lodash-es/sample`, `figures`
- **Internal**: 
    - UI: `ink`, `MessageResponse`, `TaskListV2`, `Spinner/index`, `Spinner/SpinnerAnimationRow`, `Spinner/TeammateSpinnerTree`
    - State/Selectors: `bootstrap/state`, `state/AppState`, `state/selectors`, `hooks/useTasksV2`, `hooks/useTerminalSize`, `hooks/useSettings`, `hooks/useAnimationFrame`
    - Utilities: `bridge/bridgeStatusUtil`, `utils/envUtils`, `utils/array`, `utils/format`, `utils/activityManager`, `utils/effort`, `utils/model/model`, `utils/config`
    - Constants: `constants/spinnerVerbs`, `constants/figures`

## Logic
1. **Adaptive Rendering**: The module evaluates environment settings (e.g., "Brief Mode") and current session state to switch between a detailed status view and a compact, single-line indicator.
2. **Inference Tracking**: Implements timing logic to monitor how long the inference provider spends "thinking." It enforces a minimum display threshold for this state to prevent rapid UI transitions (flickering).
3. **Metric Aggregation**: 
    - Dynamically selects operational verbs (e.g., "Analyzing", "Searching") to describe current work.
    - Sums performance data (such as token counts) from both the primary agent and any active background teammates to provide a holistic progress report.
4. **Contextual Guidance**: Monitors the duration of active operations; if specific time milestones are reached, it surfaces relevant advice (e.g., suggesting session maintenance commands) to help the user manage the context window.
5. **Multi-Agent Coordination**: If teammates are running, it organizes their individual status lines into a hierarchical "tree" structure, allowing for simultaneous tracking of parallel tasks.
6. **Activity Registration**: Notifies a global activity manager when the spinner starts or stops to prevent the system from entering an idle state during processing.

## Exports
- `SpinnerWithVerb` - The primary controller for selecting and displaying the active spinner variant.
- `BriefIdleStatus` - Provides a consistent UI footprint when the system is in a compact mode but currently idle.
- `Spinner` - A primitive visual animation component without text metadata.
