# skillUsageTracking

## Purpose
Tracks skill usage frequency and recency to produce a ranking score for skill suggestions. Persists data to global config with process-lifetime debounce to avoid excessive file I/O.

## Imports
- **Internal**: ../config.js

## Logic
1. `recordSkillUsage` increments a skill's usage count and updates its `lastUsedAt` timestamp in global config
2. Debounced per-skill with a 60-second window (`SKILL_USAGE_DEBOUNCE_MS`) — avoids lock + read + parse on rapid repeated calls
3. `getSkillUsageScore` computes a score using exponential decay with a 7-day half-life: `usageCount * max(0.5^(daysSinceUse / 7), 0.1)`
4. The minimum recency factor of 0.1 ensures heavily-used skills don't drop to zero entirely

## Exports
- `recordSkillUsage(skillName)` - records a usage event; debounced at 60s per skill
- `getSkillUsageScore(skillName)` - returns a numeric score based on frequency and recency (7-day half-life decay, floor of 0.1); returns 0 if no usage recorded

## Source
`skillUsageTracking`
