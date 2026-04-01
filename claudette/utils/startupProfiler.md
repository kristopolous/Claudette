# utils/startupProfiler

## Purpose
Provides startup profiling utility for measuring initialization phases.

## Imports
- **Stdlib**: `path`
- **External**: (none)
- **Internal**: bootstrap state, analytics, debug, envUtils, fsOperations, profilerBase, slowOperations

## Logic
1. Two modes: sampled logging (100% ant, 0.1% external) and detailed profiling (CLAUDE_CODE_PROFILE_STARTUP=1)
2. Uses Node.js built-in performance hooks API for standard timing measurement
3. `DETAILED_PROFILING` - detailed profiling enabled via env var
4. `STATSIG_SAMPLE_RATE` (0.005) - sampling rate for Statsig logging
5. `STATSIG_LOGGING_SAMPLED` - whether this run is sampled for Statsig
6. `SHOULD_PROFILE` - enable profiling if detailed OR sampled for Statsig
7. `memorySnapshots` - array of memory usage snapshots (for detailed profiling only)
8. Stored as array appending in same order as perf.mark() calls
9. Map keyed by checkpoint name is wrong - some checkpoints fire more than once
10. `PHASE_DEFINITIONS` - phase definitions for Statsig logging
11. import_time, init_time, settings_time, total_time
12. `profileCheckpoint` - records checkpoint with given name
13. Uses getPerformance().mark(name)
14. Captures memory snapshot only when detailed profiling enabled
15. `getFormattedReport` - gets formatted report of all checkpoints
16. Only available when DETAILED_PROFILING enabled
17. `profilePhase` - profiles phase with start/end checkpoints
18. `logStartupPhases` - logs startup phases to Statsig
19. `writeProfileReport` - writes profile report to file
20. `getPerformance` - gets performance API
21. `formatMs`, `formatTimelineLine` - formatting functions
22. `getSessionId` - gets session ID
23. `logEvent`, `AnalyticsMetadata_I_VERIFIED_THIS_IS_NOT_CODE_OR_FILEPATHS` - analytics types
24. `logForDebugging` - debug logging
25. `getClaudeConfigHomeDir`, `isEnvTruthy` - env utils
26. `getFsImplementation` - gets fs implementation
27. `writeFileSync_DEPRECATED` - writes file sync

## Exports
- `profileCheckpoint` - records checkpoint
- `getFormattedReport` - gets formatted report
- `profilePhase` - profiles phase
- `logStartupPhases` - logs startup phases
- `writeProfileReport` - writes profile report
- (Startup profiling functions)
