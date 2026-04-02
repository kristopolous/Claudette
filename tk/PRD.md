==============================================================================
                    T K - C L A U D E T T E
              P R O D U C T   R E Q U I R E M E N T S
==============================================================================

  Document:   PRD-001
  Version:    1.0
  Date:       2026-04-01
  Status:     DRAFT
  Author:     Claude Engineering

==============================================================================
  1. PRODUCT OVERVIEW
==============================================================================

  tk-claudette is a desktop GUI implementation of the Claudette AI coding
  agent, built with Python and Tkinter. It provides a visual interface for
  an AI assistant that can:

    - Accept natural language instructions
    - Execute shell commands
    - Read and edit files
    - Search codebases
    - Fetch web content
    - Maintain conversation context
    - Track API costs

  The Tkinter toolkit provides a native, cross-platform desktop application
  with the classic Motif/CDE aesthetic that evokes the golden age of UNIX
  workstations.

==============================================================================
  2. SYSTEM ARCHITECTURE
==============================================================================

  +--------------------------------------------------------------------------+
  |                         tk-claudette (main.py)                           |
  |                    (CLI args, config, app bootstrap)                      |
  +----------------------------------+---------------------------------------+
                                     |
                                     v
  +--------------------------------------------------------------------------+
  |                        MainWindow (Tkinter)                              |
  |  +-------------------+  +-------------------+  +------------------------+ |
  |  |   Message Panel   |  |   Input Panel     |  |   Status Bar           | |
  |  |   (ScrolledText)  |  |   (Text + Button) |  |   (model, cost, mode)  | |
  |  +-------------------+  +-------------------+  +------------------------+ |
  +----------------------------------+---------------------------------------+
                                     |
                                     v
  +--------------------------------------------------------------------------+
  |                         QueryEngine                                      |
  |         (conversation loop, tool orchestration, state)                    |
  +----------------------------------+---------------------------------------+
               |                    |                    |
               v                    v                    v
  +---------------------+  +----------------+  +----------------------+
  |   Tool Registry     |  |   API Client   |  |   Permission Mgr     |
  +---------------------+  +----------------+  +----------------------+

==============================================================================
  3. FUNCTIONAL REQUIREMENTS
==============================================================================

  FR-001  API Integration
    - Support any OpenAI-compatible endpoint (Anthropic, OpenAI, OpenRouter,
      Ollama, LiteLLM, vLLM)
    - Streaming responses
    - Tool use / tool result content blocks
    - Usage tracking (input/output tokens)

  FR-002  Tool System
    - Bash: Execute shell commands with timeout and output capture
    - Read: Read file contents with optional line range
    - Write: Create or overwrite files
    - Edit: Search/replace file editing
    - Grep: Content search with regex
    - Glob: File pattern matching
    - WebFetch: HTTP GET with HTML-to-text conversion

  FR-003  Conversation Management
    - Maintain message history across turns
    - System prompt construction with context
    - Context window management (basic truncation)

  FR-004  User Interface
    - Message display with user/assistant/tool result differentiation
    - Multi-line text input
    - Command history (up/down arrows)
    - Status bar showing model, cost, mode
    - Permission dialogs for dangerous operations
    - Slash command support

  FR-005  Slash Commands
    - /help     - Show available commands
    - /clear    - Clear conversation
    - /model    - Switch model
    - /cost     - Show cost breakdown
    - /config   - Show configuration
    - /version  - Show version info

  FR-006  Permissions
    - Per-tool permission levels: always, ask, never
    - Permission persistence in settings
    - Interactive permission prompts

  FR-007  Configuration
    - API key from environment or config file
    - Model selection
    - Default permissions
    - Settings file: ~/.claude/settings.json

  FR-008  Cost Tracking
    - Token usage per turn
    - Cumulative session cost
    - Cost display in status bar and /cost command

==============================================================================
  4. NON-FUNCTIONAL REQUIREMENTS
==============================================================================

  NF-001  Cross-platform: macOS, Linux, Windows
  NF-002  Python 3.10+
  NF-003  Standard library only (tkinter, json, os, subprocess, etc.)
  NF-004  No external dependencies beyond stdlib + httpx/requests
  NF-005  Responsive UI during API calls (threaded)
  NF-006  Graceful error handling and display

==============================================================================
  5. DATA MODELS
==============================================================================

  Message:
    - role: "user" | "assistant" | "tool"
    - content: str
    - tool_calls: list[ToolCall] (optional)
    - tool_call_id: str (optional, for tool results)

  ToolCall:
    - id: str
    - name: str
    - arguments: dict

  ToolResult:
    - tool_call_id: str
    - content: str
    - is_error: bool

  CostTracker:
    - input_tokens: int
    - output_tokens: int
    - total_cost: float

==============================================================================
  6. IMPLEMENTATION PLAN
==============================================================================

  Phase 1: Foundation
    - Project structure
    - Core types
    - Configuration loading
    - CLI argument parsing

  Phase 2: API Client
    - OpenAI-compatible client
    - Streaming support
    - Tool use parsing

  Phase 3: Tool System
    - Tool interface and registry
    - Bash, Read, Write, Edit, Grep, Glob, WebFetch

  Phase 4: Query Engine
    - Conversation loop
    - System prompt construction
    - Message history management

  Phase 5: Tkinter UI
    - Main window layout
    - Message display
    - Input handling
    - Status bar
    - Permission dialogs

  Phase 6: Polish
    - Slash commands
    - Cost tracking
    - Settings persistence
    - Error handling

==============================================================================
  END OF DOCUMENT
==============================================================================
