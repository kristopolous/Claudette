# Effort Command Definition (`index`)

## Purpose
Defines the `effort` command, which configures the model's effort level. The command can be immediate (executed without enter) depending on user configuration.

## Imports
### Internal
- `Command` type from `../../commands.js`
- `shouldInferenceConfigCommandBeImmediate` from `../../utils/immediateCommand.js`

## Logic
Creates a command object:
- `type`: `'local-jsx'`
- `name`: `'effort'`
- `description`: `'Set effort level for model usage'`
- `argumentHint`: `'[low|medium|high|max|auto]'`
- `immediate`: Getter that returns the result of `shouldInferenceConfigCommandBeImmediate()` (determines if command executes immediately when typed)
- `load`: Dynamic import of `./effort.js` (or `.tsx`)

## Exports
- Default command object (satisfies `Command`)