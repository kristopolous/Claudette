"""Configuration management for tk-claudette."""

import json
import os
from pathlib import Path
from typing import Optional


DEFAULT_CONFIG_DIR = Path.home() / ".claude"
DEFAULT_SETTINGS_FILE = DEFAULT_CONFIG_DIR / "settings.json"

KNOWN_MODEL_COSTS = {
    "claude-sonnet-4-20250514": {"input": 3.0, "output": 15.0},
    "claude-opus-4-20250514": {"input": 15.0, "output": 75.0},
    "claude-3-5-sonnet-20241022": {"input": 3.0, "output": 15.0},
    "claude-3-haiku-20240307": {"input": 0.25, "output": 1.25},
    "gpt-4o": {"input": 2.5, "output": 10.0},
    "gpt-4o-mini": {"input": 0.15, "output": 0.6},
    "gpt-4-turbo": {"input": 10.0, "output": 30.0},
    "o1": {"input": 15.0, "output": 60.0},
    "o1-mini": {"input": 1.1, "output": 4.4},
    "o3-mini": {"input": 1.1, "output": 4.4},
    "deepseek-chat": {"input": 0.27, "output": 1.1},
    "deepseek-reasoner": {"input": 0.55, "output": 2.19},
    "llama-3.1-405b-instruct": {"input": 2.0, "output": 2.0},
    "mistral-large-latest": {"input": 2.0, "output": 6.0},
}


class Config:
    def __init__(self):
        self.api_key: Optional[str] = None
        self.api_base: str = ""
        self.model: str = ""
        self.max_turns: int = 50
        self.max_tokens: int = 8192
        self.temperature: float = 0.7
        self.permission_defaults: dict[str, str] = {}
        self.input_cost_per_million: float = 3.0
        self.output_cost_per_million: float = 15.0
        self._load()

    def _load(self):
        self.api_key = (
            os.environ.get("ANTHROPIC_API_KEY")
            or os.environ.get("OPENAI_API_KEY")
            or os.environ.get("OPENROUTER_API_KEY")
            or ""
        )
        self.api_base = os.environ.get("API_BASE", "")

        if DEFAULT_SETTINGS_FILE.exists():
            try:
                with open(DEFAULT_SETTINGS_FILE) as f:
                    data = json.load(f)
                self.api_key = data.get("api_key") or self.api_key
                self.api_base = data.get("api_base") or self.api_base
                self.model = data.get("model") or self.model
                self.max_turns = data.get("max_turns", self.max_turns)
                self.max_tokens = data.get("max_tokens", self.max_tokens)
                self.temperature = data.get("temperature", self.temperature)
                self.permission_defaults = data.get("permission_defaults", {})
            except (json.JSONDecodeError, IOError):
                pass

        if not self.api_base:
            self.api_base = "https://api.anthropic.com/v1"
        if not self.model:
            self.model = "claude-sonnet-4-20250514"

        self._update_costs()

    def _update_costs(self):
        costs = KNOWN_MODEL_COSTS.get(self.model, {})
        self.input_cost_per_million = costs.get("input", 3.0)
        self.output_cost_per_million = costs.get("output", 15.0)

    def save(self):
        DEFAULT_CONFIG_DIR.mkdir(parents=True, exist_ok=True)
        data = {
            "api_key": self.api_key,
            "api_base": self.api_base,
            "model": self.model,
            "max_turns": self.max_turns,
            "max_tokens": self.max_tokens,
            "temperature": self.temperature,
            "permission_defaults": self.permission_defaults,
        }
        with open(DEFAULT_SETTINGS_FILE, "w") as f:
            json.dump(data, f, indent=2)

    def set_model(self, model: str):
        self.model = model
        self._update_costs()
        self.save()

    def set_api_base(self, base: str):
        self.api_base = base.rstrip("/")
        self.save()

    def set_api_key(self, key: str):
        self.api_key = key
        self.save()
