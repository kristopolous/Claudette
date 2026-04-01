# Claudette

> Build your own Claude-like coding assistant. Any language. Any platform.

## What Is This?

Claudette is an architectural blueprint for building a Claude-like AI coding assistant from first principles. It's Claude-adjacent - inspired by how modern AI assistants actually work, reimplemented from scratch as LLM-readable instructions. Think of it as reverse-engineering the architecture, not the code.

Think of it like a: architectural digest for AI assistant systems.

## The Concept

Modern AI coding assistants are complex systems. There's:

- **State management** - tracking sessions, tasks, and app state
- **Tool abstraction** - executing shell commands, reading/writing files, spawning agents
- **Command parsing** - slash commands, flags, interactive workflows
- **UI/TTY** - terminal rendering, REPL loops, rich output
- **Orchestration** - query parsing, context management, response streaming

Most of this isn't magic. It's **engineering**. And engineering can be described, explained, and reimplemented.

Claudette breaks the entire system down into ~1,800 modular instruction files. Each file tells an LLM:

- What a module **does**
- What it **depends on**
- How its **core logic works**
- What it **exports**
- Key **architectural insights**

## What's Included

### Core Systems

| Module | Description |
|--------|-------------|
| `Task` | Task lifecycle, IDs, state machines |
| `Tool` | Base tool class, tool registration |
| `tools` | Built-in tool registry (Bash, Read, Write, Edit, Glob, Grep, Agent, etc.) |
| `commands` | Slash command registry, plugin system |
| `context` | Context window management, token budgeting |
| `QueryEngine` | Query parsing, tool selection, execution pipeline |
| `REPL` | Interactive terminal loop, input handling |
| `history` | Conversation persistence, session restore |

### Utilities

- File operations (read, write, edit, glob, grep)
- Shell execution (spawn, stream output, process management)
- HTTP/network (fetch, web search, API calls)
- Agent spawning (sub-agents, worker pools)
- Configuration management
- Telemetry and logging
- Cryptography (IDs, hashing)

### Infrastructure

- Graceful shutdown handling
- Circular dependency management
- Lazy loading patterns
- Feature flags and dead code elimination
- Memory management and caching

## Why This Exists

We believe every team will want their own Claude-like assistant - customized, self-hosted, built their way. But there's a knowledge gap: most people have no idea how these systems actually work under the hood.

Claudette closes that gap. This is what a Claude-inspired architecture looks like when you break it down into its component parts and describe each one in a way an LLM can understand.

## Usage

Currently this is a **reference source** - each `.md` file is an LLM instruction set. You can:

1. **Pick a module** - Read the `.md` file for that component
2. **Feed it to an LLM** - "Here are instructions for building a tool registry in Go"
3. **Iterate** - Ask follow-up questions, request refinements
4. **Build** - Implement in your language of choice

The instructions are designed to be language-agnostic. They describe **intent**, **structure**, and **patterns** - not TypeScript syntax.

## Roadmap

- [ ] Add more modules (keep expanding coverage)
- [ ] Add language-specific variations (Python, Go, Rust implementations)
- [ ] Add integration tests for key flows
- [ ] Document the architecture decision records (ADRs)

## Contributing

Got a module to add? Found something unclear? PRs welcome. The goal is comprehensive coverage of every major system.

## Disclaimer

This is an **architectural study** - a demonstration of how to design and implement Claude-like AI assistant systems. The patterns and architectural choices are inspired by production systems, reimplemented from first principles. Use responsibly.

---

**The future is personalized AI assistants. Build yours.**

```
         ___
       /   \   CLAUDETTE
      |     |  Build it yourself.
       \___/
```
