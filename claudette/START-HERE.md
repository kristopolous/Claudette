# Claudette Technology Map

This document maps every external dependency used in the Claudette codebase to its specific purpose and assigns it a **JARGON TOKEN** — a unique ALL-CAPS identifier used throughout the claudette/ documentation. When a doc says "requires SCHEMA" or "uses SUBPROCESS", it means this table.

When porting to another language, focus on the **capability** (what the jargon token represents), not the exact library. Your language may have built-in equivalents.

---

## UI/Rendering

| Jargon | Library | Capability | Porting Guidance |
|--------|---------|------------|-----------------|
| **REACT** | react | Component-based UI framework with hooks and context | Need a component tree model. For terminal ports, consider immediate-mode rendering instead. |
| **RECONCILER** | react-reconciler | Diff-and-patch rendering: maps a component tree to a display buffer | The hardest piece to port. Need a way to map a component tree to screen output with dirty diffing. |
| **INK** | ink (forked) | Terminal UI engine: renders components to ANSI with Yoga layout, keyboard/mouse input, screen buffer diffing, frame rendering | Look for a terminal UI framework with flexbox layout, or build simpler immediate-mode rendering. |
| **YOGA** | yoga-layout | Flexbox layout engine for terminal UI | Any flexbox layout implementation. Yoga is cross-platform C++. |
| **ANSI** | chalk | Terminal text coloring (foreground, background, bold, dim, chained styling) | Any ANSI color library. Most languages have one. |
| **FIGURES** | figures | Cross-platform Unicode symbols with ASCII fallbacks | Small module of Unicode symbols (checkmarks, arrows, bullets, etc.). |
| **ANSI_TOKENS** | @alcalzone/ansi-tokenize | Parse ANSI escape sequences into tokens for screen buffer management and string slicing | ANSI escape sequence parser. Needed for accurate cell-width calculation. |
| **ANSI_STRIP** | strip-ansi | Remove ANSI escape codes from strings | Regex-based ANSI removal. Essential for any terminal app. |
| **ANSI_WRAP** | wrap-ansi | Wrap text to terminal width while preserving ANSI codes | Text wrapping that treats escape sequences as atomic units. |
| **CELL_WIDTH** | emoji-regex + get-east-asian-width | Calculate display width of characters (emoji=double, CJK=double, ASCII=single) | Unicode property lookups for accurate terminal cell width. |
| **HYPERLINKS** | supports-hyperlinks | Detect OSC 8 hyperlink support in terminal | Check TERM_PROGRAM, VTE_VERSION env vars. |
| **BOX_CHARS** | cli-boxes | Unicode box-drawing character sets for bordered UI elements | Unicode box characters: ─ │ ┌ ┐ └ ┘ etc. |
| **BIDI** | bidi-js | Unicode Bidirectional Algorithm for RTL text rendering | Only needed for Windows terminal support. Skip for macOS/Linux-only. |
| **QR_CODE** | qrcode | Generate QR codes as ASCII/Unicode terminal strings | QR code library with text/ASCII output. |

## Data/Validation

