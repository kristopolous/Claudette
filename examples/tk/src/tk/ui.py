"""Tkinter UI for tk-claudette."""

import tkinter as tk
from tkinter import ttk, messagebox, simpledialog
import asyncio
import threading
from typing import Optional
from tk.models import CostTracker

HOST_PRESETS = {
    "Anthropic": "https://api.anthropic.com/v1",
    "OpenAI": "https://api.openai.com/v1",
    "OpenRouter": "https://openrouter.ai/api/v1",
    "Ollama (local)": "http://localhost:11434/v1",
    "LiteLLM (local)": "http://localhost:4000",
    "Custom": "",
}

MODEL_PRESETS = {
    "https://api.anthropic.com/v1": [
        "claude-sonnet-4-20250514",
        "claude-opus-4-20250514",
        "claude-3-5-sonnet-20241022",
        "claude-3-haiku-20240307",
    ],
    "https://api.openai.com/v1": [
        "gpt-4o",
        "gpt-4o-mini",
        "gpt-4-turbo",
        "o1",
        "o1-mini",
        "o3-mini",
    ],
    "https://openrouter.ai/api/v1": [
        "anthropic/claude-sonnet-4",
        "anthropic/claude-opus",
        "openai/gpt-4o",
        "google/gemini-2.0-flash-exp:free",
        "meta-llama/llama-3.1-405b-instruct",
    ],
    "http://localhost:11434/v1": [
        "llama3",
        "llama3.1",
        "mistral",
        "codellama",
    ],
}


class PermissionDialog:
    def __init__(self, parent, tool_name: str, arguments: dict):
        self.result = None
        self.dialog = tk.Toplevel(parent)
        self.dialog.title("Permission Request")
        self.dialog.transient(parent)
        self.dialog.grab_set()
        self.dialog.resizable(False, False)

        x = parent.winfo_x() + 100
        y = parent.winfo_y() + 100
        self.dialog.geometry(f"+{x}+{y}")

        ttk.Label(self.dialog, text=f"Tool '{tool_name}' wants to run:", font=("TkDefaultFont", 10, "bold")).pack(padx=20, pady=(15, 5))

        args_text = "\n".join(f"  {k}: {v}" for k, v in arguments.items())
        ttk.Label(self.dialog, text=args_text, font=("TkFixedFont", 9)).pack(padx=20, pady=5)

        btn_frame = ttk.Frame(self.dialog)
        btn_frame.pack(pady=15)

        ttk.Button(btn_frame, text="Allow Once", command=self._allow_once).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Deny", command=self._deny).pack(side=tk.LEFT, padx=5)

        self.dialog.wait_window()

    def _allow_once(self):
        self.result = True
        self.dialog.destroy()

    def _deny(self):
        self.result = False
        self.dialog.destroy()


class CostDialog:
    def __init__(self, parent, cost_tracker: CostTracker):
        self.dialog = tk.Toplevel(parent)
        self.dialog.title("Cost Breakdown")
        self.dialog.transient(parent)
        self.dialog.grab_set()
        self.dialog.resizable(False, False)

        x = parent.winfo_x() + 100
        y = parent.winfo_y() + 100
        self.dialog.geometry(f"+{x}+{y}")

        ttk.Label(self.dialog, text="Session Cost", font=("TkDefaultFont", 12, "bold")).pack(padx=20, pady=(15, 10))

        info = [
            f"Input tokens:  {cost_tracker.input_tokens:,}",
            f"Output tokens: {cost_tracker.output_tokens:,}",
            f"Total tokens:  {cost_tracker.total_tokens:,}",
            "",
            f"Total cost:    ${cost_tracker.total_cost:.4f}",
        ]
        for line in info:
            ttk.Label(self.dialog, text=line, font=("TkFixedFont", 10)).pack(anchor=tk.W, padx=20)

        ttk.Button(self.dialog, text="Close", command=self.dialog.destroy).pack(pady=15)

        self.dialog.wait_window()


