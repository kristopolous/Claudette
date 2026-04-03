# tk-claudette

A desktop GUI AI coding agent built with Python and Tkinter. Vibe your own Claude.

## Quick Start

```bash
# Install dependencies
pip install httpx

# Set your API key
export ANTHROPIC_API_KEY=your-key-here

# Run
python3 -m tk.main
```

## Any Provider, Any Model

Works with any OpenAI-compatible endpoint:

```bash
# Anthropic (default)
python3 -m tk.main

# OpenAI
python3 -m tk.main --host https://api.openai.com/v1 --model gpt-4o

# OpenRouter
python3 -m tk.main --host https://openrouter.ai/api/v1 --model anthropic/claude-sonnet-4

# Ollama (local)
python3 -m tk.main --host http://localhost:11434/v1 --model llama3

# LiteLLM proxy
python3 -m tk.main --host http://localhost:4000 --model claude-sonnet-4

# Custom vLLM endpoint
python3 -m tk.main --host http://localhost:8000/v1 --model meta-llama/Llama-3-70b
```

Or switch at runtime with slash commands:
```
/host https://api.openai.com/v1
/model gpt-4o
/key sk-your-key
```

## Features

- **7 built-in tools**: Bash, Read, Write, Edit, Grep, Glob, WebFetch
- **Streaming responses** with real-time display
- **Conversation history** with up/down arrow navigation
- **Cost tracking** in the status bar
- **MCP server management** with JSON configuration editor
- **Slash commands**: `/help`, `/clear`, `/model`, `/host`, `/key`, `/cost`, `/config`, `/version`

## Architecture

```
tk/
├── main.py          # CLI entry point
├── config.py        # Settings, model costs, persistence
├── api.py           # Provider-agnostic API client (Anthropic + OpenAI-compatible)
├── tools.py         # Tool registry and 7 built-in tools
├── query.py         # Conversation loop and tool orchestration
├── prompts.py       # System prompt construction (ported from claudette)
├── types.py         # Core data models
└── ui.py            # Tkinter GUI
```

## Requirements

- Python 3.10+
- `httpx` (only external dependency)
- Tkinter (included with Python on most systems)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `OPENAI_API_KEY` | OpenAI API key |
| `OPENROUTER_API_KEY` | OpenRouter API key |
| `API_BASE` | Default API base URL |

## License

MIT
