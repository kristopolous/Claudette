"""Tool system for tk-claudette."""

import json
import subprocess
import asyncio
import os
import re
import fnmatch
import html
from pathlib import Path
from typing import Optional
from tk.models import ToolDefinition, ToolResult


class ToolRegistry:
    def __init__(self):
        self._tools: dict[str, "BaseTool"] = {}
        self._enabled: dict[str, bool] = {}

    def register(self, tool: "BaseTool"):
        self._tools[tool.name] = tool
        self._enabled[tool.name] = True

    def get(self, name: str) -> Optional["BaseTool"]:
        return self._tools.get(name)

    def get_definitions(self) -> list[ToolDefinition]:
        return [t.definition for t in self._tools.values() if self._enabled.get(t.name, True)]

    async def execute(self, name: str, arguments: dict, cwd: str | None = None) -> ToolResult:
        if not self._enabled.get(name, False):
            return ToolResult(tool_call_id="", content=f"Tool '{name}' is disabled", is_error=True)
        tool = self._tools.get(name)
        if not tool:
            return ToolResult(tool_call_id="", content=f"Unknown tool: {name}", is_error=True)
        try:
            result = await tool.execute(arguments, cwd=cwd)
            return result
        except Exception as e:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=str(e), is_error=True)

    def get_tool_states(self) -> dict[str, bool]:
        return dict(self._enabled)

    def enable_all(self):
        for name in self._enabled:
            self._enabled[name] = True

    def disable_all(self):
        for name in self._enabled:
            self._enabled[name] = False


class BaseTool:
    name: str = ""
    description: str = ""
    parameters: dict = {}

    @property
    def definition(self) -> ToolDefinition:
        return ToolDefinition(name=self.name, description=self.description, parameters=self.parameters)

    async def execute(self, arguments: dict, cwd: str | None = None) -> ToolResult:
        raise NotImplementedError


class BashTool(BaseTool):
    name = "Bash"
    description = "Execute a shell command and return its output."
    parameters = {
        "type": "object",
        "properties": {
            "command": {"type": "string", "description": "The shell command to execute"},
            "timeout": {"type": "integer", "description": "Timeout in seconds (default: 30)", "default": 30},
        },
        "required": ["command"],
    }

    async def execute(self, arguments: dict, cwd: str | None = None) -> ToolResult:
        command = arguments.get("command", "")
        timeout = arguments.get("timeout", 30)
        if not command:
            return ToolResult(tool_call_id="", content="No command provided", is_error=True)
        try:
            proc = await asyncio.create_subprocess_shell(
                command,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
                cwd=cwd or os.getcwd(),
            )
            stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
            output = ""
            if stdout:
                output += stdout.decode("utf-8", errors="replace")
            if stderr:
                if output:
                    output += "\n--- stderr ---\n"
                output += stderr.decode("utf-8", errors="replace")
            if not output:
                output = "(command completed with no output)"
            max_output = 50000
            if len(output) > max_output:
                output = output[:max_output] + f"\n... (output truncated, {len(output) - max_output} more characters)"
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=output)
        except asyncio.TimeoutError:
            proc.kill()
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Command timed out after {timeout}s", is_error=True)
        except Exception as e:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=str(e), is_error=True)


class ReadTool(BaseTool):
    name = "Read"
    description = "Read the contents of a file. Supports optional line range."
    parameters = {
        "type": "object",
        "properties": {
            "file_path": {"type": "string", "description": "Path to the file to read"},
            "start_line": {"type": "integer", "description": "Starting line number (1-indexed, default: 1)"},
            "end_line": {"type": "integer", "description": "Ending line number (inclusive, default: end of file)"},
        },
        "required": ["file_path"],
    }

    async def execute(self, arguments: dict, cwd: str | None = None) -> ToolResult:
        file_path = arguments.get("file_path", "")
        if not file_path:
            return ToolResult(tool_call_id="", content="No file path provided", is_error=True)
        path = Path(file_path)
        if not path.is_absolute():
            path = Path(cwd or os.getcwd()) / path
        if not path.exists():
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"File not found: {file_path}", is_error=True)
        if not path.is_file():
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Not a file: {file_path}", is_error=True)
        try:
            with open(path, "r", errors="replace") as f:
                lines = f.readlines()
            start = max(1, arguments.get("start_line", 1))
            end = arguments.get("end_line", len(lines))
            selected = lines[start - 1 : end]
            content = "".join(selected)
            if not content:
                content = "(file is empty or line range is out of bounds)"
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=content)
        except PermissionError:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Permission denied: {file_path}", is_error=True)
        except Exception as e:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=str(e), is_error=True)


