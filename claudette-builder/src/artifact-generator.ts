import { relative } from 'node:path';
import { FeatureNode } from './feature-tree.js';

export interface ArtifactSet {
  prd: string;
  constitution: string;
  spec: string;
  plan: string;
  tasks: string;
  checklist: string;
  instructions: string;
}

export function generateArtifacts(
  selectedFiles: string[],
  rootNodes: FeatureNode[],
  selectedIds: Set<string>,
  claudetteDir: string,
): ArtifactSet {
  const now = new Date().toISOString().split('T')[0];
  const fileCount = selectedFiles.length;

  // Extract feature descriptions
  const featureDescriptions = extractFeatureDescriptions(rootNodes, selectedIds);

  return {
    prd: generatePRD(selectedFiles, claudetteDir, now, fileCount),
    constitution: generateConstitution(now, featureDescriptions),
    spec: generateSpec(now, featureDescriptions),
    plan: generatePlan(selectedFiles, rootNodes, selectedIds, claudetteDir, now, featureDescriptions),
    tasks: generateTasks(now, featureDescriptions),
    checklist: generateChecklist(now),
    instructions: generateInstructions(now, featureDescriptions),
  };
}

function extractFeatureDescriptions(
  rootNodes: FeatureNode[],
  selectedIds: Set<string>,
): { id: string; label: string; description: string; fileCount: number }[] {
  const features: { id: string; label: string; description: string; fileCount: number }[] = [];

  function walk(nodes: FeatureNode[]) {
    for (const node of nodes) {
      if (selectedIds.has(node.id)) {
        features.push({
          id: node.id,
          label: node.label,
          description: node.description,
          fileCount: node.files.length,
        });
      }
      if (node.children && node.children.length > 0) {
        walk(node.children);
      }
    }
  }

  walk(rootNodes);
  return features;
}

function generatePRD(
  selectedFiles: string[],
  claudetteDir: string,
  now: string,
  fileCount: number,
): string {
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

- This PRD was auto-generated from the Claudette documentation
- The documentation files in \`docs/\` contain detailed specifications for each component
- Prompt templates are embedded in the relevant documentation files
- The \`IMPLEMENTATION_CHECKLIST.md\` file contains the authoritative build order
- All documentation is provider-agnostic — replace "Claude" with "Claudette" and "Anthropic" with "inference provider"
`;
}

function generateConstitution(now: string, features: { id: string; label: string; description: string; fileCount: number }[]): string {
  const featureList = features.map(f => `- ${f.label}: ${f.description}`).join('\n');

  return `# Claudette Constitution

**Version**: 1.0.0 | **Ratified**: ${now} | **Last Amended**: ${now}

## Core Principles

### I. Provider-Agnostic Architecture

Claudette MUST work with any OpenAI-compatible inference provider. No code should be tightly coupled to a specific API. All provider-specific logic MUST be abstracted behind a common interface.

### II. No Telemetry or Tracking

Claudette MUST NOT collect, transmit, or store any telemetry, analytics, or usage data. No keystroke tracking, no event logging, no growth metrics. This is NON-NEGOTIABLE.

### III. Test-First Development

All code changes MUST include tests. Write tests before implementation. Ensure tests pass before considering a task complete. Run the full test suite after each significant change.

### IV. Faithful Implementation

When implementing from documentation, faithfully reproduce the described behavior. Do not skip features because they seem complex. If documentation describes a feature, implement it.

### V. Incremental Verification

After each phase or significant component, verify the implementation works before proceeding. Run imports, run tests, try basic functionality. Do not accumulate broken code.

## Development Standards

### Code Quality
- Use type hints throughout
- Follow language idioms and conventions
- No dead code or unused imports
- Handle errors explicitly, don't swallow exceptions

### Testing Standards
- Unit tests for all utility functions
- Integration tests for core loops
- End-to-end tests for the full pipeline
- Tests MUST pass before marking tasks complete

### Documentation Standards
- Keep documentation in sync with implementation
- Update docs when behavior changes
- Document all public APIs
- Include usage examples

## Implementation Workflow

1. Read the spec and plan before writing code
2. Implement one task at a time
3. Write tests for the task
4. Run tests — they MUST fail before implementation
5. Implement the task
6. Run tests — they MUST pass
7. Run linting and type checking
8. Commit with a descriptive message
9. Move to the next task

## Governance

This constitution supersedes all other development practices. Any deviation requires explicit user approval. All PRs and reviews must verify compliance with these principles.

**Selected Features for this build:**
${featureList}
`;
}

