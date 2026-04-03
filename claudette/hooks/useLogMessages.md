# useLogMessages

## Purpose
Logs messages to the transcript with incremental updates, handling compaction and conversation rewinding.

## Imports
- **Stdlib**: `useEffect`, `useRef` from 'REACT'
- **External**: None
- **Internal**: `UUID` from 'crypto', `useAppState`, `Message`, `isAgentSwarmsEnabled`, `cleanMessagesForLogging`, `isChainParticipant`, `recordTranscript`

## Logic
1. Uses append-only tracking to only process new message tail (avoids O(n) filter on every update)
2. Detects first render vs incremental vs compaction vs rewinding via uuid/length comparisons
3. Passes team context for swarm-enabled sessions
4. Uses sequence numbers to guard against stale async callbacks
5. Sync-walks to find last chain participant for parent hint

## Exports
- `useLogMessages` - Hook that records messages to transcript
