# doctorContextWarnings

## Purpose
Provides context usage warnings for the `doctor` command, checking CLAUDE.md files, agent descriptions, MCP tools, and unreachable permission rules against token thresholds.

## Imports
- **Internal**: `../services/tokenEstimation` (roughTokenCountEstimation), `../Tool` (Tool, ToolPermissionContext types), `../tools/AgentTool/loadAgentsDir` (AgentDefinitionsResult type), `./analyzeContext` (countMcpToolTokens), `./claudemd` (getLargeMemoryFiles, getMemoryFiles, MAX_MEMORY_CHARACTER_COUNT), `./model/model` (getMainLoopModel), `./permissions/permissionRuleParser` (permissionRuleValueToString), `./permissions/shadowedRuleDetection` (detectUnreachableRules), `./sandbox/sandbox-adapter` (SandboxManager), `./statusNoticeHelpers` (AGENT_DESCRIPTIONS_THRESHOLD, getAgentDescriptionsTotalTokens), `./stringUtils` (plural)

## Logic
1. `checkClaudeMdFiles` finds large CLAUDE.md files (>40k chars each), sorted by size descending. Returns warning with per-file char counts.
2. `checkAgentDescriptions` computes total token count for agent descriptions. If over threshold, lists top 5 custom agents by token count.
3. `checkMcpTools` computes MCP tool token count via `countMcpToolTokens`. If over 25,000 tokens, groups tools by server and lists top 5 servers. Falls back to character-based estimation if token counting fails. Note: MCP tools may not be available when doctor runs (async loading).
4. `checkUnreachableRules` uses `detectUnreachableRules` to find permission rules shadowed by broader rules (e.g., specific allow shadowed by tool-wide ask). Includes fix suggestions. Checks sandbox auto-allow status.
5. `checkContextWarnings` runs all four checks in parallel via `Promise.all` and returns a `ContextWarnings` object.

Thresholds: `MCP_TOOLS_THRESHOLD` = 25,000 tokens, `AGENT_DESCRIPTIONS_THRESHOLD` (imported), `MAX_MEMORY_CHARACTER_COUNT` = 40,000 chars (imported).

## Exports
- `ContextWarning` - type with fields: `type` ('claudemd_files' | 'agent_descriptions' | 'mcp_tools' | 'unreachable_rules'), `severity` ('warning' | 'error'), `message`, `details: string[]`, `currentValue`, `threshold`
- `ContextWarnings` - type with fields: `claudeMdWarning`, `agentWarning`, `mcpWarning`, `unreachableRulesWarning` (each `ContextWarning | null`)
- `checkContextWarnings` - async function taking `tools`, `agentInfo`, and `getToolPermissionContext`, returns `ContextWarnings`

## Source
`claude-code/src/utils/doctorContextWarnings.ts`
