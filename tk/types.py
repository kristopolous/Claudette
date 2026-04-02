"""Core types and data models for tk-claudette."""

from dataclasses import dataclass, field
from typing import Optional
from enum import Enum


class Role(Enum):
    USER = "user"
    ASSISTANT = "assistant"
    TOOL = "tool"
    SYSTEM = "system"


class PermissionLevel(Enum):
    ALWAYS = "always"
    ASK = "ask"
    NEVER = "never"


@dataclass
class ToolCall:
    id: str
    name: str
    arguments: dict


@dataclass
class Message:
    role: str
    content: str
    tool_calls: Optional[list[ToolCall]] = None
    tool_call_id: Optional[str] = None
    name: Optional[str] = None


@dataclass
class ToolDefinition:
    name: str
    description: str
    parameters: dict


@dataclass
class ToolResult:
    tool_call_id: str
    content: str
    is_error: bool = False


@dataclass
class CostTracker:
    input_tokens: int = 0
    output_tokens: int = 0
    total_cost: float = 0.0
    input_cost_per_million: float = 3.0
    output_cost_per_million: float = 15.0

    def add_usage(self, input_tokens: int, output_tokens: int):
        self.input_tokens += input_tokens
        self.output_tokens += output_tokens
        self.total_cost = (
            self.input_tokens * self.input_cost_per_million / 1_000_000
            + self.output_tokens * self.output_cost_per_million / 1_000_000
        )

    @property
    def total_tokens(self) -> int:
        return self.input_tokens + self.output_tokens


@dataclass
class StreamEvent:
    type: str
    data: Optional[dict] = None


class StreamEventType(Enum):
    TEXT = "text"
    TOOL_USE = "tool_use"
    TOOL_RESULT = "tool_result"
    DONE = "done"
    ERROR = "error"
    COST = "cost"
