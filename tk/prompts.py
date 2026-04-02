"""System prompt construction for tk-claudette."""

from tk.tools import ToolRegistry


SYSTEM_PROMPT = """You are Claudette, an expert AI coding assistant running in a desktop GUI application. You help users write, edit, and understand code.

You have access to tools that let you execute shell commands, read and write files, search codebases, and fetch web content. Use these tools proactively to help the user.

Guidelines:
- Be concise and direct in your responses
- Use tools to accomplish tasks rather than describing what you would do
- When executing shell commands, be careful to only run safe commands
- When editing files, make sure you read the file first to understand its contents
- When searching, use efficient patterns and limit results appropriately
- If you encounter errors, explain them and suggest fixes
- Always think step by step before taking action

You are running in a Tkinter-based desktop application."""


def build_system_prompt(registry: ToolRegistry, cwd: str, extra_context: str = "") -> str:
    parts = [SYSTEM_PROMPT]

    tool_names = [t.name for t in registry._tools.values()]
    parts.append(f"\nAvailable tools: {', '.join(tool_names)}")

    import os
    parts.append(f"\nCurrent working directory: {cwd}")
    try:
        import subprocess
        branch = subprocess.run(
            "git branch --show-current",
            shell=True, capture_output=True, text=True, timeout=5
        ).stdout.strip()
        if branch:
            parts.append(f"Git branch: {branch}")
    except Exception:
        pass

    if extra_context:
        parts.append(f"\n{extra_context}")

    return "\n".join(parts)
