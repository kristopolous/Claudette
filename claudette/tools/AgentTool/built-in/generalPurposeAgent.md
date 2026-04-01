# tools/AgentTool/built-in/generalPurposeAgent

## Purpose
Defines the General Purpose agent for complex research and multi-step tasks.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: loadAgentsDir

## Logic
1. `SHARED_PREFIX` - base prompt for general-purpose agent
2. `SHARED_GUIDELINES` - shared guidelines for agent behavior
3. Strengths:
   - Searching code/configurations across large codebases
   - Analyzing multiple files for system architecture
   - Investigating complex questions requiring many files
   - Performing multi-step research tasks
4. Guidelines:
   - Search broadly when unsure of location
   - Start broad and narrow down for analysis
   - Use multiple search strategies
   - Be thorough: check multiple locations, naming conventions
   - NEVER create files unless absolutely necessary
   - NEVER proactively create documentation (*.md, README)
5. `getGeneralPurposeSystemPrompt` - combines prefix and guidelines
6. Appends absolute-path + emoji guidance via enhanceSystemPromptWithEnvDetails
7. `GENERAL_PURPOSE_AGENT` - agent definition
8. agentType: 'general-purpose'
9. tools: ['*'] - all tools available
10. source: 'built-in', baseDir: 'built-in'
11. model omitted - uses getDefaultSubagentModel()

## Exports
- `GENERAL_PURPOSE_AGENT` - general purpose agent definition