class WriteTool(BaseTool):
    name = "Write"
    description = "Write content to a file. Creates the file if it doesn't exist, overwrites if it does."
    parameters = {
        "type": "object",
        "properties": {
            "file_path": {"type": "string", "description": "Path to the file to write"},
            "content": {"type": "string", "description": "Content to write to the file"},
        },
        "required": ["file_path", "content"],
    }

    async def execute(self, arguments: dict, cwd: str | None = None) -> ToolResult:
        file_path = arguments.get("file_path", "")
        content = arguments.get("content", "")
        if not file_path:
            return ToolResult(tool_call_id="", content="No file path provided", is_error=True)
        path = Path(file_path)
        if not path.is_absolute():
            path = Path(cwd or os.getcwd()) / path
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            with open(path, "w") as f:
                f.write(content)
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Successfully wrote {len(content)} characters to {file_path}")
        except PermissionError:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Permission denied: {file_path}", is_error=True)
        except Exception as e:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=str(e), is_error=True)


class EditTool(BaseTool):
    name = "Edit"
    description = "Edit a file by replacing occurrences of old_string with new_string. Use replace_all to replace all occurrences."
    parameters = {
        "type": "object",
        "properties": {
            "file_path": {"type": "string", "description": "Path to the file to edit"},
            "old_string": {"type": "string", "description": "The text to replace"},
            "new_string": {"type": "string", "description": "The text to replace it with"},
            "replace_all": {"type": "boolean", "description": "Replace all occurrences (default: false)", "default": False},
        },
        "required": ["file_path", "old_string", "new_string"],
    }

    async def execute(self, arguments: dict, cwd: str | None = None) -> ToolResult:
        file_path = arguments.get("file_path", "")
        old_string = arguments.get("old_string", "")
        new_string = arguments.get("new_string", "")
        replace_all = arguments.get("replace_all", False)
        if not file_path:
            return ToolResult(tool_call_id="", content="No file path provided", is_error=True)
        path = Path(file_path)
        if not path.is_absolute():
            path = Path(cwd or os.getcwd()) / path
        if not path.exists():
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"File not found: {file_path}", is_error=True)
        try:
            with open(path, "r") as f:
                content = f.read()
            if old_string not in content:
                return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"String not found in {file_path}", is_error=True)
            if replace_all:
                new_content = content.replace(old_string, new_string)
            else:
                new_content = content.replace(old_string, new_string, 1)
            with open(path, "w") as f:
                f.write(new_content)
            changes = new_content.count(new_string) - content.count(new_string)
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Successfully edited {file_path}")
        except Exception as e:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=str(e), is_error=True)


class GrepTool(BaseTool):
    name = "Grep"
    description = "Search for a pattern in files. Uses Python regex."
    parameters = {
        "type": "object",
        "properties": {
            "pattern": {"type": "string", "description": "The regex pattern to search for"},
            "path": {"type": "string", "description": "Directory or file to search in (default: current directory)"},
            "include": {"type": "string", "description": "File glob pattern to include (e.g. '*.py')"},
            "case_sensitive": {"type": "boolean", "description": "Case sensitive search (default: false)", "default": False},
            "max_results": {"type": "integer", "description": "Maximum number of results (default: 50)", "default": 50},
        },
        "required": ["pattern"],
    }

    async def execute(self, arguments: dict, cwd: str | None = None) -> ToolResult:
        pattern = arguments.get("pattern", "")
        search_path = arguments.get("path", cwd or os.getcwd())
        include = arguments.get("include", "*")
        case_sensitive = arguments.get("case_sensitive", False)
        max_results = arguments.get("max_results", 50)
        flags = 0 if case_sensitive else re.IGNORECASE
        try:
            compiled = re.compile(pattern, flags)
        except re.error as e:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Invalid regex: {e}", is_error=True)
        search_path = Path(search_path)
        if not search_path.exists():
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Path not found: {search_path}", is_error=True)
        results = []
        files = []
        if search_path.is_file():
            files = [search_path]
        else:
            for root, dirs, filenames in os.walk(search_path):
                dirs[:] = [d for d in dirs if not d.startswith(".")]
                for fname in filenames:
                    if fnmatch.fnmatch(fname, include):
                        files.append(Path(root) / fname)
        for fpath in files[:200]:
            if len(results) >= max_results:
                break
            try:
                with open(fpath, "r", errors="replace") as f:
                    for line_num, line in enumerate(f, 1):
                        if compiled.search(line):
                            rel = fpath.relative_to(cwd or os.getcwd()) if cwd else fpath
                            results.append(f"{rel}:{line_num}: {line.rstrip()}")
                            if len(results) >= max_results:
                                break
            except (PermissionError, IOError):
                continue
        if not results:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content="No matches found")
        output = "\n".join(results)
        if len(results) >= max_results:
            output += f"\n... (results truncated at {max_results})"
        return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=output)


