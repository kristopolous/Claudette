## Purpose
Initializes and manages the cron scheduler for scheduled tasks (e.g., `/schedule`), firing prompts into the command queue at the appropriate times.

## Imports
- **External**: REACT (useEffect, useRef)
- **Internal**:
  - `./state/AppState` (useAppStateStore, useSetAppState)
  - `./Task` (isTerminalTaskStatus)
  - `./tasks/InProcessTeammateTask/InProcessTeammateTask` (findTeammateTaskByAgentId, injectUserMessageToTeammate)
  - `./tools/ScheduleCronTool/prompt` (isKairosCronEnabled)
  - `./types/message` (Message)
  - `./utils/cronJitterConfig` (getCronJitterConfig)
  - `./utils/cronScheduler` (createCronScheduler)
  - `./utils/cronTasks` (removeCronTasks)
  - `./utils/debug` (logForDebugging)
  - `./utils/messageQueueManager` (enqueuePendingNotification)
  - `./utils/messages` (createScheduledTaskFireMessage)
  - `./utils/workloadContext` (WORKLOAD_CRON)

## Logic
- Props: `{ isLoading: boolean, assistantMode?: boolean, setMessages: Dispatch<SetStateAction<Message[]>> }`
- Uses `useRef` to hold latest `isLoading` without re-creating scheduler
- Effect runs once on mount (assistantMode is the only reactive dep):
  - Guard: if `!isKairosCronEnabled()` return (runtime feature flag)
  - `enqueueForLead(prompt)`: enqueues as 'later' priority, isMeta=true, workload=WORKLOAD_CRON
  - Creates scheduler via `createCronScheduler` with:
    - `onFire`: enqueueForLead (for team-lead durable crons)
    - `onFireTask`: routes by task.agentId:
      - If teammate exists and not terminal status → `injectUserMessageToTeammate`
      - Else teammate missing → log and `removeCronTasks` (cleanup orphan)
      - Else no agentId → add system message and enqueue
    - `isLoading`: () from ref (captures current session load state)
    - `assistantMode`, `getJitterConfig`, `isKilled` (re-checks feature flag)
  - `scheduler.start()`; cleanup stops scheduler
- The scheduler core lives in `cronScheduler` (shared with headless modes)

## Exports
- `useScheduledTasks` - Hook `(props: { isLoading: boolean, assistantMode?: boolean, setMessages: React.Dispatch<React.SetStateAction<Message[]>> }) => void`
