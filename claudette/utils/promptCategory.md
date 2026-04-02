# promptCategory

## Purpose
Determines prompt categories for analytics tracking — categorizes agent usage patterns and REPL output style usage.

## Imports
- **Internal**: `src/constants/querySource` (QuerySource type), `../constants/outputStyles` (DEFAULT_OUTPUT_STYLE_NAME, OUTPUT_STYLE_CONFIG), `./settings/settings` (getSettings_DEPRECATED)

## Logic
1. Agent queries are categorized as `agent:builtin:{type}`, `agent:default`, or `agent:custom` based on whether the agent is built-in and its type
2. REPL queries are categorized as `repl_main_thread` for default output style, or `repl_main_thread:outputStyle:{style}` / `repl_main_thread:outputStyle:custom` for non-default styles
3. Output style classification checks against OUTPUT_STYLE_CONFIG to determine built-in vs custom

## Exports
- `getQuerySourceForAgent(agentType?, isBuiltInAgent)` - returns QuerySource for agent analytics: `agent:builtin:{type}`, `agent:default`, or `agent:custom`
- `getQuerySourceForREPL()` - returns QuerySource for REPL analytics based on current output style setting