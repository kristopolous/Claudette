# utils/bash/shellCompletion

## Purpose
Provides shell completion suggestions for command line input.

## Imports
- **Stdlib**: (none)
- **External**: (none)
- **Internal**: PromptInput suggestions, bash shellQuote, debug, localInstaller, Shell

## Logic
1. `MAX_SHELL_COMPLETIONS` (15) - max completions to show
2. `SHELL_COMPLETION_TIMEOUT_MS` (1000) - completion timeout
3. `COMMAND_OPERATORS` - |, ||, &&, ;
4. `ShellCompletionType` - command, variable, file
5. `InputContext` - prefix, completionType
6. `isCommandOperator` - checks if token is command operator
7. `getCompletionTypeFromPrefix` - determines completion type from prefix
8. $ → variable, /~/. → file, else → command
9. `findLastStringToken` - finds last string token and index
10. `isNewCommandContext` - checks if expecting new command
11. `parseInputContext` - parses input for completion context
12. `getShellCompletions` - gets completions from shell
13. Uses Shell.complete for actual completion
14. Handles timeout and max completions limit
15. Formats completions as SuggestionItem array

## Exports
- `MAX_SHELL_COMPLETIONS` - max completions constant
- `SHELL_COMPLETION_TIMEOUT_MS` - timeout constant
- `ShellCompletionType` - completion type
- `InputContext` - input context type
- `getShellCompletions` - gets shell completions
