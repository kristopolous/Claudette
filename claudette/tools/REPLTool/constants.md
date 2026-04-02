# tools/REPLTool/constants.ts

## Purpose
Defines constants and configuration for REPL mode, including which tools are hidden from direct inference provider use.

## Imports
- **Stdlib**: None
- **External**: None
- **Internal**: `isEnvDefinedFalsy`, `isEnvTruthy`, tool name constants from AgentTool, BashTool, FileEditTool, FileReadTool, FileWriteTool, GlobTool, GrepTool, NotebookEditTool

## Logic
Determines REPL mode enablement based on environment variables (`CLAUDE_CODE_REPL`, `CLAUDE_REPL_MODE`) and runtime context (USER_TYPE, CLAUDE_CODE_ENTRYPOINT). REPL mode is default-on for ants in the interactive CLI but disabled for SDK entrypoints. Also defines a set of tools that are only accessible via REPL when REPL mode is enabled, hiding them from direct inference provider use.

## Exports
- `REPL_TOOL_NAME` - the string identifier for the REPL tool
- `isReplModeEnabled` - function that checks environment and context to determine if REPL mode is active
- `REPL_ONLY_TOOLS` - a Set of tool names that are hidden from direct use when REPL mode is on
