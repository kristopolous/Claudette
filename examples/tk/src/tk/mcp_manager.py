"""MCP server manager for tk-claudette."""

import asyncio
import json
import os
from typing import Optional
from tk.models import ToolDefinition, ToolResult


class McpManager:
    """Manages MCP server connections and tool discovery."""

    def __init__(self, config=None):
        self._servers: list[dict] = []
        self._connections: dict[str, dict] = {}
        self._mcp_tools: dict[str, list[ToolDefinition]] = {}
        self.config = config
        if config and hasattr(config, 'mcp_servers'):
            self._servers = list(config.mcp_servers)

    def _persist(self):
        if self.config and hasattr(self.config, 'mcp_servers'):
            self.config.mcp_servers = list(self._servers)
            self.config.save()

    def add_server(self, server: dict):
        self._servers.append(server)
        self._persist()

    def remove_server(self, name: str):
        self._servers = [s for s in self._servers if s.get("name") != name]
        self._connections.pop(name, None)
        self._mcp_tools.pop(name, None)
        self._persist()

    def get_server(self, name: str) -> Optional[dict]:
        for s in self._servers:
            if s.get("name") == name:
                return s
        return None

    def get_servers(self) -> list[dict]:
        result = []
        for s in self._servers:
            info = dict(s)
            conn = self._connections.get(s.get("name", ""))
            info["status"] = conn.get("status", "disconnected") if conn else "disconnected"
            info["tool_count"] = len(self._mcp_tools.get(s.get("name", ""), []))
            result.append(info)
        return result

    def update_server(self, old_name: str, server: dict):
        for i, s in enumerate(self._servers):
            if s.get("name") == old_name:
                self._servers[i] = server
                break
        self._connections.pop(old_name, None)
        self._mcp_tools.pop(old_name, None)
        self._persist()

    def get_all_tool_definitions(self) -> list[ToolDefinition]:
        tools = []
        for server_name, defs in self._mcp_tools.items():
            for d in defs:
                tools.append(d)
        return tools

    def get_server_tools(self, server_name: str) -> list[ToolDefinition]:
        return self._mcp_tools.get(server_name, [])

    def get_tool_states(self) -> dict[str, bool]:
        states = {}
        for server_name, defs in self._mcp_tools.items():
            for d in defs:
                states[f"mcp:{server_name}:{d.name}"] = True
        return states

    async def connect_server(self, server: dict) -> str:
        """Connect to an MCP server and discover tools. Returns status string."""
        name = server.get("name", "")
        transport = server.get("transport", "stdio")

        try:
            if transport == "stdio":
                return await self._connect_stdio(server)
            elif transport in ("sse", "http"):
                return await self._connect_http(server)
            else:
                return f"Unsupported transport: {transport}"
        except Exception as e:
            self._connections[name] = {"status": f"error: {e}"}
            return f"Error: {e}"

    async def _connect_stdio(self, server: dict) -> str:
        try:
            from mcp import ClientSession
            from mcp.client.stdio import StdioServerParameters, stdio_client
        except ImportError:
            return "MCP SDK not installed. Install with: pip install mcp"

        name = server.get("name", "")
        command = server.get("command", "")
        args = server.get("args", [])

        if not command:
            return "No command specified"

        server_params = StdioServerParameters(
            command=command,
            args=args,
            env={**os.environ},
        )

        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()

                tools_result = await session.list_tools()
                tools = []
                for t in tools_result.tools:
                    tools.append(ToolDefinition(
                        name=f"mcp:{name}:{t.name}",
                        description=t.description or "",
                        parameters=t.inputSchema if t.inputSchema else {"type": "object", "properties": {}},
                        display_name=t.name,
                        server_name=name,
                    ))

                self._mcp_tools[name] = tools
                self._connections[name] = {"status": "connected", "session": session}
                return f"Connected - {len(tools)} tools discovered"

    async def _connect_http(self, server: dict) -> str:
        try:
            from mcp import ClientSession
            from mcp.client.streamable_http import streamablehttp_client
        except ImportError:
            return "MCP SDK not installed. Install with: pip install mcp"

        name = server.get("name", "")
        url = server.get("url", "")

        if not url:
            return "No URL specified"

        async with streamablehttp_client(url) as (read, write, _):
            async with ClientSession(read, write) as session:
                await session.initialize()

                tools_result = await session.list_tools()
                tools = []
                for t in tools_result.tools:
                    tools.append(ToolDefinition(
                        name=f"mcp:{name}:{t.name}",
                        description=t.description or "",
                        parameters=t.inputSchema if t.inputSchema else {"type": "object", "properties": {}},
                        display_name=t.name,
                        server_name=name,
                    ))

                self._mcp_tools[name] = tools
                self._connections[name] = {"status": "connected"}
                return f"Connected - {len(tools)} tools discovered"

    async def execute_mcp_tool(self, server_name: str, tool_name: str, arguments: dict) -> ToolResult:
        """Execute an MCP tool. server_name is the MCP server, tool_name is the raw tool name."""
        server = self.get_server(server_name)
        if not server:
            return ToolResult(tool_call_id="", content=f"MCP server '{server_name}' not found", is_error=True)

        transport = server.get("transport", "stdio")

        try:
            if transport == "stdio":
                return await self._execute_stdio_tool(server, tool_name, arguments)
            elif transport in ("sse", "http"):
                return await self._execute_http_tool(server, tool_name, arguments)
        except Exception as e:
            return ToolResult(tool_call_id="", content=f"MCP tool error: {e}", is_error=True)

        return ToolResult(tool_call_id="", content="Unknown transport", is_error=True)

    async def _execute_stdio_tool(self, server: dict, tool_name: str, arguments: dict) -> ToolResult:
        from mcp import ClientSession
        from mcp.client.stdio import StdioServerParameters, stdio_client

        command = server.get("command", "")
        args = server.get("args", [])

        server_params = StdioServerParameters(
            command=command,
            args=args,
            env={**os.environ},
        )

        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                result = await session.call_tool(tool_name, arguments)
                content = ""
                for c in result.content:
                    if hasattr(c, "text"):
                        content += c.text
                    else:
                        content += str(c)
                return ToolResult(tool_call_id="", content=content, is_error=result.isError)

    async def _execute_http_tool(self, server: dict, tool_name: str, arguments: dict) -> ToolResult:
        from mcp import ClientSession
        from mcp.client.streamable_http import streamablehttp_client

        url = server.get("url", "")

        async with streamablehttp_client(url) as (read, write, _):
            async with ClientSession(read, write) as session:
                await session.initialize()
                result = await session.call_tool(tool_name, arguments)
                content = ""
                for c in result.content:
                    if hasattr(c, "text"):
                        content += c.text
                    else:
                        content += str(c)
                return ToolResult(tool_call_id="", content=content, is_error=result.isError)

    def disconnect_all(self):
        self._connections.clear()
        self._mcp_tools.clear()