function generateSpec(now: string, features: { id: string; label: string; description: string; fileCount: number }[]): string {
  const featureList = features.map((f, i) => {
    const priority = i < 3 ? 'P1' : i < 6 ? 'P2' : 'P3';
    return `### User Story ${i + 1} - ${f.label} (Priority: ${priority})

${f.description}

**Why this priority**: Core functionality needed for a working Claudette implementation.

**Independent Test**: Can verify this feature works independently by testing its public API.

**Acceptance Scenarios**:

1. **Given** the feature is implemented, **When** the relevant API is called, **Then** it behaves as described in the documentation
2. **Given** error conditions, **When** the feature encounters them, **Then** it handles them gracefully
`;
  }).join('\n---\n\n');

  return `# Feature Specification: Claudette CLI Coding Agent

**Feature Branch**: \`claudette-implementation\`
**Created**: ${now}
**Status**: Draft
**Input**: Build a provider-agnostic CLI coding agent inspired by Claude Code

## User Scenarios & Testing

${featureList}

### Edge Cases

- What happens when the API rate limit is hit?
- How does the system handle network interruptions during streaming?
- What happens when a tool execution times out?
- How does the system handle malformed tool output?
- What happens when the context window is exceeded?
- How does the system handle permission denials gracefully?

## Requirements

### Functional Requirements

- **FR-001**: System MUST accept natural language input from the user via CLI or REPL
- **FR-002**: System MUST connect to any OpenAI-compatible inference provider
- **FR-003**: System MUST stream response tokens to the terminal in real-time
- **FR-004**: System MUST execute tool calls returned by the model
- **FR-005**: System MUST support Bash tool for shell command execution
- **FR-006**: System MUST support file read, write, and edit operations
- **FR-007**: System MUST support file search via glob patterns and regex
- **FR-008**: System MUST support web fetch for retrieving URL content
- **FR-009**: System MUST implement permission checking before tool execution
- **FR-010**: System MUST track token usage and estimate costs
- **FR-011**: System MUST handle context window overflow via compaction
- **FR-012**: System MUST support slash commands for common operations
- **FR-013**: System MUST persist memory across sessions via .claude/ directory
- **FR-014**: System MUST support sub-agent spawning for complex tasks
- **FR-015**: System MUST handle graceful shutdown on SIGINT/SIGTERM

### Key Entities

- **QueryEngine**: Manages per-conversation state, message history, and tool orchestration
- **ToolRegistry**: Registry of available tools with JSON Schema definitions
- **APIClient**: OpenAI-compatible API client with streaming support
- **PermissionManager**: Handles tool permission evaluation and user prompts
- **CostTracker**: Tracks token usage and estimates costs per model
- **SessionState**: Session-level configuration (model, API key, permissions, etc.)

## Success Criteria

- **SC-001**: User can start Claudette and interact with it via REPL
- **SC-002**: User can send a message and receive a streamed response
- **SC-003**: User can execute shell commands through the agent
- **SC-004**: User can read, write, and edit files through the agent
- **SC-005**: User can search the codebase through the agent
- **SC-006**: Permissions work correctly (always/ask/never modes)
- **SC-007**: Cost tracking displays accurate token usage
- **SC-008**: Context compaction triggers automatically when needed
- **SC-009**: Works with at least 2 different inference providers
- **SC-010**: All tests pass, linting is clean, types are correct

## Assumptions

- User has access to at least one OpenAI-compatible API endpoint
- User is running on a Unix-like system (Linux/macOS)
- User has Python 3.11+ installed
- The claudette/ documentation files are the source of truth for behavior
- No telemetry or analytics infrastructure is needed
`;
}

