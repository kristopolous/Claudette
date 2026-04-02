"""API client for any OpenAI-compatible inference provider."""

import json
import asyncio
import httpx
from typing import AsyncGenerator, Optional
from tk.models import Message, ToolDefinition, StreamEvent


class Provider:
    ANTHROPIC = "anthropic"
    OPENAI = "openai"
    OPENROUTER = "openrouter"
    OLLAMA = "ollama"
    LITELLM = "litellm"
    VLLM = "vllm"
    CUSTOM = "custom"


def detect_provider(base_url: str) -> str:
    url = base_url.lower()
    if "anthropic" in url:
        return Provider.ANTHROPIC
    if "openrouter" in url:
        return Provider.OPENROUTER
    if "ollama" in url:
        return Provider.OLLAMA
    if "litellm" in url:
        return Provider.LITELLM
    if "vllm" in url:
        return Provider.VLLM
    return Provider.OPENAI


class APIClient:
    def __init__(self, api_key: str, base_url: str, model: str):
        self.api_key = api_key
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.provider = detect_provider(base_url)
        self.client = httpx.AsyncClient(timeout=120.0)
        self._accumulated_tool_inputs: dict[int, str] = {}

    async def close(self):
        await self.client.aclose()

    def _build_headers(self) -> dict:
        if self.provider == Provider.ANTHROPIC:
            return {
                "x-api-key": self.api_key,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json",
            }
        if self.provider == Provider.OPENROUTER:
            return {
                "Authorization": f"Bearer {self.api_key}",
                "HTTP-Referer": "https://github.com/kristopolous/claudette",
                "X-Title": "tk-claudette",
                "content-type": "application/json",
            }
        return {
            "Authorization": f"Bearer {self.api_key}",
            "content-type": "application/json",
        }

    def _get_endpoint(self) -> str:
        if self.provider == Provider.ANTHROPIC:
            return f"{self.base_url}/messages"
        return f"{self.base_url}/chat/completions"

    def _format_messages(self, messages: list[Message]) -> tuple[list[dict], Optional[str]]:
        if self.provider == Provider.ANTHROPIC:
            return self._format_anthropic_messages(messages)
        return self._format_openai_messages(messages)

    def _format_anthropic_messages(self, messages: list[Message]) -> tuple[list[dict], Optional[str]]:
        formatted = []
        system_msg = None
        for msg in messages:
            if msg.role == "system":
                system_msg = msg.content
                continue
            if msg.role == "tool" and msg.tool_call_id:
                formatted.append({
                    "role": "user",
                    "content": [
                        {
                            "type": "tool_result",
                            "tool_use_id": msg.tool_call_id,
                            "content": msg.content,
                        }
                    ],
                })
            elif msg.tool_calls:
                content = []
                if msg.content:
                    content.append({"type": "text", "text": msg.content})
                for tc in msg.tool_calls:
                    content.append({
                        "type": "tool_use",
                        "id": tc.id,
                        "name": tc.name,
                        "input": tc.arguments,
                    })
                formatted.append({"role": "assistant", "content": content})
            else:
                formatted.append({"role": msg.role, "content": msg.content})
        return formatted, system_msg

    def _format_openai_messages(self, messages: list[Message]) -> tuple[list[dict], Optional[str]]:
        formatted = []
        system_msg = None
        for msg in messages:
            if msg.role == "system":
                system_msg = msg.content
                continue
            if msg.role == "tool" and msg.tool_call_id:
                formatted.append({
                    "role": "tool",
                    "tool_call_id": msg.tool_call_id,
                    "content": msg.content,
                    "name": msg.name or "tool",
                })
            elif msg.tool_calls:
                tc_list = []
                for tc in msg.tool_calls:
                    tc_list.append({
                        "id": tc.id,
                        "type": "function",
                        "function": {
                            "name": tc.name,
                            "arguments": json.dumps(tc.arguments),
                        },
                    })
                formatted.append({
                    "role": "assistant",
                    "content": msg.content if msg.content else None,
                    "tool_calls": tc_list,
                })
            else:
                formatted.append({"role": msg.role, "content": msg.content})
        return formatted, system_msg

    def _format_tools(self, tools: Optional[list[ToolDefinition]]) -> Optional[list[dict]]:
        if not tools:
            return None
        if self.provider == Provider.ANTHROPIC:
            return [
                {
                    "name": t.name,
                    "description": t.description,
                    "input_schema": t.parameters,
                }
                for t in tools
            ]
        return [
            {
                "type": "function",
                "function": {
                    "name": t.name,
                    "description": t.description,
                    "parameters": t.parameters,
                },
            }
            for t in tools
        ]

    def _build_payload(
        self,
        messages: list[dict],
        system_msg: Optional[str],
        tools: Optional[list[dict]],
        max_tokens: int,
        temperature: float,
    ) -> dict:
        if self.provider == Provider.ANTHROPIC:
            payload: dict = {
                "model": self.model,
                "messages": messages,
                "max_tokens": max_tokens,
                "temperature": temperature,
                "stream": True,
            }
            if system_msg:
                payload["system"] = system_msg
            if tools:
                payload["tools"] = tools
            return payload

        payload = {
            "model": self.model,
            "messages": messages,
            "max_tokens": max_tokens,
            "temperature": temperature,
            "stream": True,
            "stream_options": {"include_usage": True},
        }
        if system_msg:
            payload["messages"].insert(0, {"role": "system", "content": system_msg})
        if tools:
            payload["tools"] = tools
        return payload

    def _parse_anthropic_event(self, data: dict) -> Optional[StreamEvent]:
        event_type = data.get("type", "")
        if event_type == "content_block_start":
            block = data.get("content_block", {})
            if block.get("type") == "tool_use":
                return StreamEvent(type="tool_use_start", data={
                    "id": block.get("id"),
                    "name": block.get("name"),
                })
        elif event_type == "content_block_delta":
            delta = data.get("delta", {})
            if delta.get("type") == "text_delta":
                return StreamEvent(type="text", data={"text": delta.get("text", "")})
            elif delta.get("type") == "input_json_delta":
                return StreamEvent(type="tool_use_delta", data={
                    "partial_json": delta.get("partial_json", "")
                })
        elif event_type == "message_delta":
            usage = data.get("usage", {})
            if usage:
                return StreamEvent(type="usage", data={
                    "input_tokens": usage.get("input_tokens", 0),
                    "output_tokens": usage.get("output_tokens", 0),
                })
        elif event_type == "message_stop":
            return StreamEvent(type="done")
        return None

    def _parse_openai_event(self, data: dict) -> Optional[StreamEvent]:
        choices = data.get("choices", [])
        if choices:
            choice = choices[0]
            delta = choice.get("delta", {})
            finish_reason = choice.get("finish_reason")
            if finish_reason == "stop":
                return StreamEvent(type="done")
            if delta.get("content"):
                return StreamEvent(type="text", data={"text": delta["content"]})
            if delta.get("tool_calls"):
                for tc in delta["tool_calls"]:
                    return StreamEvent(type="tool_use_delta", data={
                        "index": tc.get("index", 0),
                        "id": tc.get("id"),
                        "name": tc.get("function", {}).get("name"),
                        "arguments": tc.get("function", {}).get("arguments"),
                    })
        usage = data.get("usage")
        if usage:
            return StreamEvent(type="usage", data={
                "input_tokens": usage.get("prompt_tokens", 0),
                "output_tokens": usage.get("completion_tokens", 0),
            })
        return None

    def _parse_stream_event(self, line: str) -> Optional[StreamEvent]:
        if not line or not line.startswith("data: "):
            return None
        data_str = line[6:]
        if data_str.strip() == "[DONE]":
            return StreamEvent(type="done")
        try:
            data = json.loads(data_str)
        except json.JSONDecodeError:
            return None

        if self.provider == Provider.ANTHROPIC:
            return self._parse_anthropic_event(data)
        return self._parse_openai_event(data)

    async def stream_chat(
        self,
        messages: list[Message],
        tools: Optional[list[ToolDefinition]] = None,
        max_tokens: int = 8192,
        temperature: float = 0.7,
    ) -> AsyncGenerator[StreamEvent, None]:
        headers = self._build_headers()
        formatted_messages, system_msg = self._format_messages(messages)
        tools_formatted = self._format_tools(tools)
        payload = self._build_payload(formatted_messages, system_msg, tools_formatted, max_tokens, temperature)
        endpoint = self._get_endpoint()

        request = self.client.build_request("POST", endpoint, headers=headers, json=payload)
        response = await self.client.send(request, stream=True)
        try:
            if response.status_code != 200:
                body = await response.aread()
                yield StreamEvent(type="error", data={
                    "error": f"API error {response.status_code}: {body.decode('utf-8', errors='replace')}\nURL: {endpoint}\nPayload: {json.dumps(payload, indent=2)[:500]}"
                })
                return

            lines = response.aiter_lines()
            try:
                async for line in lines:
                    event = self._parse_stream_event(line)
                    if event:
                        yield event
            except (GeneratorExit, asyncio.CancelledError):
                pass
            except BaseException:
                pass
        finally:
            try:
                await response.aclose()
            except Exception:
                pass

    async def chat(
        self,
        messages: list[Message],
        tools: Optional[list[ToolDefinition]] = None,
        max_tokens: int = 8192,
        temperature: float = 0.7,
    ) -> dict:
        headers = self._build_headers()
        formatted_messages, system_msg = self._format_messages(messages)
        tools_formatted = self._format_tools(tools)

        if self.provider == Provider.ANTHROPIC:
            payload: dict = {
                "model": self.model,
                "messages": formatted_messages,
                "max_tokens": max_tokens,
                "temperature": temperature,
            }
            if system_msg:
                payload["system"] = system_msg
            if tools_formatted:
                payload["tools"] = tools_formatted
        else:
            payload = {
                "model": self.model,
                "messages": formatted_messages,
                "max_tokens": max_tokens,
                "temperature": temperature,
            }
            if system_msg:
                payload["messages"].insert(0, {"role": "system", "content": system_msg})
            if tools_formatted:
                payload["tools"] = tools_formatted

        endpoint = self._get_endpoint()
        response = await self.client.post(endpoint, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()
