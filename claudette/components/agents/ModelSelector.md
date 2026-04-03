## Purpose
Provides a UI component for selecting an inference model for an agent.

## Imports
- **External**: REACT, REACT/compiler-runtime
- **Internal**: ink (Box, Text), utils/model/agent (getAgentModelOptions), CustomSelect/select (Select)

## Logic
Retrieves available model options and ensures the current model (if custom) is included in the selection list. Renders a select component with a descriptive hint about model capabilities. Defaults to sonnet if no model is specified.

## Exports
- `ModelSelector` - renders a model selection interface with available inference provider models