| Jargon | Library | Capability | Porting Guidance |
|--------|---------|------------|-----------------|
| **SCHEMA** | zod/v4 | Runtime schema validation with JSON Schema export | Essential. Validates tool inputs, settings, permissions, plugin manifests. Must support nested schemas and detailed errors. |
| **JSON_SCHEMA** | ajv | Validate AI-generated structured output against JSON Schema | JSON Schema validator for model output validation. |
| **JSONC** | jsonc-parser | Parse JSON with comments (// and /* */) | JSON-with-comments parser for config files. |

## API/Network

| Jargon | Library | Capability | Porting Guidance |
|--------|---------|------------|-----------------|
| **INFERENCE** | @anthropic-ai/sdk / openai | OpenAI-compatible Chat Completions API with streaming, tool use, content blocks | HTTP client for SSE streaming with tool_use/tool_result blocks, image input, usage tracking. |
| **HTTP** | axios | HTTP client with interceptors for non-inference API calls | HTTP client with interceptors, error handling, configurable timeouts. |
| **WEBSOCKET** | ws | WebSocket connections for voice, MCP, CLI transport | WebSocket client library. |
| **PROXY** | https-proxy-agent | HTTP/HTTPS proxy support for corporate environments | HTTP proxy connector. |

## MCP (Model Context Protocol)

| Jargon | Library | Capability | Porting Guidance |
|--------|---------|------------|-----------------|
| **MCP** | @modelcontextprotocol/sdk | Connect to external tool servers via stdio, SSE, Streamable HTTP | MCP client with stdio/SSE/HTTP transports and OAuth auth. |
| **MCPB** | @anthropic-ai/mcpb | Parse MCP Bundle files (bundled MCP server packages) | ZIP extraction + manifest parsing. |

## Utilities

| Jargon | Library | Capability | Porting Guidance |
|--------|---------|------------|-----------------|
| **UTILS** | lodash-es | Utility functions: memoize (caching), uniqBy (dedup), isEqual (deep compare), throttle, noop | Most are trivial to reimplement. memoize needs Map cache, uniqBy needs Set dedup. |
| **DIFF** | diff | Generate and parse unified diffs | Unified diff library for file edits and cache break detection. |
| **MARKDOWN** | marked | Parse markdown to tokens/HTML | Markdown parser with token output for custom rendering. |
| **FILEWATCH** | chokidar | Watch files/directories for changes with debounced events | Recursive file watcher with debouncing. |
| **PATHSPEC** | ignore | .gitignore-style pattern matching for path allow/deny | .gitignore pattern matching library. |
| **GLOB** | picomatch | Glob pattern matching for file discovery | Glob pattern matching library. |
| **FUZZY** | fuse | Fuzzy string search for typeahead and suggestions | Fuzzy matching library for autocomplete. |
| **SUBPROCESS** | execa | Execute shell commands with promise API, stdout/stderr capture | Subprocess execution with timeout and output capture. |
| **SHELL_QUOTE** | shell-quote | Parse and quote shell arguments for command analysis | Shell argument parser/quoter for permission checking. |
| **LOCKFILE** | proper-lockfile | File locking for concurrent access protection | File locking library. |
| **LRUCACHE** | lru-cache | Least Recently Used cache for config, files, web responses | LRU cache implementation. |
| **SEMVER** | semver | Semantic version parsing and comparison | Semantic versioning library. |
| **CLI_ARGS** | commander | CLI argument parsing with subcommands and typed options | CLI argument parser with subcommand support. |
| **SIGNALS** | signal-exit | Register cleanup callbacks on process exit (SIGINT, SIGTERM) | Process signal/exit handler. |
| **XDG** | env-paths | Platform-specific config/cache/data directory resolution | XDG on Linux, ~/Library on macOS, AppData on Windows. |

## Build/Runtime

| Jargon | Library | Capability | Porting Guidance |
|--------|---------|------------|-----------------|
| **BUILDFLAGS** | BUILDFLAGS | Build-time feature flags — conditionally include/exclude code at compile time | Compiler directives, build tags, or environment-based dead code elimination. Used in ~200 files. |
| **FFI** | bun:ffi | Foreign Function Interface for calling C/C++ code | FFI or native module system (NAPI, ctypes, etc.). |
| **COLORDIFF** | color-diff-napi | Native module for syntax-highlighted colored diff rendering | Can be replaced with pure-language equivalent if performance acceptable. |
| **IMAGEPROC** | image-processor-napi | Native module for image resize/format/optimization | Image processing library (resize, format conversion). |

## LSP (Language Server Protocol)

| Jargon | Library | Capability | Porting Guidance |
|--------|---------|------------|-----------------|
| **LSP** | vscode-languageserver-protocol + vscode-languageserver-types | Language Server Protocol implementation for diagnostics, definitions, references | LSP client with protocol types. |
| **JSONRPC** | vscode-jsonrpc | JSON-RPC 2.0 transport layer for LSP communication | JSON-RPC 2.0 implementation. |

## Runtime Feature Flags

| Jargon | Library | Capability | Porting Guidance |
|--------|---------|------------|-----------------|
| **FEATUREFLAGS** | @growthbook/growthbook | Server-controlled runtime feature flags and A/B testing | Feature flag service. Controls experimental features at runtime (vs BUILDFLAGS which are compile-time). |

## Excluded (Vendor-Internal / Telemetry)

These are NOT needed for a community port:

| Jargon | Library | Reason |
|--------|---------|--------|
| **TELEMETRY** | @opentelemetry/* | First-party observability. Excluded from Claudette. |
| **VENDOR** | @ant/* packages | Anthropic-internal packages (browser automation, desktop control). |

---

## Critical Path

The minimum set of jargon tokens you MUST find equivalents for:

1. **INFERENCE** — OpenAI-compatible API client with streaming and tool use
2. **INK** + **RECONCILER** + **YOGA** — Terminal UI rendering (or equivalent)
3. **SCHEMA** — Runtime validation for tool inputs
4. **MCP** — External tool server connections
5. **SUBPROCESS** — Shell command execution
6. **BUILDFLAGS** — Build-time feature gating

## Jargon Usage

Throughout the claudette/ documentation, you'll see references like:
- "Uses SCHEMA for tool input validation"
- "Requires SUBPROCESS for shell execution"
- "BUILDFLAGS control feature inclusion at compile time"

Each token maps to the capability described in this table. Find an equivalent in your target language — exact API compatibility is not required.