function generatePlan(
  selectedFiles: string[],
  rootNodes: FeatureNode[],
  selectedIds: Set<string>,
  claudetteDir: string,
  now: string,
  features: { id: string; label: string; description: string; fileCount: number }[],
): string {
  const featureNames = features.map(f => f.label).join(', ');

  return `# Implementation Plan: Claudette CLI Coding Agent

**Branch**: \`claudette-implementation\` | **Date**: ${now} | **Spec**: See spec.md
**Input**: Feature specification and ${selectedFiles.length} documentation files

## Summary

Build Claudette — a provider-agnostic CLI coding agent in Python. The implementation covers ${features.length} feature areas: ${featureNames}. Each feature is backed by documentation files in the docs/ directory.

## Technical Context

**Language/Version**: Python 3.11+
**Primary Dependencies**: openai (Python SDK), httpx, rich, prompt_toolkit, pydantic
**Storage**: File-based (.claude/ directory for memory and config)
**Testing**: pytest with pytest-asyncio
**Target Platform**: Linux, macOS
**Project Type**: CLI application
**Performance Goals**: Responsive REPL, streaming tokens with <100ms latency
**Constraints**: No telemetry, provider-agnostic, type-safe
**Scale/Scope**: Single-user CLI tool

## Constitution Check

- [x] Provider-agnostic architecture — all provider logic abstracted
- [x] No telemetry — explicitly excluded from scope
- [x] Test-first — pytest suite for all components
- [x] Faithful implementation — following claudette/ docs as source of truth
- [x] Incremental verification — test after each phase

## Project Structure

### Documentation (this feature)

\`\`\`text
claudette-output/
├── PRD.md                 # Product requirements
├── SPEC.md                # Feature specification
├── PLAN.md                # This file
├── TASKS.md               # Task breakdown
├── CHECKLIST.md           # Quality checklist
├── CONSTITUTION.md        # Project principles
├── INSTRUCTIONS.md        # Implementation instructions
├── IMPLEMENTATION_CHECKLIST.md  # Step-by-step build guide
├── START-HERE.md          # Dependency lookup table
└── docs/                  # Component documentation
    ├── bootstrap/
    ├── commands/
    ├── components/
    ├── constants/
    ├── entrypoints/
    ├── hooks/
    ├── ink/
    ├── memdir/
    ├── query/
    ├── screens/
    ├── services/
    ├── state/
    ├── tools/
    ├── types/
    ├── utils/
    └── vim/
\`\`\`

### Source Code (claudette-python/)

\`\`\`text
claudette-python/
├── pyproject.toml
├── src/
│   └── claudette/
│       ├── __init__.py
│       ├── __main__.py              # Entry point
│       ├── cli.py                   # CLI argument parsing
│       ├── main.py                  # Bootstrap and run
│       ├── bootstrap/
│       │   └── state.py             # Session state
│       ├── query/
│       │   ├── engine.py            # QueryEngine
│       │   ├── loop.py              # Core query loop
│       │   ├── config.py            # Query configuration
│       │   ├── deps.py              # Dependency injection
│       │   ├── stop_hooks.py        # Stop hook handling
│       │   └── token_budget.py      # Token budget tracking
│       ├── tools/
│       │   ├── base.py              # Tool interface & registry
│       │   ├── bash.py              # BashTool
│       │   ├── file_read.py         # Read tool
│       │   ├── file_write.py        # Write tool
│       │   ├── file_edit.py         # Edit tool
│       │   ├── glob.py              # GlobTool
│       │   ├── grep.py              # GrepTool
│       │   ├── web_fetch.py         # WebFetchTool
│       │   ├── web_search.py        # WebSearchTool
│       │   └── agent.py             # AgentTool
│       ├── services/
│       │   ├── api/
│       │   │   ├── client.py        # API client
│       │   │   ├── claude.py        # Query function
│       │   │   ├── errors.py        # Error handling
│       │   │   └── retry.py         # Retry logic
│       │   ├── mcp/
│       │   │   └── client.py        # MCP client
│       │   └── compact/
│       │       └── auto_compact.py  # Context compaction
│       ├── state/
│       │   ├── store.py             # Generic store
│       │   ├── app_state.py         # Application state
│       │   └── selectors.py         # Derived state
│       ├── constants/               # System constants
│       ├── utils/                   # Shared utilities
│       ├── commands/                # Slash commands
│       ├── repl/                    # Terminal UI
│       ├── memory/                  # Memory system
│       ├── skills/                  # Skill loading
│       └── keybindings/             # Keybinding schema
└── tests/
\`\`\`

**Structure Decision**: Single Python project with src/ layout. Standard package structure matching the claudette/ documentation organization.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multiple utility modules | Each module has distinct responsibility | Single utils.py would be unmaintainable |
| Separate tool files | Each tool has unique logic and security considerations | Single tools.py would be too large |
| Query loop separate from engine | Separation of concerns: loop = control flow, engine = state management | Combined would be harder to test |
`;
}

