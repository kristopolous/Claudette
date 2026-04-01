## Purpose
An AI-powered utility that translates natural language user requests into structured agent definitions, including optimized identifiers, triggering logic, and expert system prompts.

## Imports
- **Stdlib**: None
- **External**: `inference-provider-sdk` (e.g., anthropic)
- **Internal**: `context`, `services/api/inference-provider`, `Tool`, `tools/AgentTool/constants`, `utils/api`, `utils/messages`, `utils/model/model`, `memdir/paths`, `services/analytics`, `utils/slowOperations`, `utils/systemPromptType`

## Logic
1. **Architect Persona**: Employs a specialized "Architect" system prompt that instructs the inference provider to act as an elite AI architect. This prompt defines rigorous standards for agent design, focusing on core intent, expert identity, comprehensive behavioral instructions, and performance optimization.
2. **Context Integration**: Incorporates project-specific guidance (e.g., from `CLAUDETTE.md` files) to ensure generated agents align with local coding standards, architectural patterns, and project structures.
3. **Collision Prevention**: Informs the model of existing agent identifiers to ensure that newly generated identifiers are unique and descriptive.
4. **Dynamic Feature Injection**: 
    - Automatically appends "Agent Memory" instructions if the persistent context feature is enabled, allowing the generated agent to learn and record domain-specific patterns across conversations.
    - Injects specific examples and formatting requirements for the "when to use" metadata field.
5. **Robust Parsing**: 
    - Forces the model to output a strict JSON structure containing the agent's identifier, triggering conditions, and system prompt.
    - Implements fallback parsing logic to extract JSON payloads from conversational responses if the strict format is missed.
6. **Validation**: Ensures all required fields (identifier, description, and prompt) are present and valid before returning the result.
7. **Telemetry**: Logs an event to the analytics system upon successful agent definition generation for performance and usage tracking.

## Exports
- `generateAgent` - An asynchronous function that queries the inference provider to create a new, project-aware agent definition from a user prompt.
