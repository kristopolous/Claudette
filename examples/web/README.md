# Claudette Web

AI-powered coding assistant running in the browser with a virtualized filesystem, real shell, and full tool system.

## Features

- **Chat Interface** — Stream responses from any OpenAI-compatible API (Claude, GPT-4, local models via Ollama)
- **Virtualized Filesystem** — Files persist to `.claudette-workspaces/<sessionId>/` and survive hot-reloads
- **Real Shell (jsh)** — Interactive terminal backed by real `bash` in a sandboxed workspace directory
- **Syntax Highlighting** — File viewer with highlight.js for 100+ languages
- **Resizable Panels** — Drag to resize file explorer, chat area, and terminal/file viewer
- **Slash Commands** — `/clear`, `/help`, `/model`, `/cost`, `/status`, `/commit`, `/review`, `/security-review`, `/insights`, `/skills`, `/agents`, `/todos`, `/export`, `/memory`, `/permission`, `/version`
- **Tool System** — Bash, Read, Write, Edit, Grep, Glob, WebFetch, WebSearch, TodoWrite, Agent, Skill, TaskOutput, TaskStop
- **MCP Support** — Connect to external MCP servers for dynamic tool discovery
- **Skills System** — Bundled skills (explain-code, generate-tests, refactor, debug, write-docs) with custom triggers
- **Agent System** — Built-in agents (explorer, planner, verifier, reviewer, security)
- **Memory System** — Fuzzy-searchable persistent memory store
- **Context Compaction** — Automatic message trimming when approaching context limits
- **Cost Tracking** — Per-model pricing with token counting and estimated cost display
- **Export as ZIP** — Download all workspace files as a `.zip` archive

## Getting Started

```bash
cd examples/web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Enter your API key and start chatting.

## Configuration

Copy `.env.example` to `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-...
# or for OpenAI-compatible endpoints:
OPENAI_API_KEY=sk-...
```

API keys can also be entered directly in the UI. Keys are stored in `localStorage` and never sent to any server except the configured API endpoint.

## Architecture

```
src/
├── app/
│   ├── page.tsx                  # Main app entry
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles + highlight.js theme
│   └── api/
│       ├── chat/route.ts         # SSE streaming chat endpoint
│       ├── files/route.ts        # File CRUD + tree + export
│       └── shell/route.ts        # Real bash shell (SSE output + POST input)
├── components/
│   ├── ApiKeyInput.tsx           # API key + model selection
│   ├── ChatUI.tsx                # Main chat interface with panels
│   ├── MessageBubble.tsx         # User/assistant message display
│   ├── PromptInput.tsx           # Input with slash command autocomplete
│   ├── JshTerminal.tsx           # Interactive terminal
│   ├── FileExplorer.tsx          # File tree sidebar
│   ├── FileViewer.tsx            # Syntax-highlighted file viewer
│   ├── ToolResult.tsx            # Collapsible tool execution results
│   ├── WriteResult.tsx           # File write preview
│   ├── TerminalOutput.tsx        # Terminal output display
│   ├── MarkdownContent.tsx       # Markdown rendering
│   ├── UsageDisplay.tsx          # Token/cost stats
│   └── ResizeHandle.tsx          # Draggable panel resizer
├── lib/
│   ├── queryEngine.ts            # Core query loop with tool execution
│   ├── session/index.ts          # Session management + disk persistence
│   ├── virtualfs/
│   │   ├── index.ts              # Disk-backed VirtualFS
│   │   └── jsh.ts                # Virtualized shell builtins
│   ├── shell/index.ts            # Shell process management
│   ├── tools/                    # Tool implementations
│   ├── commands/                 # Slash command implementations
│   ├── mcp/                      # MCP client
│   ├── skills/                   # Skill system
│   ├── agents/                   # Agent system
│   ├── memory/                   # Memory store
│   ├── compact/                  # Context compaction
│   ├── prompts/                  # System prompt builder
│   └── permissions/              # Tool permission system
└── types/
    └── index.ts                  # All TypeScript interfaces
```

## Workspace

Each session gets its own directory at `.claudette-workspaces/<sessionId>/`. All file operations (Write tool, Bash commands, jsh terminal) operate within this sandboxed directory. The filesystem persists across hot-reloads and server restarts.

## Supported Models

Any OpenAI-compatible API endpoint:

- Claude Sonnet 4 / Opus 4 / Haiku 4 (via Anthropic API or proxy)
- GPT-4o / GPT-4o Mini (OpenAI)
- Qwen, Llama, Mistral (via Ollama, vLLM, LiteLLM, etc.)

Configure the base URL in the UI or via `baseUrl` prop for self-hosted endpoints.