function generateTasks(now: string, features: { id: string; label: string; description: string; fileCount: number }[]): string {
  return `# Tasks: Claudette CLI Coding Agent

**Input**: Design documents (spec.md, plan.md, PRD.md)
**Prerequisites**: plan.md (required), spec.md (required)

**Tests**: All tasks include test requirements. Write tests FIRST, ensure they fail, then implement.

**Organization**: Tasks are grouped by feature area and implementation phase.

## Format: \`[ID] [P?] Description\`

- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 1: Foundation

**Purpose**: Project structure, dependencies, CLI entry point

- [ ] T001 Create pyproject.toml with all dependencies
- [ ] T002 [P] Create src/claudette/__init__.py with version
- [ ] T003 [P] Create src/claudette/__main__.py for module entry
- [ ] T004 [P] Create all package directories and __init__.py files
- [ ] T005 Implement CLI argument parsing (src/claudette/cli.py)
- [ ] T006 [P] Implement session state (src/claudette/bootstrap/state.py)
- [ ] T007 [P] Implement generic store (src/claudette/state/store.py)
- [ ] T008 [P] Implement application state (src/claudette/state/app_state.py)
- [ ] T009 [P] Implement state selectors (src/claudette/state/selectors.py)
- [ ] T010 [P] Implement all constants modules
- [ ] T011 Implement config file loading (src/claudette/utils/config.py)
- [ ] T012 [P] Implement platform paths (src/claudette/utils/cache_paths.py)
- [ ] T013 [P] Implement graceful shutdown (src/claudette/utils/graceful_shutdown.py)
- [ ] T014 **TEST**: Verify all imports work, CLI starts with --help

---

## Phase 2: Core Conversation Loop

**Purpose**: QueryEngine, query loop, API client

- [ ] T015 [P] Implement API error types (src/claudette/services/api/errors.py)
- [ ] T016 [P] Implement retry logic (src/claudette/services/api/retry.py)
- [ ] T017 Implement OpenAI-compatible API client (src/claudette/services/api/client.py)
- [ ] T018 Implement streaming query function (src/claudette/services/api/claude.py)
- [ ] T019 [P] Implement message utilities (src/claudette/utils/messages.py)
- [ ] T020 [P] Implement query configuration (src/claudette/query/config.py)
- [ ] T021 [P] Implement dependency injection (src/claudette/query/deps.py)
- [ ] T022 [P] Implement token budget tracking (src/claudette/query/token_budget.py)
- [ ] T023 [P] Implement stop hooks (src/claudette/query/stop_hooks.py)
- [ ] T024 Implement query loop with tool execution (src/claudette/query/loop.py)
- [ ] T025 Implement QueryEngine (src/claudette/query/engine.py)
- [ ] T026 **TEST**: Test query loop with mocked API responses
- [ ] T027 **TEST**: Test tool execution chain end-to-end

---

## Phase 3: Tool System

**Purpose**: All built-in tools

- [ ] T028 [P] Implement Tool interface and registry (src/claudette/tools/base.py)
- [ ] T029 Implement BashTool with permission checking (src/claudette/tools/bash.py)
- [ ] T030 Implement FileReadTool (src/claudette/tools/file_read.py)
- [ ] T031 Implement FileWriteTool (src/claudette/tools/file_write.py)
- [ ] T032 Implement FileEditTool with SEARCH/REPLACE (src/claudette/tools/file_edit.py)
- [ ] T033 [P] Implement GlobTool (src/claudette/tools/glob.py)
- [ ] T034 [P] Implement GrepTool (src/claudette/tools/grep.py)
- [ ] T035 [P] Implement WebFetchTool (src/claudette/tools/web_fetch.py)
- [ ] T036 [P] Implement WebSearchTool (src/claudette/tools/web_search.py)
- [ ] T037 Implement AgentTool for sub-agents (src/claudette/tools/agent.py)
- [ ] T038 **TEST**: Test each tool independently
- [ ] T039 **TEST**: Test tool permission enforcement

---

## Phase 4: System Prompt Construction

**Purpose**: System prompt assembly from sections

- [ ] T040 [P] Implement all prompt templates (src/claudette/constants/prompts.py)
- [ ] T041 Implement system prompt builder (src/claudette/utils/system_prompt.py)
- [ ] T042 [P] Implement environment info computation (src/claudette/utils/env_info.py)
- [ ] T043 [P] Implement CLAUDE.md loading (src/claudette/utils/claudemd.py)
- [ ] T044 [P] Implement git utilities (src/claudette/utils/git.py)
- [ ] T045 [P] Implement file utilities (src/claudette/utils/file.py)
- [ ] T046 **TEST**: Verify system prompt assembles correctly

---

## Phase 5: REPL UI

**Purpose**: Interactive terminal interface

- [ ] T047 Implement message renderer (src/claudette/repl/renderer.py)
- [ ] T048 Implement prompt input (src/claudette/repl/prompt.py)
- [ ] T049 Implement REPL screen/main loop (src/claudette/repl/screen.py)
- [ ] T050 Implement REPL launcher (src/claudette/repl/launcher.py)
- [ ] T051 Implement main bootstrap (src/claudette/main.py)
- [ ] T052 **TEST**: Test REPL input/output cycle
- [ ] T053 **TEST**: Test streaming display

---

## Phase 6: Permissions

**Purpose**: Permission system for tool execution

- [ ] T054 Implement permission manager (src/claudette/utils/permissions.py)
- [ ] T055 [P] Implement command risk classification
- [ ] T056 [P] Implement path-based permissions
- [ ] T057 **TEST**: Test permission modes (always/ask/never)

---

## Phase 7: Additional Features

**Purpose**: Commands, memory, compaction, cost tracking, MCP, skills

- [ ] T058 [P] Implement command registry (src/claudette/commands/registry.py)
- [ ] T059 [P] Implement built-in slash commands
- [ ] T060 Implement memory system (src/claudette/memory/)
- [ ] T061 Implement context compaction (src/claudette/services/compact/)
- [ ] T062 [P] Implement cost tracking (src/claudette/utils/cost_tracker.py)
- [ ] T063 [P] Implement MCP client (src/claudette/services/mcp/client.py)
- [ ] T064 [P] Implement skill loading (src/claudette/skills/loader.py)
- [ ] T065 [P] Implement keybinding schema (src/claudette/keybindings/schema.py)
- [ ] T066 **TEST**: Test each feature independently

---

## Phase N: Integration & Verification

**Purpose**: End-to-end testing and quality gates

- [ ] T067 Run full test suite — all tests MUST pass
- [ ] T068 Run linting (ruff) — no errors or warnings
- [ ] T069 Run type checking (mypy) — no type errors
- [ ] T070 Test with real inference provider (OpenAI, OpenRouter, or Ollama)
- [ ] T071 Test all tools work end-to-end
- [ ] T072 Test permissions work correctly
- [ ] T073 Test cost tracking accuracy
- [ ] T074 Test context compaction triggers
- [ ] T075 Test slash commands
- [ ] T076 Test graceful shutdown
- [ ] T077 **FINAL**: Verify all success criteria from spec.md are met

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Foundation)**: No dependencies — start here
- **Phase 2 (Core Loop)**: Depends on Phase 1 — needs API client, config, state
- **Phase 3 (Tools)**: Depends on Phase 2 — needs query loop for tool execution
- **Phase 4 (Prompts)**: Depends on Phase 3 — needs tools for prompt generation
- **Phase 5 (REPL)**: Depends on Phase 2 — needs query engine
- **Phase 6 (Permissions)**: Depends on Phase 3 — needs tools
- **Phase 7 (Additional)**: Depends on all above
- **Phase N (Verification)**: Depends on all above

### Within Each Phase

- Tasks marked [P] can run in parallel
- Non-parallel tasks must run sequentially
- Test tasks MUST run after their corresponding implementation tasks
- Tests MUST fail before implementation, pass after

---

## Notes

- [P] tasks = different files, no dependencies
- Write tests FIRST for each task
- Run linting and type checking after each phase
- Commit after each task or logical group
- Verify imports work before moving to next phase
`;
}

