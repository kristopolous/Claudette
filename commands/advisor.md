## Purpose
Configure the advisor model that provides parallel reasoning assistance.

## Imports
- **Internal**: Advisor utility functions (canUserConfigureAdvisor, isValidAdvisorModel, modelSupportsAdvisor), model parsing/validation utils, settings update utility

## Logic
1. Without arguments: shows current advisor model or suggests setting one
2. With `off` or `unset`: disables advisor and clears setting
3. With model name: validates the model and ensures it's valid as an advisor
4. Checks if current main model supports advisors (warns if not)
5. Updates app state and user settings with normalized advisor model
6. Returns text feedback about advisor configuration

## Exports
- `call` - async LocalCommandCall function
- `advisor` - local Command object
