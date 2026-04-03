## Purpose
Orchestrates the multi-step wizard for creating a new agent.

## Imports
- **External**: REACT, REACT/compiler-runtime
- **Internal**: memdir/paths (isAutoMemoryEnabled), Tool (Tools type), tools/AgentTool/loadAgentsDir (AgentDefinition type), wizard/index (WizardProvider), wizard/types (WizardStepComponent type), wizard-steps/ColorStep, wizard-steps/ConfirmStepWrapper, wizard-steps/DescriptionStep, wizard-steps/GenerateStep, wizard-steps/LocationStep, wizard-steps/MemoryStep, wizard-steps/MethodStep, wizard-steps/ModelStep, wizard-steps/PromptStep, wizard-steps/ToolsStep, wizard-steps/TypeStep, types (AgentWizardData type)

## Logic
Assembles the ordered sequence of wizard steps based on configuration and memory settings. Conditionally includes the MemoryStep when auto-memory is enabled. Wraps all steps in a WizardProvider with initial data and completion/cancellation handlers.

## Exports
- `CreateAgentWizard` - renders the complete agent creation wizard with all configured steps