function generateChecklist(now: string): string {
  return `# Quality Checklist: Claudette Implementation

**Purpose**: Ensure Claudette meets quality standards before considering it complete
**Created**: ${now}
**Feature**: See spec.md and plan.md

## Imports & Structure

- [ ] CHK001 All Python files import cleanly without errors
- [ ] CHK002 No circular import dependencies
- [ ] CHK003 All modules have type hints
- [ ] CHK004 No unused imports in any file
- [ ] CHK005 Package structure matches plan.md

## Testing

- [ ] CHK006 All unit tests pass (pytest)
- [ ] CHK007 All integration tests pass
- [ ] CHK008 End-to-end test with real API works
- [ ] CHK009 Test coverage is adequate for critical paths
- [ ] CHK010 No tests are skipped or marked xfail without reason

## Linting & Types

- [ ] CHK011 ruff passes with no errors
- [ ] CHK012 ruff passes with no warnings
- [ ] CHK013 mypy passes with no type errors
- [ ] CHK014 No type: ignore comments without explanation

## Core Functionality

- [ ] CHK015 CLI starts and shows help
- [ ] CHK016 REPL launches and accepts input
- [ ] CHK017 API client connects and streams tokens
- [ ] CHK018 Query loop handles tool calls correctly
- [ ] CHK019 All tools execute and return results
- [ ] CHK020 Permission system works (always/ask/never)
- [ ] CHK021 System prompt assembles correctly
- [ ] CHK022 Cost tracking reports accurate numbers
- [ ] CHK023 Context compaction triggers at threshold
- [ ] CHK024 Slash commands work
- [ ] CHK025 Graceful shutdown cleans up properly

## Security

- [ ] CHK026 No hardcoded API keys or secrets
- [ ] CHK027 No telemetry or analytics code
- [ ] CHK028 Bash tool validates read-only commands
- [ ] CHK029 File tools validate paths (no traversal)
- [ ] CHK030 Permission checks cannot be bypassed

## Documentation

- [ ] CHK031 README.md exists with setup instructions
- [ ] CHK032 All public APIs have docstrings
- [ ] CHK033 Implementation matches claudette/ documentation
- [ ] CHK034 No features from selected docs are skipped

## Performance

- [ ] CHK035 REPL is responsive (no UI freezes)
- [ ] CHK036 Streaming tokens appear with low latency
- [ ] CHK037 Large file reads don't block the event loop
- [ ] CHK038 Memory usage is reasonable (no leaks)

## Cross-Provider

- [ ] CHK039 Works with at least 2 different providers
- [ ] CHK040 API client handles provider-specific quirks
- [ ] CHK041 Error messages are provider-agnostic

## Notes

- Check items off as completed: \`[x]\`
- Add comments or findings inline
- Items are numbered sequentially for easy reference
- All items MUST pass before implementation is considered complete
`;
}

