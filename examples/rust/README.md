# claudette-rs

A terminal-based AI coding agent written in Rust. Full TUI with markdown rendering, syntax highlighting, tool-use loop, MCP support, and dual-provider API (Anthropic + OpenAI-compatible).

## Features

- **Rich TUI** — ratatui-based interface with two-pane layout (messages + input), mouse support, and full readline-style input editing
- **Markdown Rendering** — Custom renderer using pulldown-cmark + syntect with syntax highlighting (Solarized Dark theme), tables with box-drawing characters, and proper word wrapping
- **Tool System** — 9 built-in tools: Bash, Read, Write, Edit, Glob, Grep, TodoWrite, WebFetch, WebSearch
- **MCP Support** — Full Model Context Protocol implementation with stdio transport, tool discovery, and multi-server management
- **Dual API Provider** — Anthropic Claude and OpenAI-compatible endpoints with streaming via Server-Sent Events
- **Context Management** — Automatic compaction when exceeding message limits, git context gathering, CLAUDE.md loading
- **Slash Commands** — `/help`, `/clear`, `/model`, `/cost` with tab completion
- **Permission System** — Auto/Bypass/Default modes with per-tool allow/deny lists
- **Persistent History** — JSONL-based session history at `~/.config/claudette/history.jsonl`
- **Demo Mode** — `--demo` flag simulates AI responses to showcase the TUI without an API key

## Getting Started

```bash
cd examples/rust
cargo run -- --help
```

### Basic Usage

```bash
# Auto-detect API key from environment
cargo run

# Specify provider and model
cargo run -- --provider openai --model gpt-4o --base-url http://localhost:11434/v1

# Demo mode (no API key needed)
cargo run -- --demo

# REPL mode
cargo run -- --repl
```

## Configuration

API keys are auto-detected from environment variables:
- `ANTHROPIC_API_KEY` for Anthropic
- `OPENAI_API_KEY` for OpenAI-compatible

MCP servers are configured at `~/.config/claudette/mcp.json`:
```json
[
  {
    "name": "filesystem",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"],
    "instructions": "Access to the filesystem"
  }
]
```

Settings at `~/.config/claudette/settings.json`:
```json
{
  "permission_mode": "auto",
  "read_only": false
}
```

## Architecture

```
src/
├── main.rs              # CLI entry point, demo mode, query loop
├── lib.rs               # Library root (9 modules)
├── markdown.rs          # Custom markdown → ratatui renderer with syntax highlighting
├── types/               # Core data types
│   ├── message.rs       # Message, ContentBlock, ToolResultContent
│   ├── tool.rs          # Tool trait, ToolRegistry, ToolUseContext
│   ├── command.rs       # Command, CommandHandler, CommandRegistry
│   ├── event.rs         # StreamEvent enum for UI events
│   ├── permission.rs    # PermissionMode, PermissionContext, PermissionDecision
│   ├── task.rs          # Task types and status
│   └── usage.rs         # ModelUsage, CostTracker
├── tools/               # 9 built-in tool implementations
│   ├── bash_tool.rs     # Shell command execution
│   ├── read_tool.rs     # File reading with offset/limit
│   ├── write_tool.rs    # File creation/overwrite
│   ├── edit_tool.rs     # Search-and-replace
│   ├── glob_tool.rs     # Glob pattern matching
│   ├── grep_tool.rs     # Regex search with --include filter
│   ├── todo_write_tool.rs  # Todo list management
│   ├── web_fetch_tool.rs   # URL content fetching
│   └── web_search_tool.rs  # DuckDuckGo web search
├── api/                 # LLM API client layer
│   ├── client.rs        # LlmClient with Anthropic + OpenAI support
│   └── stream.rs        # QueryEngine — core tool-use orchestration loop
├── tui/                 # Terminal UI
│   └── app.rs           # ratatui app with input editing, scrolling, event handling
├── commands/            # Slash commands
│   ├── help_command.rs
│   ├── clear_command.rs
│   ├── model_command.rs
│   └── cost_command.rs
├── context/             # Project context gathering
│   ├── git_context.rs   # git2 integration for repo status
│   └── claude_md.rs     # CLAUDE.md discovery and loading
├── mcp/                 # Model Context Protocol
│   ├── protocol.rs      # JSON-RPC + MCP types
│   ├── transport.rs     # StdioTransport (subprocess communication)
│   └── client.rs        # McpClient, McpToolWrapper, McpManager
└── utils/
    ├── system_prompt.rs # Dynamic system prompt builder (14 sections)
    ├── register_tools.rs
    ├── register_commands.rs
    └── history.rs       # JSONL session history store
```

## Key Bindings

| Key | Action |
|---|---|
| Enter | Submit message |
| Shift+Enter | Newline in input |
| Tab | Slash command autocomplete |
| Ctrl+P / ↑ | Previous history |
| Ctrl+N / ↓ | Next history |
| Ctrl+A / Home | Move to start |
| Ctrl+E / End | Move to end |
| Ctrl+B / ← | Move backward |
| Ctrl+F / → | Move forward |
| Ctrl+K | Kill to end of line |
| Ctrl+Y | Yank (paste killed text) |
| Ctrl+C | Quit |
| Mouse wheel | Scroll messages |
| PageUp / PageDown | Scroll messages |

## Dependencies

- **Async**: tokio, tokio-util, async-stream, async-trait, futures
- **TUI**: ratatui 0.29, crossterm 0.28
- **HTTP**: reqwest 0.12, reqwest-eventsource 0.6
- **Markdown**: pulldown-cmark 0.10, syntect 5.1
- **Schema**: schemars 0.8, validator 0.19
- **CLI**: clap 4 (derive)
- **Git**: git2 0.19
- **Other**: serde, serde_json, regex, walkdir, ignore, fuzzy-matcher, lru, parking_lot, colored, shell-words, notify, uuid, chrono, dirs, tracing
