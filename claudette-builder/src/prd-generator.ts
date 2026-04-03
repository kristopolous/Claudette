import { relative } from 'node:path';

export function generatePRD(selectedFiles: string[], claudetteDir: string): string {
  const now = new Date().toISOString().split('T')[0];
  const fileCount = selectedFiles.length;

  // Group files by top-level category
  const categories = new Map<string, string[]>();
  for (const file of selectedFiles) {
    const relPath = relative(claudetteDir, file);
    const parts = relPath.split('/');
    const category = parts.length > 1 ? parts[0] : 'root';
    const catFiles = categories.get(category) || [];
    catFiles.push(relPath);
    categories.set(category, catFiles);
  }

  const categoryList = Array.from(categories.entries())
    .map(([cat, files]) => `- **${cat}**: ${files.length} file${files.length > 1 ? 's' : ''}`)
    .join('\n');

  const fileList = selectedFiles
    .map((f) => `- \`docs/${relative(claudetteDir, f)}\``)
    .join('\n');

  return `# Product Requirements Document: Claudette Implementation

**Generated**: ${now}
**Documentation Files**: ${fileCount}
**Categories**: ${categories.size}

---

## 1. Project Overview

Build **Claudette** — an open-source, provider-agnostic CLI coding agent inspired by Claude Code. Claudette accepts natural language instructions, executes tools (shell commands, file operations, web search, etc.), and helps developers build software. It works with any OpenAI-compatible inference provider.

### 1.1 Scope

This implementation includes the following feature areas (selected from the full Claudette specification):

${categoryList}

### 1.2 Out of Scope

The following features are explicitly excluded from this build:
- Telemetry, analytics, or tracking of any kind
- Keystroke tracking
- Vendor-internal packages (\`@ant/*\`)
- GrowthBook feature flags
- Voice mode / STT
- Desktop deep links
- Stickers, passes, teleport
- Buddy / companion features
- Bridge/remote mode (unless selected above)
- Vim mode (unless selected above)

---

## 2. Architecture

### 2.1 System Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                         Entry Point                              │
│                    (CLI parsing, init)                           │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                       REPL Screen                               │
│              (Terminal UI - Ink/React or equivalent)             │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     QueryEngine                                 │
│         (Conversation lifecycle, tool orchestration)              │
└─────────────────────────────────────────────────────────────────┘
                               │
               ┌───────────────┼───────────────┐
               ▼               ▼               ▼
         ┌──────────┐    ┌──────────┐    ┌──────────┐
         │  Tools   │    │   API    │    │  State   │
         │ Registry │    │  Client  │    │  Store   │
         └──────────┘    └──────────┘    └──────────┘
\`\`\`

### 2.2 Core Loop

1. User types a message in the REPL
2. Message is sent to \`QueryEngine.submitMessage()\`
3. \`QueryEngine\` constructs an API request with:
   - System prompt (assembled from prompt sections)
   - Conversation history
   - Tool definitions (JSON Schema)
4. API streams response back
5. If response contains \`tool_use\` blocks:
   - Execute each tool
   - Feed results back into the loop
6. Stream text tokens to the UI as they arrive
7. Loop continues until the model produces a final response

---

## 3. Implementation Phases

Follow the phases in order. Do not skip phases. See \`IMPLEMENTATION_CHECKLIST.md\` for the detailed step-by-step guide.

### Phase 1: Foundation
- Set up project structure
- Install core dependencies
- Set up terminal UI framework
- Create CLI entry point
- Set up configuration file loading

### Phase 2: Core Conversation Loop
- Implement QueryEngine (per-conversation state manager)
- Implement query() async generator loop
- Implement query configuration and dependency injection
- Implement stop hooks and token budget tracking

### Phase 3: Tool System
- Implement Tool interface and registry
- Implement BashTool (shell command execution)
- Implement FileEditTool (read/write/edit files)
- Implement GlobTool, GrepTool, WebFetchTool, WebSearchTool
- Implement AgentTool (sub-agent spawning)
- Implement utility tools

### Phase 4: System Prompt Construction
- Build system prompt assembler from sections
- Implement section registration and caching
- Integrate all prompt templates

### Phase 5: REPL UI
- Set up terminal rendering pipeline
- Implement App, Screen, Messages, Message components
- Implement PromptInput with history
- Implement PermissionRequest dialogs
- Implement Spinner, CostThresholdDialog

### Phase 6: Permissions
- Implement permission system (always/ask/never)
- Implement path-based permission validation
- Implement risk assessment

### Phase 7+: Additional Features
- MCP integration
- Commands (slash commands)
- State management
- Memory system
- Context window management
- Skills
- Keybindings
- Plugins
- Cost tracking
- Tasks

---

## 4. Technical Requirements

### 4.1 Inference Provider

Must work with any OpenAI-compatible endpoint:
- OpenAI Chat Completions API format
- Streaming via SSE
- Tool use (\`tool_use\` / \`tool_result\` content blocks)
- Image input support
- Usage/token tracking

### 4.2 Terminal UI

- Flexbox layout for terminal (Yoga or equivalent)
- ANSI color support
- Keyboard input handling
- Virtual scrolling for long message lists
- Dialog/modal support

### 4.3 Tool Execution

- Subprocess execution for shell commands
- File system operations (read, write, edit, glob, grep)
- HTTP requests for web fetch
- Permission checking before dangerous operations
- Output truncation for large results

### 4.4 State Management

- Per-conversation message history
- Token usage tracking
- Permission state persistence
- Configuration hot-reload

---

## 5. Documentation Reference

All implementation documentation is in the \`docs/\` directory. Key files:

### Core Architecture
${fileList}

### Implementation Guide
- \`IMPLEMENTATION_CHECKLIST.md\` — Step-by-step build guide (19 phases)
- \`START-HERE.md\` — Dependency lookup table for porting

---

## 6. Success Criteria

- [ ] Can start Claudette with a command
- [ ] Can send a message and get a response from the LLM
- [ ] Can execute shell commands via BashTool
- [ ] Can read/write files via FileEditTool
- [ ] Can search files via GlobTool and GrepTool
- [ ] Permissions work (always/ask/never)
- [ ] Cost tracking displays in the UI
- [ ] Context compaction triggers when context is full
- [ ] Slash commands work
- [ ] Works with at least 2 different inference providers

---

## 7. Notes

- This PRD was auto-generated from the Claudette documentation picker
- The documentation files in \`docs/\` contain detailed specifications for each component
- Prompt templates are embedded in the relevant documentation files
- The \`IMPLEMENTATION_CHECKLIST.md\` file contains the authoritative build order
- All documentation is provider-agnostic — replace "Claude" with "Claudette" and "Anthropic" with "inference provider"
`;
}
