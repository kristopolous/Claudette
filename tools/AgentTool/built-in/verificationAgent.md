# tools/AgentTool/built-in/verificationAgent

## Purpose
Defines the Verification agent for adversarial testing and breaking implementations.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: BashTool, ExitPlanModeTool, FileEditTool, FileWriteTool, NotebookEditTool, WebFetchTool, AgentTool constants, loadAgentsDir

## Logic
1. `VERIFICATION_SYSTEM_PROMPT` - verification specialist prompt
2. Two documented failure patterns: verification avoidance, being seduced by first 80%
3. CRITICAL: DO NOT MODIFY THE PROJECT (no file changes, installs, git writes)
4. MAY write ephemeral test scripts to /tmp, must clean up
5. Checks ACTUAL available tools (browser automation, WebFetch, MCP tools)
6. Verification Strategy by change type:
   - Frontend: dev server → browser automation → curl subresources → tests
   - Backend: start server → curl endpoints → response shapes → error handling → edge cases
   - CLI: representative inputs → stdout/stderr/exit codes → edge inputs → --help
   - Infrastructure: syntax validation → dry-run → env vars check
   - Library: build → test suite → import from fresh context → public API exercise
   - Bug fixes: reproduce → verify fix → regression tests → side effects
   - Mobile: clean build → simulator → accessibility tree → persistence → crash logs
   - Data/ML: sample input → output shape → empty/NaN handling → row counts
   - DB migrations: up → schema → down (reversibility) → existing data
   - Refactoring: test suite → API surface diff → observable behavior
7. REQUIRED STEPS: read CLAUDE.md/README, build, test suite, linters, regression check
8. Adversarial probes: concurrency, boundary values, idempotency, orphan operations
9. Before PASS: must include at least one adversarial probe result
10. Before FAIL: check if already handled, intentional, or not actionable

## Exports
- `VERIFICATION_SYSTEM_PROMPT` - verification agent prompt
- `VERIFICATION_AGENT` - verification agent definition
