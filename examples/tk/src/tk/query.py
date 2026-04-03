"""Query engine - the conversation loop for tk-claudette."""

import asyncio
import json
import os
from typing import AsyncGenerator, Callable, Optional
from tk.models import Message, ToolCall, StreamEvent, CostTracker, ToolDefinition
from tk.api import APIClient
from tk.tools import ToolRegistry
from tk.prompts import build_system_prompt


class QueryEngine:
    def __init__(
        self,
        api_client: APIClient,
        tool_registry: ToolRegistry,
        cost_tracker: CostTracker,
        config,
        mcp_manager=None,
        cwd: str | None = None,
        on_text: Optional[Callable[[str], None]] = None,
        on_tool_start: Optional[Callable[[str, dict], None]] = None,
        on_tool_result: Optional[Callable[[str, str], None]] = None,
        on_done: Optional[Callable[[], None]] = None,
        on_error: Optional[Callable[[str], None]] = None,
        on_cost_update: Optional[Callable[[CostTracker], None]] = None,
    ):
        self.api_client = api_client
        self.tool_registry = tool_registry
        self.mcp_manager = mcp_manager
        self.cost_tracker = cost_tracker
        self.config = config
        self._cwd = cwd or os.getcwd()
        self.messages: list[Message] = []
        self.on_text = on_text or (lambda t: None)
        self.on_tool_start = on_tool_start or (lambda n, a: None)
        self.on_tool_result = on_tool_result or (lambda i, r: None)
        self.on_done = on_done or (lambda: None)
        self.on_error = on_error or (lambda e: None)
        self.on_cost_update = on_cost_update or (lambda c: None)
        self._stop_requested = False

    @property
    def cwd(self):
        return self._cwd

    @cwd.setter
    def cwd(self, value):
        self._cwd = value
        for i, msg in enumerate(self.messages):
            if msg.role == "system":
                self.messages[i] = Message(role="system", content=build_system_prompt(self.tool_registry, value))
                break

    def add_system_message(self):
        system_prompt = build_system_prompt(self.tool_registry, self.cwd)
        self.messages.insert(0, Message(role="system", content=system_prompt))

    def add_user_message(self, content: str):
        self.messages.append(Message(role="user", content=content))

    def request_stop(self):
        self._stop_requested = True

    async def submit(self, user_message: str) -> AsyncGenerator[StreamEvent, None]:
        self.add_user_message(user_message)
        if not any(m.role == "system" for m in self.messages):
            self.add_system_message()

        self._stop_requested = False
        turn_count = 0

        try:
            while turn_count < self.config.max_turns and not self._stop_requested:
                turn_count += 1
                accumulated_text = ""
                pending_tool_calls = []
                current_tool_id = None
                current_tool_name = None
                current_tool_json = ""

                tools = self.tool_registry.get_definitions()
                if self.mcp_manager:
                    tools = tools + self.mcp_manager.get_all_tool_definitions()

                tools = self.tool_registry.get_definitions()
                if self.mcp_manager:
                    tools = tools + self.mcp_manager.get_all_tool_definitions()

                stream = self.api_client.stream_chat(
                    messages=self.messages,
                    tools=tools,
                    max_tokens=self.config.max_tokens,
                    temperature=self.config.temperature,
                )

                try:
                    async for event in stream:
                        if self._stop_requested:
                            yield StreamEvent(type="done")
                            return

                        if event.type == "text":
                            text = event.data.get("text", "")
                            accumulated_text += text
                            self.on_text(text)
                            yield event

                        elif event.type == "tool_use_start":
                            current_tool_id = event.data.get("id", "")
                            current_tool_name = event.data.get("name", "")
                            current_tool_json = ""
                            yield event

                        elif event.type == "tool_use_delta":
                            partial = event.data.get("partial_json", "")
                            if partial:
                                current_tool_json += partial
                            name = event.data.get("name")
                            if name:
                                current_tool_name = name
                            tc_id = event.data.get("id")
                            if tc_id:
                                current_tool_id = tc_id
                            yield event

                        elif event.type == "usage":
                            input_tokens = event.data.get("input_tokens", 0)
                            output_tokens = event.data.get("output_tokens", 0)
                            self.cost_tracker.add_usage(input_tokens, output_tokens)
                            self.on_cost_update(self.cost_tracker)
                            yield event

                        elif event.type == "error":
                            error_msg = event.data.get("error", "Unknown API error")
                            self.on_error(error_msg)
                            yield event
                            return

                        elif event.type == "done":
                            if current_tool_name and current_tool_id and current_tool_json:
                                try:
                                    args = json.loads(current_tool_json) if current_tool_json.strip() else {}
                                except json.JSONDecodeError:
                                    args = {}
                                pending_tool_calls.append({
                                    "id": current_tool_id,
                                    "name": current_tool_name,
                                    "arguments": args,
                                })

                            if accumulated_text:
                                self.messages.append(Message(role="assistant", content=accumulated_text))

                            if pending_tool_calls:
                                tool_calls = [
                                    ToolCall(id=tc["id"], name=tc["name"], arguments=tc["arguments"])
                                    for tc in pending_tool_calls
                                ]
                                self.messages.append(Message(
                                    role="assistant",
                                    content="",
                                    tool_calls=tool_calls,
                                ))

                                for tc in pending_tool_calls:
                                    self.on_tool_start(tc["name"], tc["arguments"])
                                    if tc["name"].startswith("mcp:"):
                                        parts = tc["name"].split(":", 2)
                                        server_name = parts[1] if len(parts) > 1 else ""
                                        raw_name = parts[2] if len(parts) > 2 else tc["name"]
                                        result = await self.mcp_manager.execute_mcp_tool(
                                            server_name, raw_name, tc["arguments"]
                                        )
                                    else:
                                        result = await self.tool_registry.execute(
                                            tc["name"], tc["arguments"], cwd=self.cwd
                                        )
                                    self.on_tool_result(tc["name"], result.content)
                                    self.messages.append(Message(
                                        role="tool",
                                        content=result.content,
                                        tool_call_id=tc["id"],
                                        name=tc["name"],
                                    ))
                                    yield StreamEvent(type="tool_result", data={
                                        "tool_name": tc["name"],
                                        "result": result.content,
                                        "is_error": result.is_error,
                                    })

                                break
                            else:
                                self.on_done()
                                yield StreamEvent(type="done")
                                return
                finally:
                    await stream.aclose()

                if not pending_tool_calls:
                    self.on_done()
                    yield StreamEvent(type="done")
                    return

        except Exception as e:
            self.on_error(str(e))
            yield StreamEvent(type="error", data={"error": str(e)})

    def clear(self):
        self.messages = []
        self._stop_requested = False
