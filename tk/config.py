"""Configuration management for tk-claudette."""

import json
import os
from pathlib import Path
from typing import Optional


DEFAULT_CONFIG_DIR = Path.home() / ".claude"
DEFAULT_SETTINGS_FILE = DEFAULT_CONFIG_DIR / "settings.json"

MODEL_COSTS = {
    "claude-sonnet-4-20250514": {"input": 3.0, "output": 15.0},
    "claude-opus-4-20250514": {"input": 15.0, "output": 75.0},
    "claude-3-5-sonnet-20241022": {"input": 3.0, "output": 15.0},
    "claude-3-haiku-20240307": {"input": 0.25, "output": 1.25},
    "gpt-4o": {"input": 2.5, "output": 10.0},
    "gpt-4o-mini": {"input": 0.15, "output": 0.6},
    "gpt-4-turbo": {"input": 10.0, "output": 30.0},
}

DEFAULT_MODEL = "claude-sonnet-4-20250514"
DEFAULT_API_BASE = "https://api.anthropic.com/v1"


class Config:
    def __init__(self):
        self.api_key: Optional[str] = None
        self.api_base: str = DEFAULT_API_BASE
        self.model: str = DEFAULT_MODEL
        self.max_turns: int = 50
        self.max_tokens: int = 8192
        self.temperature: float = 0.7
        self.permission_defaults: dict[str, str] = {}
        self.input_cost_per_million: float = 3.0
        self.output_cost_per_million: float = 15.0
        self._load()

    def _load(self):
        self.api_key = os.environ.get("ANTHROPIC_API_KEY") or os.environ.get("OPENAI_API_KEY", "")

        if DEFAULT_SETTINGS_FILE.exists():
            try:
                with open(DEFAULT_SETTINGS_FILE) as f:
                    data = json.load(f)
                self.api_key = data.get("api_key") or self.api_key
                self.api_base = data.get("api_base", self.api_base)
                self.model = data.get("model", self.model)
                self.max_turns = data.get("max_turns", self.max_turns)
                self.max_tokens = data.get("max_tokens", self.max_tokens)
                self.temperature = data.get("temperature", self.temperature)
                self.permission_defaults = data.get("permission_defaults", {})
                costs = MODEL_COSTS.get(self.model, {})
                self.input_cost_per_million = costs.get("input", 3.0)
                self.output_cost_per_million = costs.get("output", 15.0)
            except (json.JSONDecodeError, IOError):
                pass

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

    @property
    def available_models(self) -> list[str]:
        return list(MODEL_COSTS.keys())

    def set_model(self, model: str):
        self.model = model
        costs = MODEL_COSTS.get(model, {})
        self.input_cost_per_million = costs.get("input", 3.0)
        self.output_cost_per_million = costs.get("output", 15.0)
        self.save()