function generateInstructions(now: string, features: { id: string; label: string; description: string; fileCount: number }[]): string {
  const featureList = features.map(f => `- [ ] ${f.label}: ${f.description}`).join('\n');

  return `# Implementation Instructions: Claudette

**Generated**: ${now}
**Documentation**: ${features.length} features selected, see docs/ directory

## How to Use This Build Kit

This build kit contains everything needed to implement Claudette from scratch:

1. **CONSTITUTION.md** — Project principles and standards (read first)
2. **SPEC.md** — What to build (requirements, user stories, acceptance criteria)
3. **PLAN.md** — How to build it (architecture, file structure, tech stack)
4. **TASKS.md** — What to do next (actionable tasks with checkboxes)
5. **CHECKLIST.md** — Quality gates (verify everything works)
6. **PRD.md** — Full product requirements document
7. **docs/** — Detailed implementation documentation
8. **IMPLEMENTATION_CHECKLIST.md** — Step-by-step build guide
9. **START-HERE.md** — Dependency lookup table

## Workflow

Follow this workflow strictly. Do not skip steps.

### Step 1: Read the Constitution

Read \`CONSTITUTION.md\` first. These are the non-negotiable principles for this build.

### Step 2: Read the Spec

Read \`SPEC.md\` to understand what you're building. Focus on:
- User stories and their priorities
- Functional requirements
- Success criteria

### Step 3: Read the Plan

Read \`PLAN.md\` to understand the architecture. Focus on:
- Project structure
- Core loop design
- Tool system

### Step 4: Execute Tasks

Open \`TASKS.md\` and execute tasks in order:

1. **Start with Phase 1** (Foundation)
2. **For each task**:
   a. Read the task description
   b. **Write tests FIRST** — tests should fail because the feature doesn't exist yet
   c. Implement the feature
   d. Run tests — they should now pass
   e. Run linting: \`ruff check src/\`
   f. Run type checking: \`mypy src/\`
   g. Mark the task as complete: \`[x]\`
   h. Commit your changes
3. **Move to the next phase** only when all tasks in the current phase are complete

### Step 5: Verify

After all tasks are complete, run through \`CHECKLIST.md\`:
- Every item must pass
- Document any failures
- Fix failures and re-verify

### Step 6: Test with Real API

Test Claudette with a real inference provider:
1. Set your API key: \`export ANTHROPIC_API_KEY=...\`
2. Start Claudette: \`python -m claudette\`
3. Send a test message
4. Verify streaming works
5. Test tool execution (Bash, Read, Write, Edit, Glob, Grep)
6. Test permissions
7. Test slash commands

## Critical Rules

1. **Write tests before implementation** — this is not optional
2. **Run tests after each task** — don't accumulate broken code
3. **Run linting and type checking** — keep code clean throughout
4. **Follow the task order** — dependencies are intentional
5. **Don't skip features** — if docs describe it, implement it
6. **Verify imports work** — after each phase, test that everything imports
7. **Commit frequently** — one commit per task minimum
8. **Read the docs** — the docs/ directory has detailed specifications

## Features Selected for This Build

${featureList}

## What NOT to Build

Do NOT implement any of these:
- Telemetry, analytics, or tracking
- Keystroke tracking
- Vendor-internal packages
- GrowthBook feature flags
- Voice mode / STT
- Desktop deep links
- Stickers, passes, teleport
- Buddy / companion features

## Troubleshooting

### Import errors
- Check that all __init__.py files exist
- Verify pyproject.toml has correct package configuration
- Run \`pip install -e .\` to install in development mode

### API connection errors
- Verify API key is set: \`echo $ANTHROPIC_API_KEY\`
- Check API base URL is correct for your provider
- Test with a simple curl request first

### Tool execution failures
- Check file permissions
- Verify the tool's execute method handles errors
- Check that ToolRegistry has the tool registered

### Test failures
- Run individual tests: \`pytest tests/test_specific.py -v\`
- Check test fixtures are set up correctly
- Verify async tests use pytest-asyncio
`;
}
