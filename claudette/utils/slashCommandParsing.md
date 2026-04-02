# slashCommandParsing

## Purpose
Centralized utilities for parsing slash command input strings into component parts (command name, args, MCP flag).

## Imports
- (none)

## Logic
1. `parseSlashCommand(input)` - parses a slash command string:
   - Trims input, returns null if it doesn't start with `/`
   - Removes leading `/`, splits by spaces
   - Returns null if no command name after `/`
   - Detects MCP commands: if second word is `(MCP)`, appends it to commandName and sets `isMcp: true`
   - Args are everything after the command name (joined by spaces)
   - Example: `/search foo bar` → `{ commandName: 'search', args: 'foo bar', isMcp: false }`
   - Example: `/mcp:tool (MCP) arg1 arg2` → `{ commandName: 'mcp:tool (MCP)', args: 'arg1 arg2', isMcp: true }`
2. `ParsedSlashCommand` type: `{ commandName: string, args: string, isMcp: boolean }`

## Exports
- `ParsedSlashCommand` - type alias for parsed slash command result
- `parseSlashCommand` - parses a slash command string, returns ParsedSlashCommand or null if invalid

## Source
`slashCommandParsing`
