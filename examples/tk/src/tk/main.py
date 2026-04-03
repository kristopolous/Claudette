#!/usr/bin/env python3
"""tk-claudette - A desktop GUI AI coding agent built with Python and Tkinter.

Supports any OpenAI-compatible endpoint: Anthropic, OpenAI, OpenRouter, Ollama,
LiteLLM, vLLM, or any custom host.
"""

import argparse
import sys
import os
import asyncio


def main():
    parser = argparse.ArgumentParser(
        description="tk-claudette - Vibe your own Claude (Tkinter edition)",
        epilog="""
Examples:
  # Anthropic (default)
  python3 -m tk.main

  # OpenAI
  python3 -m tk.main --host https://api.openai.com/v1 --model gpt-4o

  # Headless query (stdout only)
  python3 -m tk.main --query "explain asyncio" --stdout

  # Headless with custom host
  python3 -m tk.main --query "hello world" --host http://localhost:11434/v1 --stdout
        """,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument(
        "--model", "-m",
        help="Model name (any model your endpoint supports)",
    )
    parser.add_argument(
        "--host",
        help="API base URL (e.g. https://api.openai.com/v1, http://localhost:11434/v1)",
    )
    parser.add_argument(
        "--api-key",
        help="API key (or set ANTHROPIC_API_KEY / OPENAI_API_KEY / OPENROUTER_API_KEY)",
    )
    parser.add_argument(
        "--cwd",
        help="Working directory",
        default=os.getcwd(),
    )
    parser.add_argument(
        "--max-tokens",
        type=int,
        default=8192,
        help="Maximum tokens per request",
    )
    parser.add_argument(
        "--query", "-q",
        help="Send a query and exit (headless mode)",
    )
    parser.add_argument(
        "--stdout",
        action="store_true",
        help="Output to stdout (use with --query)",
    )
    parser.add_argument(
        "--version", "-v",
        action="version",
        version="tk-claudette 0.1.0",
    )
    args = parser.parse_args()

    from tk.config import Config
    from tk.api import APIClient
    from tk.tools import create_tool_registry
    from tk.models import CostTracker
    from tk.query import QueryEngine
    from tk.mcp_manager import McpManager

    config = Config()

    if args.host:
        config.set_api_base(args.host)
    if args.model:
        config.set_model(args.model)
    if args.api_key:
        config.set_api_key(args.api_key)

    if not config.api_key:
        print("Error: No API key found.")
        print("Set one of: ANTHROPIC_API_KEY, OPENAI_API_KEY, OPENROUTER_API_KEY")
        print("Or pass --api-key on the command line.")
        sys.exit(1)

    api_client = APIClient(
        api_key=config.api_key,
        base_url=config.api_base,
        model=config.model,
    )

    tool_registry = create_tool_registry()
    mcp_manager = McpManager(config)

    cost_tracker = CostTracker(
        input_cost_per_million=config.input_cost_per_million,
        output_cost_per_million=config.output_cost_per_million,
    )

    config.max_tokens = args.max_tokens

    query_engine = QueryEngine(
        api_client=api_client,
        tool_registry=tool_registry,
        mcp_manager=mcp_manager,
        cost_tracker=cost_tracker,
        config=config,
        cwd=args.cwd,
    )

    if args.query and args.stdout:
        asyncio.run(run_headless(query_engine, args.query))
        return

    from tk.ui import MainWindow
    app = MainWindow(config=config, query_engine=query_engine, tool_registry=tool_registry, mcp_manager=mcp_manager)
    app.run()


async def run_headless(query_engine, query: str):
    import json

    print(f">>> {query}", flush=True)
    print("---", flush=True)

    try:
        async for event in query_engine.submit(query):
            if event.type == "text":
                text = event.data.get("text", "")
                print(text, end="", flush=True)
            elif event.type == "tool_use_start":
                name = event.data.get("name", "")
                print(f"\n[tool: {name}]", flush=True)
            elif event.type == "tool_result":
                name = event.data.get("tool_name", "")
                is_error = event.data.get("is_error", False)
                result = event.data.get("result", "")
                preview = result[:300] + "..." if len(result) > 300 else result
                print(f"[tool result: {name}{' (error)' if is_error else ''}]\n{preview}", flush=True)
            elif event.type == "error":
                error = event.data.get("error", "Unknown error")
                print(f"\n[error] {error}", flush=True)
            elif event.type == "usage":
                inp = event.data.get("input_tokens", 0)
                out = event.data.get("output_tokens", 0)
                print(f"\n[usage] input={inp} output={out} total={inp+out}", flush=True)
            elif event.type == "done":
                print("\n---", flush=True)
    except Exception as e:
        print(f"\n[error] {e}", flush=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