class GlobTool(BaseTool):
    name = "Glob"
    description = "Find files matching a glob pattern."
    parameters = {
        "type": "object",
        "properties": {
            "pattern": {"type": "string", "description": "The glob pattern (e.g. '**/*.py')"},
            "path": {"type": "string", "description": "Directory to search in (default: current directory)"},
        },
        "required": ["pattern"],
    }

    async def execute(self, arguments: dict, cwd: str | None = None) -> ToolResult:
        pattern = arguments.get("pattern", "")
        search_path = Path(arguments.get("path", cwd or os.getcwd()))
        if not search_path.exists():
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Path not found: {search_path}", is_error=True)
        try:
            files = list(search_path.glob(pattern))
            files = [f for f in files if f.is_file()]
            files.sort()
            if not files:
                return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content="No files found")
            rel_files = []
            for f in files[:100]:
                try:
                    rel_files.append(str(f.relative_to(cwd or os.getcwd())))
                except ValueError:
                    rel_files.append(str(f))
            output = "\n".join(rel_files)
            if len(files) > 100:
                output += f"\n... ({len(files) - 100} more files)"
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=output)
        except Exception as e:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=str(e), is_error=True)


class WebFetchTool(BaseTool):
    name = "WebFetch"
    description = "Fetch content from a URL and return it as text."
    parameters = {
        "type": "object",
        "properties": {
            "url": {"type": "string", "description": "The URL to fetch"},
        },
        "required": ["url"],
    }

    async def execute(self, arguments: dict, cwd: str | None = None) -> ToolResult:
        url = arguments.get("url", "")
        if not url:
            return ToolResult(tool_call_id="", content="No URL provided", is_error=True)
        if not url.startswith(("http://", "https://")):
            url = "https://" + url
        try:
            import httpx
            async with httpx.AsyncClient(follow_redirects=True, timeout=30.0) as client:
                response = await client.get(url)
                response.raise_for_status()
                content_type = response.headers.get("content-type", "")
                if "text/html" in content_type:
                    text = self._html_to_text(response.text)
                else:
                    text = response.text
                max_len = 30000
                if len(text) > max_len:
                    text = text[:max_len] + f"\n... (content truncated at {max_len} chars)"
                return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=text)
        except Exception as e:
            return ToolResult(tool_call_id=arguments.get("tool_call_id", ""), content=f"Failed to fetch URL: {e}", is_error=True)

    def _html_to_text(self, html_content: str) -> str:
        from html.parser import HTMLParser
        class HTMLStripper(HTMLParser):
            def __init__(self):
                super().__init__()
                self._text = []
                self._skip = False
            def handle_starttag(self, tag, attrs):
                if tag in ("script", "style", "head"):
                    self._skip = True
                elif tag in ("br", "p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li"):
                    self._text.append("\n")
            def handle_endtag(self, tag):
                if tag in ("script", "style", "head"):
                    self._skip = False
                elif tag in ("p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li"):
                    self._text.append("\n")
            def handle_data(self, data):
                if not self._skip:
                    self._text.append(data)
        stripper = HTMLStripper()
        stripper.feed(html_content)
        text = "".join(stripper._text)
        text = re.sub(r"\n\s*\n", "\n\n", text)
        return text.strip()


def create_tool_registry() -> ToolRegistry:
    registry = ToolRegistry()
    registry.register(BashTool())
    registry.register(ReadTool())
    registry.register(WriteTool())
    registry.register(EditTool())
    registry.register(GrepTool())
    registry.register(GlobTool())
    registry.register(WebFetchTool())
    return registry
