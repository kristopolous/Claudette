"""Query engine - the conversation loop for tk-claudette."""

import asyncio
import json
import os
from typing import AsyncGenerator, Callable, Optional
from tk.types import Message, ToolCall, StreamEvent, CostTracker, ToolDefinition
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
        cwd: str = None,
        on_text: Callable[[str], None] = None,
        on_tool_start: Callable[[str, dict], None] = None,
        on_tool_result: Callable[[str, str], None] = None,
        on_done: Callable[[], None] = None,
        on_error: Callable[[str], None] = None,
        on_cost_update: Callable[[CostTracker], None] = None,
    ):
        self.api_client = api_client
        self.tool_registry = tool_registry
        self.cost_tracker = cost_tracker
        self.config = config
        self.cwd = cwd or os.getcwd()
        self.messages: list[Message] = []
        self.on_text = on_text or (lambda t: None)
        self.on_tool_start = on_tool_start or (lambda n, a: None)
        self.on_tool_result = on_tool_result or (lambda i, r: None)
        self.on_done = on_done or (lambda: None)
        self.on_error = on_error or (lambda e: None)
        self.on_cost_update = on_cost_update or (lambda c: None)
        self._stop_requested = False

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

                async for event in self.api_client.stream_chat(
                    messages=self.messages,
                    tools=self.tool_registry.get_definitions(),
                    max_tokens=self.config.max_tokens,
                    temperature=self.config.temperature,
                ):
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

                            continue
                        else:
                            self.on_done()
                            yield StreamEvent(type="done")
                            return

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
