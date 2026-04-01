## Purpose
Analyze Claude Code usage data and generate insights about user behavior, patterns, and optimization opportunities.

## Imports
- **External**: `diff` (line diffing), multiple Node.js built-ins (fs, os, path, child_process)
- **Internal**: Claude API (queryWithModel), session storage utils, analytics services, config utils, error handling, various type definitions

## Logic
1. Collects session data from local storage and optionally remote hosts (Ant-only)
2. Processes session logs to extract:
   - Session metadata (duration, messages, tokens, languages, git activity)
   - Tool usage statistics
   - Error tracking and categorization
   - User response times and interruptions
   - Lines added/removed, files modified
   - Multi-clauding detection (overlapping sessions within 30min window)
3. Extracts "facets" from transcripts using AI analysis:
   - Goal categories, outcomes, satisfaction, helpfulness, session types, friction, success factors
4. Aggregates data across all sessions (sums, averages, distributions)
5. Launches parallel AI analysis for 6 insight sections:
   - project_areas: Identify distinct work areas
   - interaction_style: Analyze how user interacts with Claude
   - what_works: Highlight impressive workflows
   - friction_analysis: Identify pain points
   - suggestions: Recommend improvements (CLAUDE.md additions, CC features to try, usage patterns)
   - on_the_horizon: Future opportunities (big, ambitious)
   - [Ant-only] cc_team_improvements, model_behavior_improvements
   - fun_ending: Memorable qualitative moment
6. Caches facets and session metadata to disk
7. Command is prompt-based but does heavy background processing; user typically runs and receives report

## Exports
- `call` - async function that collects data, runs analyses, returns insights report
- Helper functions: deduplicateSessionBranches, extractToolStats, logToSessionMeta, formatTranscriptForFacets, aggregateData, detectMultiClauding, etc.