class MainWindow:
    def __init__(self, config, query_engine):
        self.config = config
        self.query_engine = query_engine
        self.root = tk.Tk()
        self.root.title("tk-claudette")
        self.root.geometry("900x700")
        self.root.minsize(600, 400)

        self._command_history = []
        self._history_index = -1
        self._is_processing = False

        self._build_ui()
        self._bind_events()
        self._sync_settings_to_ui()

    def _build_ui(self):
        self.root.columnconfigure(0, weight=1)
        self.root.rowconfigure(2, weight=1)

        menubar = tk.Menu(self.root)
        self.root.config(menu=menubar)

        file_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="File", menu=file_menu)
        file_menu.add_command(label="Clear", command=self._on_clear, accelerator="Ctrl+L")
        file_menu.add_separator()
        file_menu.add_command(label="Exit", command=self._on_exit, accelerator="Alt+F4")

        edit_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Edit", menu=edit_menu)
        edit_menu.add_command(label="Copy", command=self._on_copy, accelerator="Ctrl+C")
        edit_menu.add_command(label="Select All", command=self._on_select_all, accelerator="Ctrl+A")

        view_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="View", menu=view_menu)
        view_menu.add_command(label="Cost Breakdown", command=self._show_cost)
        view_menu.add_command(label="Configuration", command=self._show_config)

        help_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Help", menu=help_menu)
        help_menu.add_command(label="Help", command=self._show_help, accelerator="F1")
        help_menu.add_command(label="About", command=self._show_about)

        settings_frame = ttk.LabelFrame(self.root, text="Settings", padding=8)
        settings_frame.grid(row=0, column=0, sticky="ew", padx=5, pady=3)
        settings_frame.columnconfigure(1, weight=1)
        settings_frame.columnconfigure(3, weight=1)
        settings_frame.columnconfigure(5, weight=1)

        row = 0

        ttk.Label(settings_frame, text="Host:").grid(row=row, column=0, sticky=tk.W, padx=(0, 5))
        self.host_var = tk.StringVar()
        self.host_combo = ttk.Combobox(settings_frame, textvariable=self.host_var, values=list(HOST_PRESETS.keys()), width=18, state="readonly")
        self.host_combo.grid(row=row, column=1, sticky=tk.EW, padx=(0, 10))
        self.host_combo.bind("<<ComboboxSelected>>", self._on_host_selected)

        ttk.Label(settings_frame, text="Custom URL:").grid(row=row, column=2, sticky=tk.W, padx=(0, 5))
        self.custom_host_var = tk.StringVar()
        self.custom_host_entry = ttk.Entry(settings_frame, textvariable=self.custom_host_var, width=30)
        self.custom_host_entry.grid(row=row, column=3, sticky=tk.EW, padx=(0, 10))

        ttk.Label(settings_frame, text="Model:").grid(row=row, column=4, sticky=tk.W, padx=(0, 5))
        self.model_var = tk.StringVar()
        self.model_combo = ttk.Combobox(settings_frame, textvariable=self.model_var, width=28)
        self.model_combo.grid(row=row, column=5, sticky=tk.EW, padx=(0, 10))

        ttk.Label(settings_frame, text="API Key:").grid(row=row, column=6, sticky=tk.W, padx=(0, 5))
        self.key_var = tk.StringVar()
        self.key_entry = ttk.Entry(settings_frame, textvariable=self.key_var, width=22, show="*")
        self.key_entry.grid(row=row, column=7, sticky=tk.EW, padx=(0, 10))

        self.apply_btn = ttk.Button(settings_frame, text="Apply", command=self._apply_settings)
        self.apply_btn.grid(row=row, column=8, padx=(0, 5))

        self.toggle_key_btn = ttk.Button(settings_frame, text="Show", width=6, command=self._toggle_key_visibility)
        self.toggle_key_btn.grid(row=row, column=9)

        self.provider_label = ttk.Label(settings_frame, text="", foreground="gray", font=("TkDefaultFont", 8))
        self.provider_label.grid(row=row, column=10, padx=(10, 0))

        self.message_frame = ttk.Frame(self.root)
        self.message_frame.grid(row=1, column=0, sticky="nsew", padx=5, pady=3)
        self.message_frame.columnconfigure(0, weight=1)
        self.message_frame.rowconfigure(0, weight=1)

        self.message_text = tk.Text(
            self.message_frame,
            wrap=tk.WORD,
            state=tk.DISABLED,
            font=("TkFixedFont", 10),
            padx=5,
            pady=5,
        )
        scrollbar = ttk.Scrollbar(self.message_frame, orient=tk.VERTICAL, command=self.message_text.yview)
        self.message_text.configure(yscrollcommand=scrollbar.set)
        self.message_text.grid(row=0, column=0, sticky="nsew")
        scrollbar.grid(row=0, column=1, sticky="ns")

        self.message_text.tag_configure("user", foreground="blue", font=("TkFixedFont", 10, "bold"))
        self.message_text.tag_configure("assistant", foreground="black", font=("TkFixedFont", 10))
        self.message_text.tag_configure("tool", foreground="darkgreen", font=("TkFixedFont", 9))
        self.message_text.tag_configure("error", foreground="red", font=("TkFixedFont", 10))
        self.message_text.tag_configure("system", foreground="gray", font=("TkFixedFont", 9, "italic"))

        input_frame = ttk.Frame(self.root)
        input_frame.grid(row=2, column=0, sticky="ew", padx=5, pady=3)
        input_frame.columnconfigure(0, weight=1)

        self.input_text = tk.Text(input_frame, height=4, wrap=tk.WORD, font=("TkFixedFont", 10))
        input_scrollbar = ttk.Scrollbar(input_frame, orient=tk.VERTICAL, command=self.input_text.yview)
        self.input_text.configure(yscrollcommand=input_scrollbar.set)
        self.input_text.grid(row=0, column=0, sticky="nsew")
        input_scrollbar.grid(row=0, column=1, sticky="ns")

        btn_frame = ttk.Frame(self.root)
        btn_frame.grid(row=3, column=0, sticky="ew", padx=5, pady=(0, 5))

        self.send_btn = ttk.Button(btn_frame, text="Send (Enter)", command=self._on_send)
        self.send_btn.pack(side=tk.LEFT, padx=2)

        self.stop_btn = ttk.Button(btn_frame, text="Stop", command=self._on_stop, state=tk.DISABLED)
        self.stop_btn.pack(side=tk.LEFT, padx=2)

        ttk.Button(btn_frame, text="Clear", command=self._on_clear).pack(side=tk.LEFT, padx=2)

        self.status_bar = ttk.Frame(self.root)
        self.status_bar.grid(row=4, column=0, sticky="ew", padx=5, pady=2)

        self.cost_label = ttk.Label(self.status_bar, text="Cost: $0.0000", foreground="gray", font=("TkDefaultFont", 8))
        self.cost_label.pack(side=tk.LEFT)

        self.token_label = ttk.Label(self.status_bar, text="Tokens: 0", foreground="gray", font=("TkDefaultFont", 8))
        self.token_label.pack(side=tk.LEFT, padx=10)

        self.status_label = ttk.Label(self.status_bar, text="Ready", foreground="gray", font=("TkDefaultFont", 8))
        self.status_label.pack(side=tk.RIGHT)

    def _sync_settings_to_ui(self):
        base = self.config.api_base.rstrip("/")
        host_name = "Custom"
        for name, url in HOST_PRESETS.items():
            if url and url.rstrip("/") == base:
                host_name = name
                break
        self.host_var.set(host_name)
        self.custom_host_var.set(base if host_name == "Custom" else "")
        self.model_var.set(self.config.model)
        self.key_var.set(self.config.api_key or "")
        self._update_model_dropdown(base)
        self.provider_label.configure(text=f"[{self.query_engine.api_client.provider}]")

    def _update_model_dropdown(self, base_url: str):
        base_url = base_url.rstrip("/")
        models = MODEL_PRESETS.get(base_url, [])
        self.model_combo.configure(values=models)

    def _on_host_selected(self, event=None):
        name = self.host_var.get()
        url = HOST_PRESETS.get(name, "")
        if name == "Custom":
            self.custom_host_entry.configure(state=tk.NORMAL)
        else:
            self.custom_host_entry.configure(state=tk.DISABLED)
            self.custom_host_var.set(url)
        self._update_model_dropdown(url)

    def _toggle_key_visibility(self):
        showing = self.key_entry.cget("show") == ""
        self.key_entry.configure(show="" if showing else "*")
        self.toggle_key_btn.configure(text="Hide" if showing else "Show")

    def _apply_settings(self):
        host_url = self.custom_host_var.get().strip()
        if not host_url:
            self._append_message("error", "No API host URL set.")
            return

        model = self.model_var.get().strip()
        if not model:
            self._append_message("error", "No model name set.")
            return

        api_key = self.key_var.get().strip()
        if not api_key:
            self._append_message("error", "No API key set.")
            return

        old_base = self.config.api_base
        old_model = self.config.model

        self.config.set_api_base(host_url)
        self.config.set_model(model)
        self.config.set_api_key(api_key)

        self.query_engine.api_client.base_url = host_url.rstrip("/")
        self.query_engine.api_client.provider = self.query_engine.api_client.detect_provider(host_url)
        self.query_engine.api_client.model = model
        self.query_engine.api_client.api_key = api_key

        self.provider_label.configure(text=f"[{self.query_engine.api_client.provider}]")

        self._append_message("system", f"Settings applied: {self.query_engine.api_client.provider} / {model}")

    def _bind_events(self):
        self.input_text.bind("<Return>", self._on_return)
        self.input_text.bind("<Shift-Return>", self._on_shift_return)
        self.input_text.bind("<Up>", self._on_history_up)
        self.input_text.bind("<Down>", self._on_history_down)
        self.root.bind("<Control-c>", lambda e: self._on_stop())
        self.root.bind("<Control-l>", lambda e: self._on_clear())
        self.root.bind("<F1>", lambda e: self._show_help())
        self.root.protocol("WM_DELETE_WINDOW", self._on_exit)

    def _on_return(self, event):
        if not event.state & 0x1:
            self._on_send()
            return "break"

    def _on_shift_return(self, event):
        pass

    def _on_history_up(self, event):
        if self._command_history and self._history_index < len(self._command_history) - 1:
            self._history_index += 1
            self.input_text.delete("1.0", tk.END)
            self.input_text.insert("1.0", self._command_history[-(self._history_index + 1)])
        return "break"

    def _on_history_down(self, event):
        if self._history_index > 0:
            self._history_index -= 1
            self.input_text.delete("1.0", tk.END)
            self.input_text.insert("1.0", self._command_history[-(self._history_index + 1)])
        else:
            self._history_index = -1
            self.input_text.delete("1.0", tk.END)
        return "break"

    def _append_message(self, role: str, content: str):
        self.message_text.configure(state=tk.NORMAL)
        prefix_map = {
            "user": "You",
            "assistant": "Claudette",
            "tool": "[Tool]",
            "error": "[Error]",
            "system": "[System]",
        }
        prefix = prefix_map.get(role, role)
        tag = role if role in ("user", "assistant", "tool", "error", "system") else "assistant"

        self.message_text.insert(tk.END, f"\n{prefix}:\n", tag)
        self.message_text.insert(tk.END, f"{content}\n", tag)
        self.message_text.see(tk.END)
        self.message_text.configure(state=tk.DISABLED)

    def _append_streaming(self, text: str):
        self.message_text.configure(state=tk.NORMAL)
        last_tag = self.message_text.tag_names(tk.END + "-2c")
        if "streaming" not in last_tag:
            self.message_text.insert(tk.END, text, ("assistant", "streaming"))
        else:
            self.message_text.insert(tk.END, text, "streaming")
        self.message_text.see(tk.END)
        self.message_text.configure(state=tk.DISABLED)

    def _set_streaming_mode(self, active: bool):
        if active:
            self.message_text.configure(state=tk.NORMAL)
            self.message_text.insert(tk.END, "\nClaudette:\n", "assistant")
            self.message_text.see(tk.END)
            self.message_text.configure(state=tk.DISABLED)

    def _on_send(self):
        if self._is_processing:
            return
        user_input = self.input_text.get("1.0", tk.END).strip()
        if not user_input:
            return
        self.input_text.delete("1.0", tk.END)
        self._command_history.append(user_input)
        self._history_index = -1

        if user_input.startswith("/"):
            self._handle_command(user_input)
            return

        self._is_processing = True
        self.send_btn.configure(state=tk.DISABLED)
        self.stop_btn.configure(state=tk.NORMAL)
        self.status_label.configure(text="Thinking...")

        self._append_message("user", user_input)
        self._set_streaming_mode(True)

        self.query_engine.on_text = self._on_text_chunk
        self.query_engine.on_tool_start = self._on_tool_start
        self.query_engine.on_tool_result = self._on_tool_result
        self.query_engine.on_done = self._on_done
        self.query_engine.on_error = self._on_error
        self.query_engine.on_cost_update = self._on_cost_update

        def run_async():
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            try:
                async def main():
                    async for event in self.query_engine.submit(user_input):
                        pass
                loop.run_until_complete(main())
            finally:
                loop.close()
            self.root.after(0, self._on_done)

        threading.Thread(target=run_async, daemon=True).start()

    def _on_text_chunk(self, text: str):
        self.root.after(0, lambda: self._append_streaming(text))

    def _on_tool_start(self, name: str, args: dict):
        self.root.after(0, lambda: self._append_message("tool", f"Running {name}..."))

    def _on_tool_result(self, name: str, result: str):
        preview = result[:500] + "..." if len(result) > 500 else result
        self.root.after(0, lambda: self._append_message("tool", f"{name} result:\n{preview}"))

    def _on_done(self):
        self._is_processing = False
        self.send_btn.configure(state=tk.NORMAL)
        self.stop_btn.configure(state=tk.DISABLED)
        self.status_label.configure(text="Ready")

    def _on_error(self, error: str):
        self.root.after(0, lambda: self._append_message("error", error))
        self._on_done()

    def _on_cost_update(self, tracker: CostTracker):
        self.root.after(0, lambda: self._update_cost(tracker))

    def _update_cost(self, tracker: CostTracker):
        self.cost_label.configure(text=f"Cost: ${tracker.total_cost:.4f}")
        self.token_label.configure(text=f"Tokens: {tracker.total_tokens:,}")

    def _on_stop(self):
        self.query_engine.request_stop()
        self.status_label.configure(text="Stopping...")

    def _on_clear(self):
        self.query_engine.clear()
        self.message_text.configure(state=tk.NORMAL)
        self.message_text.delete("1.0", tk.END)
        self.message_text.configure(state=tk.DISABLED)
        self.status_label.configure(text="Cleared")

    def _handle_command(self, cmd: str):
        parts = cmd.split(maxsplit=1)
        command = parts[0].lower()
        args = parts[1] if len(parts) > 1 else ""

        if command == "/help":
            help_text = """Available commands:
/help          - Show this help
/clear         - Clear conversation
/model <name>  - Change model
/host <url>    - Change API host
/key <key>     - Change API key
/cost          - Show cost breakdown
/config        - Show configuration"""
            self._append_message("system", help_text)

        elif command == "/clear":
            self._on_clear()

        elif command == "/model":
            if args.strip():
                new_model = args.strip()
                self.config.set_model(new_model)
                self.model_var.set(new_model)
                self.query_engine.api_client.model = new_model
                self._append_message("system", f"Model changed to: {new_model}")

        elif command == "/host":
            if args.strip():
                new_host = args.strip()
                self.config.set_api_base(new_host)
                self.query_engine.api_client.base_url = new_host.rstrip("/")
                self.query_engine.api_client.provider = self.query_engine.api_client.detect_provider(new_host)
                self.custom_host_var.set(new_host)
                self.provider_label.configure(text=f"[{self.query_engine.api_client.provider}]")
                self._append_message("system", f"Host changed to: {new_host}")

        elif command == "/key":
            if args.strip():
                new_key = args.strip()
                self.config.set_api_key(new_key)
                self.key_var.set(new_key)
                self.query_engine.api_client.api_key = new_key
                self._append_message("system", "API key updated")

        elif command == "/cost":
            CostDialog(self.root, self.query_engine.cost_tracker)

        elif command == "/config":
            config_text = f"""Configuration:
Model:       {self.config.model}
API Base:    {self.config.api_base}
Max Tokens:  {self.config.max_tokens}
Max Turns:   {self.config.max_turns}
Temperature: {self.config.temperature}
CWD:         {self.query_engine.cwd}"""
            self._append_message("system", config_text)

        else:
            self._append_message("error", f"Unknown command: {command}. Type /help for available commands.")

    def run(self):
        self.root.mainloop()
