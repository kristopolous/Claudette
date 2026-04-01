# utils/advisor

## Purpose
Provides advisor tool support for server-side tool use with encrypted results.

## Imports
- **Stdlib**: (none)
- **External**: `@anthropic-ai/sdk`
- **Internal**: growthbook, betas, envUtils, settings

## Logic
1. `AdvisorServerToolUseBlock` - server_tool_use type with advisor name
2. `AdvisorToolResultBlock` - advisor_tool_result with content variants
3. Content types: advisor_result (text), advisor_redacted_result (encrypted), advisor_tool_result_error
4. `AdvisorBlock` - union of tool use and result blocks
5. `isAdvisorBlock` - type guard for advisor blocks
6. `AdvisorConfig` - enabled, canUserConfigure, baseModel, advisorModel
7. `getAdvisorConfig` - fetches config from tengu_sage_compass GrowthBook feature
8. `isAdvisorEnabled` - checks if advisor tool enabled
9. Respects CLAUDE_CODE_DISABLE_ADVISOR_TOOL env var
10. Requires first-party-only betas (Bedrock/Vertex 400 on it)
11. `canUserConfigureAdvisor` - checks if user can configure advisor
12. `getExperimentAdvisorModels` - gets base and advisor models for experiment
13. Returns undefined if not enabled or user can configure

## Exports
- `AdvisorServerToolUseBlock` - server tool use block type
- `AdvisorToolResultBlock` - tool result block type
- `AdvisorBlock` - advisor block union type
- `isAdvisorBlock` - type guard for advisor blocks
- `isAdvisorEnabled` - checks if advisor enabled
- `canUserConfigureAdvisor` - checks user configuration permission
- `getExperimentAdvisorModels` - gets experiment models
