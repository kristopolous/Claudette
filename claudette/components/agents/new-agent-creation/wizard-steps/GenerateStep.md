## Purpose
Provides a wizard step for generating an agent configuration from a natural language description using the inference provider.

## Imports
- **External**: @anthropic-ai/sdk (APIUserAbortError), REACT, REACT/compiler-runtime, useCallback, useRef, useState
- **Internal**: hooks/useMainLoopModel (useMainLoopModel),ink (Box, Text),keybindings/useKeybinding,utils/abortController (createAbortController),utils/promptEditor (editPromptInEditor),ConfigurableShortcutHint, designsystem/Byline,Spinner,TextInput,wizard/index (useWizard), wizard/WizardDialogLayout, generateAgent (generateAgent), types (AgentWizardData type)

## Logic
Accepts a natural language prompt, calls the inference provider to generate agent configuration (identifier, whenToUse, systemPrompt), handles abort/cancellation, and skips to the tools step on success. Displays a spinner during generation and supports external editor for the prompt input.

## Exports
- `GenerateStep` - renders an AI-powered agent generation step with prompt input and loading state
