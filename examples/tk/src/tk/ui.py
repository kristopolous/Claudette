"""Tkinter UI for tk-claudette."""

import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import asyncio
import threading
import json
from pathlib import Path
from typing import Optional
from tk.models import CostTracker
from tk.api import detect_provider

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

ICON_NEW = "\U0001f4c4"
ICON_OPEN = "\U0001f4c2"
ICON_SAVE = "\U0001f4be"
ICON_TOOLS = "\U0001f527"
ICON_MCP = "\U0001f50c"
ICON_SETTINGS = "\u2699"
ICON_COST = "\U0001f4b0"


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


class ConnectionDialog:
    def __init__(self, parent, config, query_engine):
        self.config = config
        self.query_engine = query_engine
        self.result = False
        self.dialog = tk.Toplevel(parent)
        self.dialog.title("Connection Settings")
        self.dialog.transient(parent)
        self.dialog.grab_set()
        self.dialog.resizable(False, False)
        self.dialog.withdraw()

        self._build_ui()
        self._sync_to_ui()

        self.dialog.update_idletasks()
        w = min(self.dialog.winfo_reqwidth() + 40, parent.winfo_screenwidth() - 100)
        h = min(self.dialog.winfo_reqheight() + 40, parent.winfo_screenheight() - 100)
        x = parent.winfo_x() + 50
        y = parent.winfo_y() + 50
        self.dialog.geometry(f"{w}x{h}+{x}+{y}")
        self.dialog.deiconify()

        self.dialog.wait_window()

    def _build_ui(self):
        self.dialog.columnconfigure(1, weight=1)

        frame = ttk.Frame(self.dialog, padding=20)
        frame.grid(row=0, column=0, sticky="nsew")
        frame.columnconfigure(1, weight=1)

        row = 0

        ttk.Label(frame, text="Host Preset:").grid(row=row, column=0, sticky=tk.W, pady=8)
        self.host_var = tk.StringVar()
        self.host_combo = ttk.Combobox(frame, textvariable=self.host_var, values=list(HOST_PRESETS.keys()), width=40, state="readonly")
        self.host_combo.grid(row=row, column=1, sticky=tk.EW, pady=8, padx=(10, 0))
        self.host_combo.bind("<<ComboboxSelected>>", self._on_host_selected)

        row += 1

        ttk.Label(frame, text="API Base URL:").grid(row=row, column=0, sticky=tk.W, pady=8)
        url_frame = ttk.Frame(frame)
        url_frame.grid(row=row, column=1, sticky=tk.EW, pady=8, padx=(10, 0))
        url_frame.columnconfigure(0, weight=1)

        self.base_url_var = tk.StringVar()
        self.base_url_entry = ttk.Entry(url_frame, textvariable=self.base_url_var, width=50)
        self.base_url_entry.grid(row=0, column=0, sticky=tk.EW, padx=(0, 5))

        self.get_models_btn = ttk.Button(url_frame, text="Get Models", command=self._fetch_models, width=12)
        self.get_models_btn.grid(row=0, column=1)

        row += 1

        ttk.Label(frame, text="Model:").grid(row=row, column=0, sticky=tk.W, pady=8)
        self.model_var = tk.StringVar()
        self.model_combo = ttk.Combobox(frame, textvariable=self.model_var, width=40)
        self.model_combo.grid(row=row, column=1, sticky=tk.EW, pady=8, padx=(10, 0))

        row += 1

        ttk.Label(frame, text="API Key:").grid(row=row, column=0, sticky=tk.W, pady=8)
        key_frame = ttk.Frame(frame)
        key_frame.grid(row=row, column=1, sticky=tk.EW, pady=8, padx=(10, 0))
        key_frame.columnconfigure(0, weight=1)

        self.key_var = tk.StringVar()
        self.key_entry = ttk.Entry(key_frame, textvariable=self.key_var, show="*")
        self.key_entry.grid(row=0, column=0, sticky=tk.EW, padx=(0, 5))

        self.toggle_btn = ttk.Button(key_frame, text="Show", width=6, command=self._toggle_key)
        self.toggle_btn.grid(row=0, column=1)

        row += 1

        self.status_label = ttk.Label(frame, text="", foreground="gray", font=("TkDefaultFont", 9))
        self.status_label.grid(row=row, column=0, columnspan=2, pady=(10, 0))

        row += 1

        btn_frame = ttk.Frame(frame)
        btn_frame.grid(row=row, column=0, columnspan=2, pady=(20, 0))
        ttk.Button(btn_frame, text="Apply", command=self._apply, width=12).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Cancel", command=self.dialog.destroy, width=12).pack(side=tk.LEFT, padx=5)

    def _sync_to_ui(self):
        base = self.config.api_base.rstrip("/")
        host_name = "Custom"
        for name, url in HOST_PRESETS.items():
            if url and url.rstrip("/") == base:
                host_name = name
                break
        self.host_var.set(host_name)
        self.base_url_var.set(base)
        self.model_var.set(self.config.model)
        self.key_var.set(self.config.api_key or "")
        self._update_model_dropdown(base)

    def _update_model_dropdown(self, base_url):
        base_url = base_url.rstrip("/")
        models = MODEL_PRESETS.get(base_url, [])
        self.model_combo.configure(values=models)

    def _on_host_selected(self, event=None):
        name = self.host_var.get()
        url = HOST_PRESETS.get(name, "")
        if name == "Custom":
            self.base_url_entry.configure(state=tk.NORMAL)
        else:
            self.base_url_entry.configure(state=tk.DISABLED)
            self.base_url_var.set(url)
        self._update_model_dropdown(url)

    def _toggle_key(self):
        showing = self.key_entry.cget("show") == ""
        self.key_entry.configure(show="" if showing else "*")
        self.toggle_btn.configure(text="Hide" if showing else "Show")

    def _apply(self):
        host_url = self.base_url_var.get().strip()
        model = self.model_var.get().strip()
        api_key = self.key_var.get().strip()

        if not host_url:
            self.status_label.configure(text="Error: API Base URL is required", foreground="red")
            return
        if not model:
            self.status_label.configure(text="Error: Model is required", foreground="red")
            return
        if not api_key:
            self.status_label.configure(text="Error: API Key is required", foreground="red")
            return

        self.config.set_api_base(host_url)
        self.config.set_model(model)
        self.config.set_api_key(api_key)

        self.query_engine.api_client.base_url = host_url.rstrip("/")
        self.query_engine.api_client.provider = detect_provider(host_url)
        self.query_engine.api_client.model = model
        self.query_engine.api_client.api_key = api_key

        self.status_label.configure(text="Settings applied successfully", foreground="green")
        self.result = True

    def _fetch_models(self):
        base_url = self.base_url_var.get().strip()
        api_key = self.key_var.get().strip()

        if not base_url:
            self.status_label.configure(text="Enter an API base URL first", foreground="red")
            return

        self.status_label.configure(text="Fetching models...", foreground="gray")
        self.get_models_btn.configure(state=tk.DISABLED)

        def do_fetch():
            try:
                import httpx
                url = base_url.rstrip("/") + "/models"
                headers = {"Authorization": f"Bearer {api_key}"} if api_key else {}
                resp = httpx.get(url, headers=headers, timeout=15.0)
                resp.raise_for_status()
                data = resp.json()
                models = []
                if isinstance(data, dict) and "data" in data:
                    for item in data["data"]:
                        if isinstance(item, dict):
                            models.append(item.get("id", ""))
                elif isinstance(data, list):
                    for item in data:
                        if isinstance(item, dict):
                            models.append(item.get("id", str(item)))
                        else:
                            models.append(str(item))
                models = [m for m in models if m]
                models.sort()
                self.dialog.after(0, lambda: self._on_models_fetched(models))
            except Exception as e:
                self.dialog.after(0, lambda: self._on_models_fetch_failed(str(e)))

        threading.Thread(target=do_fetch, daemon=True).start()

    def _on_models_fetched(self, models):
        self.model_combo.configure(values=models)
        self.status_label.configure(text=f"Found {len(models)} models", foreground="green")
        self.get_models_btn.configure(state=tk.NORMAL)

    def _on_models_fetch_failed(self, error):
        self.status_label.configure(text=f"Failed to fetch models: {error[:100]}", foreground="red")
        self.get_models_btn.configure(state=tk.NORMAL)


class ToolsDialog:
    def __init__(self, parent, tool_registry, mcp_manager=None):
        self.registry = tool_registry
        self.mcp_manager = mcp_manager
        self.result = False
        self.dialog = tk.Toplevel(parent)
        self.dialog.title("Tools")
        self.dialog.transient(parent)
        self.dialog.grab_set()
        self.dialog.resizable(False, False)

        self._build_ui()

        self.dialog.update_idletasks()
        w = min(self.dialog.winfo_reqwidth() + 40, parent.winfo_screenwidth() - 100)
        h = min(self.dialog.winfo_reqheight() + 40, parent.winfo_screenheight() - 100)
        x = parent.winfo_x() + 50
        y = parent.winfo_y() + 50
        self.dialog.geometry(f"{w}x{h}+{x}+{y}")

        self.dialog.wait_window()

    def _build_ui(self):
        self.dialog.columnconfigure(0, weight=1)
        self.dialog.rowconfigure(0, weight=1)

        frame = ttk.Frame(self.dialog, padding=15)
        frame.grid(row=0, column=0, sticky="nsew")
        frame.columnconfigure(0, weight=1)
        frame.rowconfigure(0, weight=1)

        ttk.Label(frame, text="Built-in Tools", font=("TkDefaultFont", 11, "bold")).grid(row=0, column=0, sticky=tk.W, pady=(0, 5))

        builtin_frame = ttk.Frame(frame)
        builtin_frame.grid(row=1, column=0, sticky="nsew", pady=(0, 10))
        builtin_frame.columnconfigure(0, weight=1)
        builtin_frame.rowconfigure(0, weight=1)

        columns = ("name", "status")
        self.tree = ttk.Treeview(builtin_frame, columns=columns, show="headings", height=6)
        self.tree.heading("name", text="Tool")
        self.tree.heading("status", text="Status")
        self.tree.column("name", width=200)
        self.tree.column("status", width=100)

        scrollbar = ttk.Scrollbar(builtin_frame, orient=tk.VERTICAL, command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        self.tree.grid(row=0, column=0, sticky="nsew")
        scrollbar.grid(row=0, column=1, sticky="ns")

        ttk.Separator(frame, orient=tk.HORIZONTAL).grid(row=2, column=0, sticky="ew", pady=5)

        ttk.Label(frame, text="MCP Tools", font=("TkDefaultFont", 11, "bold")).grid(row=3, column=0, sticky=tk.W, pady=(5, 5))

        mcp_frame = ttk.Frame(frame)
        mcp_frame.grid(row=4, column=0, sticky="nsew", pady=(0, 10))
        mcp_frame.columnconfigure(0, weight=1)
        mcp_frame.rowconfigure(0, weight=1)

        self.mcp_tree = ttk.Treeview(mcp_frame, columns=("name", "server", "status"), show="headings", height=6)
        self.mcp_tree.heading("name", text="Tool")
        self.mcp_tree.heading("server", text="Server")
        self.mcp_tree.heading("status", text="Status")
        self.mcp_tree.column("name", width=180)
        self.mcp_tree.column("server", width=120)
        self.mcp_tree.column("status", width=100)

        mcp_scrollbar = ttk.Scrollbar(mcp_frame, orient=tk.VERTICAL, command=self.mcp_tree.yview)
        self.mcp_tree.configure(yscrollcommand=mcp_scrollbar.set)
        self.mcp_tree.grid(row=0, column=0, sticky="nsew")
        mcp_scrollbar.grid(row=0, column=1, sticky="ns")

        btn_frame = ttk.Frame(frame)
        btn_frame.grid(row=5, column=0)
        ttk.Button(btn_frame, text="Enable All", command=self._enable_all).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Disable All", command=self._disable_all).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Close", command=self.dialog.destroy).pack(side=tk.LEFT, padx=5)

        self._populate_tools()
        self._populate_mcp_tools()

    def _populate_tools(self):
        for item in self.tree.get_children():
            self.tree.delete(item)
        for tool_name, enabled in self.registry.get_tool_states().items():
            status = "Enabled" if enabled else "Disabled"
            self.tree.insert("", tk.END, values=(tool_name, status))

    def _populate_mcp_tools(self):
        for item in self.mcp_tree.get_children():
            self.mcp_tree.delete(item)
        if self.mcp_manager:
            for server in self.mcp_manager.get_servers():
                server_name = server.get("name", "")
                tools = self.mcp_manager.get_server_tools(server_name)
                if tools:
                    for t in tools:
                        self.mcp_tree.insert("", tk.END, values=(t.display_name or t.name, server_name, "Available"))
                else:
                    self.mcp_tree.insert("", tk.END, values=("(not connected)", server_name, "Disconnected"))
        else:
            self.mcp_tree.insert("", tk.END, values=("(no MCP servers configured)", "", ""))

    def _enable_all(self):
        self.registry.enable_all()
        self._populate_tools()

    def _disable_all(self):
        self.registry.disable_all()
        self._populate_tools()
        self._populate_mcp_tools()

    def _populate_tools(self):
        for item in self.tree.get_children():
            self.tree.delete(item)
        for tool_name, enabled in self.registry.get_tool_states().items():
            status = "Enabled" if enabled else "Disabled"
            self.tree.insert("", tk.END, values=(tool_name, status))

    def _populate_mcp_tools(self):
        for item in self.mcp_tree.get_children():
            self.mcp_tree.delete(item)
        if self.mcp_manager:
            for server in self.mcp_manager.get_servers():
                server_name = server.get("name", "")
                tools = self.mcp_manager.get_server_tools(server_name)
                if tools:
                    for t in tools:
                        self.mcp_tree.insert("", tk.END, values=(t.display_name or t.name, server_name, "Available"))
                else:
                    self.mcp_tree.insert("", tk.END, values=("(not connected)", server_name, "Disconnected"))
        else:
            self.mcp_tree.insert("", tk.END, values=("(no MCP servers configured)", "", ""))

    def _enable_all(self):
        self.registry.enable_all()
        self._populate_tools()

    def _disable_all(self):
        self.registry.disable_all()
        self._populate_tools()


class McpServersDialog:
    def __init__(self, parent, mcp_manager):
        self.manager = mcp_manager
        self.result = False
        self.dialog = tk.Toplevel(parent)
        self.dialog.title("MCP Servers")
        self.dialog.transient(parent)
        self.dialog.grab_set()
        self.dialog.resizable(False, False)

        self._build_ui()

        self.dialog.update_idletasks()
        w = min(self.dialog.winfo_reqwidth() + 40, parent.winfo_screenwidth() - 100)
        h = min(self.dialog.winfo_reqheight() + 40, parent.winfo_screenheight() - 100)
        x = parent.winfo_x() + 50
        y = parent.winfo_y() + 50
        self.dialog.geometry(f"{w}x{h}+{x}+{y}")

        self.dialog.wait_window()

    def _build_ui(self):
        self.dialog.columnconfigure(0, weight=1)
        self.dialog.rowconfigure(0, weight=1)

        frame = ttk.Frame(self.dialog, padding=15)
        frame.grid(row=0, column=0, sticky="nsew")
        frame.columnconfigure(0, weight=1)
        frame.rowconfigure(1, weight=1)

        header = ttk.Frame(frame)
        header.grid(row=0, column=0, sticky="ew", pady=(0, 10))

        ttk.Label(header, text="MCP Servers", font=("TkDefaultFont", 11, "bold")).pack(side=tk.LEFT)
        ttk.Button(header, text="Add Server", command=self._add_server).pack(side=tk.RIGHT)

        list_frame = ttk.Frame(frame)
        list_frame.grid(row=1, column=0, sticky="nsew", pady=(0, 15))
        list_frame.columnconfigure(0, weight=1)
        list_frame.rowconfigure(0, weight=1)

        columns = ("name", "transport", "status", "tools")
        self.tree = ttk.Treeview(list_frame, columns=columns, show="headings", height=12)
        self.tree.heading("name", text="Server")
        self.tree.heading("transport", text="Transport")
        self.tree.heading("status", text="Status")
        self.tree.heading("tools", text="Tools")
        self.tree.column("name", width=150)
        self.tree.column("transport", width=80)
        self.tree.column("status", width=80)
        self.tree.column("tools", width=60)

        scrollbar = ttk.Scrollbar(list_frame, orient=tk.VERTICAL, command=self.tree.yview)
        self.tree.configure(yscrollcommand=scrollbar.set)
        self.tree.grid(row=0, column=0, sticky="nsew")
        scrollbar.grid(row=0, column=1, sticky="ns")

        self.tree.bind("<Double-1>", self._edit_server)

        btn_frame = ttk.Frame(frame)
        btn_frame.grid(row=2, column=0)
        ttk.Button(btn_frame, text="Connect", command=self._connect_server).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Edit", command=self._edit_server).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Remove", command=self._remove_server).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Refresh", command=self._refresh).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Close", command=self.dialog.destroy).pack(side=tk.LEFT, padx=5)

        self._populate_servers()

    def _populate_servers(self):
        for item in self.tree.get_children():
            self.tree.delete(item)
        for server in self.manager.get_servers():
            self.tree.insert("", tk.END, values=(
                server.get("name", ""),
                server.get("transport", "stdio"),
                server.get("status", "disconnected"),
                str(server.get("tool_count", 0)),
            ))

    def _connect_server(self):
        sel = self.tree.selection()
        if not sel:
            return
        item = self.tree.item(sel[0])
        name = item["values"][0]
        server = self.manager.get_server(name)
        if not server:
            return

        # Create a temporary status label below the button frame
        self.status_var = tk.StringVar(value="Connecting...")
        status_lbl = ttk.Label(self.dialog, textvariable=self.status_var, foreground="gray")
        status_lbl.grid(row=4, column=0, sticky="w", pady=5)

        def do_connect():
            try:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
                result = loop.run_until_complete(self.manager.connect_server(server))
                loop.close()
                self.dialog.after(0, lambda: self._on_connected(result, status_lbl))
            except Exception as e:
                self.dialog.after(0, lambda: self._on_connect_failed(str(e), status_lbl))

        threading.Thread(target=do_connect, daemon=True).start()

    def _on_connected(self, result, label):
        label.destroy()
        self._populate_servers()
        color = "green" if "Connected" in result else "red"
        self.status_var = tk.StringVar(value=result)
        ttk.Label(self.dialog, textvariable=self.status_var, foreground=color).grid(row=4, column=0, sticky="w", pady=5)

    def _on_connect_failed(self, error, label):
        label.destroy()
        self.status_var = tk.StringVar(value=f"Error: {error}")
        ttk.Label(self.dialog, textvariable=self.status_var, foreground="red").grid(row=4, column=0, sticky="w", pady=5)

    def _add_server(self):
        dlg = AddMcpServerDialog(self.dialog)
        if dlg.result:
            self.manager.add_server(dlg.result)
            self._populate_servers()

    def _edit_server(self, event=None):
        sel = self.tree.selection()
        if not sel:
            return
        item = self.tree.item(sel[0])
        name = item["values"][0]
        server = self.manager.get_server(name)
        if not server:
            return
        dlg = EditMcpServerDialog(self.dialog, server)
        if dlg.result:
            self.manager.update_server(name, dlg.result)
            self._populate_servers()

    def _remove_server(self):
        sel = self.tree.selection()
        if not sel:
            return
        item = self.tree.item(sel[0])
        name = item["values"][0]
        if messagebox.askyesno("Remove Server", f"Remove MCP server '{name}'?"):
            self.manager.remove_server(name)
            self._populate_servers()

    def _refresh(self):
        self._populate_servers()


class AddMcpServerDialog:
    TEMPLATE = json.dumps({
        "name": "my-server",
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"],
        "env": {
            "API_KEY": "",
        },
    }, indent=2)

    def __init__(self, parent):
        self.result = None
        self.dialog = tk.Toplevel(parent)
        self.dialog.title("Add MCP Server")
        self.dialog.transient(parent)
        self.dialog.grab_set()
        self.dialog.resizable(True, True)

        self._build_ui()

        self.dialog.update_idletasks()
        w = min(self.dialog.winfo_reqwidth() + 40, 650)
        h = min(self.dialog.winfo_reqheight() + 40, 500)
        x = parent.winfo_x() + 50
        y = parent.winfo_y() + 50
        self.dialog.geometry(f"{w}x{h}+{x}+{y}")

        self.dialog.wait_window()

    def _build_ui(self):
        self.dialog.columnconfigure(0, weight=1)
        self.dialog.rowconfigure(0, weight=1)

        frame = ttk.Frame(self.dialog, padding=15)
        frame.grid(row=0, column=0, sticky="nsew")
        frame.columnconfigure(0, weight=1)
        frame.rowconfigure(0, weight=1)

        ttk.Label(frame, text="Server Configuration (JSON)", font=("TkDefaultFont", 10, "bold")).grid(row=0, column=0, sticky=tk.W, pady=(0, 5))

        self.text = tk.Text(frame, font=("TkFixedFont", 10), wrap=tk.NONE, height=15, width=60)
        self.text.insert("1.0", self.TEMPLATE)
        self.text.grid(row=1, column=0, sticky="nsew", pady=(0, 10))

        text_scroll = ttk.Scrollbar(frame, orient=tk.VERTICAL, command=self.text.yview)
        text_scroll.grid(row=1, column=1, sticky="ns", pady=(0, 10))
        self.text.configure(yscrollcommand=text_scroll.set)

        self.error_label = ttk.Label(frame, text="", foreground="red", font=("TkDefaultFont", 9))
        self.error_label.grid(row=2, column=0, sticky=tk.W)

        btn_frame = ttk.Frame(frame)
        btn_frame.grid(row=3, column=0, sticky=tk.E)
        ttk.Button(btn_frame, text="Add", command=self._ok, width=10).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Cancel", command=self.dialog.destroy, width=10).pack(side=tk.LEFT, padx=5)

    def _ok(self):
        raw = self.text.get("1.0", tk.END).strip()
        try:
            config = json.loads(raw)
        except json.JSONDecodeError as e:
            self.error_label.configure(text=f"Invalid JSON: {e}")
            return

        if not config.get("name"):
            self.error_label.configure(text="'name' is required")
            return
        if not config.get("transport"):
            self.error_label.configure(text="'transport' is required (stdio, sse, or http)")
            return

        transport = config["transport"]
        if transport == "stdio" and not config.get("command"):
            self.error_label.configure(text="'command' is required for stdio transport")
            return
        if transport in ("sse", "http") and not config.get("url"):
            self.error_label.configure(text="'url' is required for {transport} transport")
            return

        config.setdefault("enabled", True)
        self.result = config
        self.dialog.destroy()


class EditMcpServerDialog:
    def __init__(self, parent, server: dict):
        self.server = server
        self.result = None
        self.dialog = tk.Toplevel(parent)
        self.dialog.title("Edit MCP Server")
        self.dialog.transient(parent)
        self.dialog.grab_set()
        self.dialog.resizable(True, True)

        self._build_ui()

        self.dialog.update_idletasks()
        w = min(self.dialog.winfo_reqwidth() + 40, 650)
        h = min(self.dialog.winfo_reqheight() + 40, 500)
        x = parent.winfo_x() + 50
        y = parent.winfo_y() + 50
        self.dialog.geometry(f"{w}x{h}+{x}+{y}")

        self.dialog.wait_window()

    def _build_ui(self):
        self.dialog.columnconfigure(0, weight=1)
        self.dialog.rowconfigure(0, weight=1)

        frame = ttk.Frame(self.dialog, padding=15)
        frame.grid(row=0, column=0, sticky="nsew")
        frame.columnconfigure(0, weight=1)
        frame.rowconfigure(0, weight=1)

        ttk.Label(frame, text="Server Configuration (JSON)", font=("TkDefaultFont", 10, "bold")).grid(row=0, column=0, sticky=tk.W, pady=(0, 5))

        self.text = tk.Text(frame, font=("TkFixedFont", 10), wrap=tk.NONE, height=15, width=60)
        display = {k: v for k, v in self.server.items() if k not in ("status", "tool_count")}
        self.text.insert("1.0", json.dumps(display, indent=2))
        self.text.grid(row=1, column=0, sticky="nsew", pady=(0, 10))

        text_scroll = ttk.Scrollbar(frame, orient=tk.VERTICAL, command=self.text.yview)
        text_scroll.grid(row=1, column=1, sticky="ns", pady=(0, 10))
        self.text.configure(yscrollcommand=text_scroll.set)

        self.error_label = ttk.Label(frame, text="", foreground="red", font=("TkDefaultFont", 9))
        self.error_label.grid(row=2, column=0, sticky=tk.W)

        btn_frame = ttk.Frame(frame)
        btn_frame.grid(row=3, column=0, sticky=tk.E)
        ttk.Button(btn_frame, text="Save", command=self._ok, width=10).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Cancel", command=self.dialog.destroy, width=10).pack(side=tk.LEFT, padx=5)

    def _ok(self):
        raw = self.text.get("1.0", tk.END).strip()
        try:
            config = json.loads(raw)
        except json.JSONDecodeError as e:
            self.error_label.configure(text=f"Invalid JSON: {e}")
            return

        if not config.get("name"):
            self.error_label.configure(text="'name' is required")
            return

        config.setdefault("enabled", True)
        self.result = config
        self.dialog.destroy()


class EditMcpServerDialog:
    def __init__(self, parent, server: dict):
        self.server = server
        self.result = None
        self.dialog = tk.Toplevel(parent)
        self.dialog.title("Edit MCP Server")
        self.dialog.transient(parent)
        self.dialog.grab_set()
        self.dialog.resizable(True, True)

        self._build_ui()

        self.dialog.update_idletasks()
        w = min(self.dialog.winfo_reqwidth() + 40, 650)
        h = min(self.dialog.winfo_reqheight() + 40, 500)
        x = parent.winfo_x() + 50
        y = parent.winfo_y() + 50
        self.dialog.geometry(f"{w}x{h}+{x}+{y}")

        self.dialog.wait_window()

    def _build_ui(self):
        self.dialog.columnconfigure(0, weight=1)
        self.dialog.rowconfigure(0, weight=1)

        frame = ttk.Frame(self.dialog, padding=15)
        frame.grid(row=0, column=0, sticky="nsew")
        frame.columnconfigure(0, weight=1)
        frame.rowconfigure(0, weight=1)

        ttk.Label(frame, text="Server Configuration (JSON)", font=("TkDefaultFont", 10, "bold")).grid(row=0, column=0, sticky=tk.W, pady=(0, 5))

        self.text = tk.Text(frame, font=("TkFixedFont", 10), wrap=tk.NONE, height=15, width=60)
        display = {k: v for k, v in self.server.items() if k not in ("status", "tool_count")}
        self.text.insert("1.0", json.dumps(display, indent=2))
        self.text.grid(row=1, column=0, sticky="nsew", pady=(0, 10))

        text_scroll = ttk.Scrollbar(frame, orient=tk.VERTICAL, command=self.text.yview)
        text_scroll.grid(row=1, column=1, sticky="ns", pady=(0, 10))
        self.text.configure(yscrollcommand=text_scroll.set)

        self.error_label = ttk.Label(frame, text="", foreground="red", font=("TkDefaultFont", 9))
        self.error_label.grid(row=2, column=0, sticky=tk.W)

        btn_frame = ttk.Frame(frame)
        btn_frame.grid(row=3, column=0, sticky=tk.E)
        ttk.Button(btn_frame, text="Save", command=self._ok, width=10).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Cancel", command=self.dialog.destroy, width=10).pack(side=tk.LEFT, padx=5)

    def _ok(self):
        raw = self.text.get("1.0", tk.END).strip()
        try:
            config = json.loads(raw)
        except json.JSONDecodeError as e:
            self.error_label.configure(text=f"Invalid JSON: {e}")
            return

        if not config.get("name"):
            self.error_label.configure(text="'name' is required")
            return

        config.setdefault("enabled", True)
        self.result = config
        self.dialog.destroy()


class EditMcpServerDialog:
    def __init__(self, parent, server: dict):
        self.server = server
        self.result = None
        self.dialog = tk.Toplevel(parent)
        self.dialog.title("Edit MCP Server")
        self.dialog.transient(parent)
        self.dialog.grab_set()
        self.dialog.resizable(False, False)

        self._build_ui()

        self.dialog.update_idletasks()
        w = min(self.dialog.winfo_reqwidth() + 40, parent.winfo_screenwidth() - 100)
        h = min(self.dialog.winfo_reqheight() + 40, parent.winfo_screenheight() - 100)
        x = parent.winfo_x() + 50
        y = parent.winfo_y() + 50
        self.dialog.geometry(f"{w}x{h}+{x}+{y}")

        self.dialog.wait_window()

    def _build_ui(self):
        self.dialog.columnconfigure(1, weight=1)

        frame = ttk.Frame(self.dialog, padding=20)
        frame.grid(row=0, column=0, sticky="nsew")
        frame.columnconfigure(1, weight=1)

        row = 0

        ttk.Label(frame, text="Host Preset:").grid(row=row, column=0, sticky=tk.W, pady=8)
        self.host_var = tk.StringVar()
        self.host_combo = ttk.Combobox(frame, textvariable=self.host_var, values=list(HOST_PRESETS.keys()), width=40, state="readonly")
        self.host_combo.grid(row=row, column=1, sticky=tk.EW, pady=8, padx=(10, 0))
        self.host_combo.bind("<<ComboboxSelected>>", self._on_host_selected)

        row += 1

        ttk.Label(frame, text="API Base URL:").grid(row=row, column=0, sticky=tk.W, pady=8)
        url_frame = ttk.Frame(frame)
        url_frame.grid(row=row, column=1, sticky=tk.EW, pady=8, padx=(10, 0))
        url_frame.columnconfigure(0, weight=1)

        self.base_url_var = tk.StringVar()
        self.base_url_entry = ttk.Entry(url_frame, textvariable=self.base_url_var, width=50)
        self.base_url_entry.grid(row=0, column=0, sticky=tk.EW, padx=(0, 5))

        self.get_models_btn = ttk.Button(url_frame, text="Get Models", command=self._fetch_models, width=12)
        self.get_models_btn.grid(row=0, column=1)

        row += 1

        ttk.Label(frame, text="Model:").grid(row=row, column=0, sticky=tk.W, pady=8)
        self.model_var = tk.StringVar()
        self.model_combo = ttk.Combobox(frame, textvariable=self.model_var, width=40)
        self.model_combo.grid(row=row, column=1, sticky=tk.EW, pady=8, padx=(10, 0))

        row += 1

        ttk.Label(frame, text="API Key:").grid(row=row, column=0, sticky=tk.W, pady=8)
        key_frame = ttk.Frame(frame)
        key_frame.grid(row=row, column=1, sticky=tk.EW, pady=8, padx=(10, 0))
        key_frame.columnconfigure(0, weight=1)

        self.key_var = tk.StringVar()
        self.key_entry = ttk.Entry(key_frame, textvariable=self.key_var, show="*")
        self.key_entry.grid(row=0, column=0, sticky=tk.EW, padx=(0, 5))

        self.toggle_btn = ttk.Button(key_frame, text="Show", width=6, command=self._toggle_key)
        self.toggle_btn.grid(row=0, column=1)

        row += 1

        self.status_label = ttk.Label(frame, text="", foreground="gray", font=("TkDefaultFont", 9))
        self.status_label.grid(row=row, column=0, columnspan=2, pady=(10, 0))

        row += 1

        btn_frame = ttk.Frame(frame)
        btn_frame.grid(row=row, column=0, columnspan=2, pady=(20, 0))
        ttk.Button(btn_frame, text="Apply", command=self._apply, width=12).pack(side=tk.LEFT, padx=5)
        ttk.Button(btn_frame, text="Cancel", command=self.dialog.destroy, width=12).pack(side=tk.LEFT, padx=5)

    def _sync_to_ui(self):
        base = self.config.api_base.rstrip("/")
        host_name = "Custom"
        for name, url in HOST_PRESETS.items():
            if url and url.rstrip("/") == base:
                host_name = name
                break
        self.host_var.set(host_name)
        self.base_url_var.set(base)
        self.model_var.set(self.config.model)
        self.key_var.set(self.config.api_key or "")
        self._update_model_dropdown(base)

    def _update_model_dropdown(self, base_url):
        base_url = base_url.rstrip("/")
        models = MODEL_PRESETS.get(base_url, [])
        self.model_combo.configure(values=models)

    def _on_host_selected(self, event=None):
        name = self.host_var.get()
        url = HOST_PRESETS.get(name, "")
        if name == "Custom":
            self.base_url_entry.configure(state=tk.NORMAL)
        else:
            self.base_url_entry.configure(state=tk.DISABLED)
            self.base_url_var.set(url)
        self._update_model_dropdown(url)

    def _toggle_key(self):
        showing = self.key_entry.cget("show") == ""
        self.key_entry.configure(show="" if showing else "*")
        self.toggle_btn.configure(text="Hide" if showing else "Show")

    def _apply(self):
        host_url = self.base_url_var.get().strip()
        model = self.model_var.get().strip()
        api_key = self.key_var.get().strip()

        if not host_url:
            self.status_label.configure(text="Error: API Base URL is required", foreground="red")
            return
        if not model:
            self.status_label.configure(text="Error: Model is required", foreground="red")
            return
        if not api_key:
            self.status_label.configure(text="Error: API Key is required", foreground="red")
            return

        self.config.set_api_base(host_url)
        self.config.set_model(model)
        self.config.set_api_key(api_key)

        self.query_engine.api_client.base_url = host_url.rstrip("/")
        self.query_engine.api_client.provider = detect_provider(host_url)
        self.query_engine.api_client.model = model
        self.query_engine.api_client.api_key = api_key

        self.status_label.configure(text="Settings applied successfully", foreground="green")
        self.result = True

    def _fetch_models(self):
        base_url = self.base_url_var.get().strip()
        api_key = self.key_var.get().strip()

        if not base_url:
            self.status_label.configure(text="Enter an API base URL first", foreground="red")
            return

        self.status_label.configure(text="Fetching models...", foreground="gray")
        self.get_models_btn.configure(state=tk.DISABLED)

        def do_fetch():
            try:
                import httpx
                url = base_url.rstrip("/") + "/models"
                headers = {"Authorization": f"Bearer {api_key}"} if api_key else {}
                resp = httpx.get(url, headers=headers, timeout=15.0)
                resp.raise_for_status()
                data = resp.json()
                models = []
                if isinstance(data, dict) and "data" in data:
                    for item in data["data"]:
                        if isinstance(item, dict):
                            models.append(item.get("id", ""))
                elif isinstance(data, list):
                    for item in data:
                        if isinstance(item, dict):
                            models.append(item.get("id", str(item)))
                        else:
                            models.append(str(item))
                models = [m for m in models if m]
                models.sort()
                self.dialog.after(0, lambda: self._on_models_fetched(models))
            except Exception as e:
                self.dialog.after(0, lambda: self._on_models_fetch_failed(str(e)))

        threading.Thread(target=do_fetch, daemon=True).start()

    def _on_models_fetched(self, models):
        self.model_combo.configure(values=models)
        self.status_label.configure(text=f"Found {len(models)} models", foreground="green")
        self.get_models_btn.configure(state=tk.NORMAL)

    def _on_models_fetch_failed(self, error):
        self.status_label.configure(text=f"Failed to fetch models: {error[:100]}", foreground="red")
        self.get_models_btn.configure(state=tk.NORMAL)


class MainWindow:
    def __init__(self, config, query_engine, tool_registry=None, mcp_manager=None):
        self.config = config
        self.query_engine = query_engine
        self.tool_registry = tool_registry
        self.mcp_manager = mcp_manager
        self.root = tk.Tk()
        self.root.title("tk-claudette")
        self.root.geometry("900x700")
        self.root.minsize(600, 400)

        self._command_history = []
        self._history_index = -1
        self._is_processing = False
        self._cwd = None

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
        file_menu.add_command(label="New", command=self._on_new, accelerator="Ctrl+N")
        file_menu.add_command(label="Open Folder...", command=self._on_open_folder, accelerator="Ctrl+O")
        file_menu.add_separator()
        file_menu.add_command(label="Clear", command=self._on_clear, accelerator="Ctrl+L")
        file_menu.add_separator()
        file_menu.add_command(label="Exit", command=self._on_exit, accelerator="Alt+F4")

        edit_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Edit", menu=edit_menu)
        edit_menu.add_command(label="Connection...", command=self._show_connection)
        edit_menu.add_command(label="Tools...", command=self._show_tools)
        edit_menu.add_command(label="MCP Servers...", command=self._show_mcp)
        edit_menu.add_separator()
        edit_menu.add_command(label="Copy", command=self._on_copy, accelerator="Ctrl+C")
        edit_menu.add_command(label="Select All", command=self._on_select_all, accelerator="Ctrl+A")

        view_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="View", menu=view_menu)
        view_menu.add_command(label="Cost Breakdown", command=self._show_cost)

        help_menu = tk.Menu(menubar, tearoff=0)
        menubar.add_cascade(label="Help", menu=help_menu)
        help_menu.add_command(label="Help", command=self._show_help, accelerator="F1")
        help_menu.add_command(label="About", command=self._show_about)

        toolbar = ttk.Frame(self.root)
        toolbar.grid(row=0, column=0, sticky="ew", padx=5, pady=2)

        self._new_btn = ttk.Button(toolbar, text=f"{ICON_NEW} New", width=8, command=self._on_new)
        self._new_btn.pack(side=tk.LEFT, padx=1)

        self._open_btn = ttk.Button(toolbar, text=f"{ICON_OPEN} Open", width=8, command=self._on_open_folder)
        self._open_btn.pack(side=tk.LEFT, padx=1)

        ttk.Separator(toolbar, orient=tk.VERTICAL).pack(side=tk.LEFT, fill=tk.Y, padx=4)

        self._tools_btn = ttk.Button(toolbar, text=f"{ICON_TOOLS} Tools", width=8, command=self._show_tools)
        self._tools_btn.pack(side=tk.LEFT, padx=1)

        self._mcp_btn = ttk.Button(toolbar, text=f"{ICON_MCP} MCP", width=8, command=self._show_mcp)
        self._mcp_btn.pack(side=tk.LEFT, padx=1)

        ttk.Separator(toolbar, orient=tk.VERTICAL).pack(side=tk.LEFT, fill=tk.Y, padx=4)

        self._conn_btn = ttk.Button(toolbar, text=f"{ICON_SETTINGS} Connection", width=12, command=self._show_connection)
        self._conn_btn.pack(side=tk.LEFT, padx=1)

        self._cost_btn = ttk.Button(toolbar, text=f"{ICON_COST} Cost", width=8, command=self._show_cost)
        self._cost_btn.pack(side=tk.LEFT, padx=1)

        status_frame = ttk.Frame(self.root)
        status_frame.grid(row=1, column=0, sticky="ew", padx=5, pady=2)
        status_frame.columnconfigure(0, weight=1)

        self.connection_label = ttk.Label(status_frame, text="", font=("TkDefaultFont", 9))
        self.connection_label.grid(row=0, column=0, sticky=tk.W)

        self.cwd_label = ttk.Label(status_frame, text="", font=("TkDefaultFont", 8), foreground="gray")
        self.cwd_label.grid(row=1, column=0, sticky=tk.W)

        self.status_label = ttk.Label(status_frame, text="Ready", foreground="gray", font=("TkDefaultFont", 8))
        self.status_label.grid(row=0, column=1, sticky=tk.E)

        self.message_frame = ttk.Frame(self.root)
        self.message_frame.grid(row=2, column=0, sticky="nsew", padx=5, pady=3)
        self.message_frame.columnconfigure(0, weight=1)
        self.message_frame.rowconfigure(0, weight=1)

        self.chat_canvas = tk.Canvas(self.message_frame, bg="#f5f5f5", highlightthickness=0, bd=0)
        self.chat_scrollbar = ttk.Scrollbar(self.message_frame, orient=tk.VERTICAL, command=self.chat_canvas.yview)
        self.chat_inner = tk.Frame(self.chat_canvas, bg="#f5f5f5", highlightthickness=0, bd=0)

        self.chat_inner.bind(
            "<Configure>",
            lambda e: self.chat_canvas.configure(scrollregion=self.chat_canvas.bbox("all"))
        )

        self.chat_canvas.create_window((0, 0), window=self.chat_inner, anchor="nw")
        self.chat_canvas.configure(yscrollcommand=self.chat_scrollbar.set)

        self.chat_canvas.grid(row=0, column=0, sticky="nsew")
        self.chat_scrollbar.grid(row=0, column=1, sticky="ns")

        self.chat_canvas.bind("<Configure>", lambda e: self.chat_canvas.itemconfig("all", width=e.width))

        self._message_widgets = []
        self._streaming_label = None

        input_frame = ttk.Frame(self.root)
        input_frame.grid(row=3, column=0, sticky="ew", padx=5, pady=3)
        input_frame.columnconfigure(0, weight=1)

        self.input_text = tk.Text(input_frame, height=4, wrap=tk.WORD, font=("TkFixedFont", 10))
        input_scrollbar = ttk.Scrollbar(input_frame, orient=tk.VERTICAL, command=self.input_text.yview)
        self.input_text.configure(yscrollcommand=input_scrollbar.set)
        self.input_text.grid(row=0, column=0, sticky="nsew")
        input_scrollbar.grid(row=0, column=1, sticky="ns")

        btn_frame = ttk.Frame(self.root)
        btn_frame.grid(row=4, column=0, sticky="ew", padx=5, pady=(0, 5))

        self.stop_btn = ttk.Button(btn_frame, text="Stop", command=self._on_stop, state=tk.DISABLED)
        self.stop_btn.pack(side=tk.LEFT, padx=2)

        self.send_btn = ttk.Button(btn_frame, text="Send (Enter)", command=self._on_send)
        self.send_btn.pack(side=tk.RIGHT, padx=2)

        self.status_bar = ttk.Frame(self.root)
        self.status_bar.grid(row=5, column=0, sticky="ew", padx=5, pady=2)

        self.cost_label = ttk.Label(self.status_bar, text="Cost: $0.0000", foreground="gray", font=("TkDefaultFont", 8))
        self.cost_label.pack(side=tk.LEFT)

        self.token_label = ttk.Label(self.status_bar, text="Tokens: 0", foreground="gray", font=("TkDefaultFont", 8))
        self.token_label.pack(side=tk.LEFT, padx=10)

    def _sync_settings_to_ui(self):
        provider = self.query_engine.api_client.provider
        model = self.config.model
        base = self.config.api_base
        self.connection_label.configure(text=f"[{provider}] {model}  \u2014  {base}")
        cwd = self.query_engine.cwd
        self.cwd_label.configure(text=f"CWD: {cwd}")

    def _on_new(self):
        self._on_clear()
        self._cwd = None
        self.cwd_label.configure(text="")

    def _on_open_folder(self):
        folder = filedialog.askdirectory(title="Select Working Directory")
        if folder:
            self._cwd = folder
            self.query_engine.cwd = folder
            self.cwd_label.configure(text=f"CWD: {folder}")
            self._append_message("system", f"Working directory set to: {folder}")

    def _show_connection(self):
        dlg = ConnectionDialog(self.root, self.config, self.query_engine)
        if dlg.result:
            self._sync_settings_to_ui()

    def _show_tools(self):
        if self.tool_registry:
            ToolsDialog(self.root, self.tool_registry, self.mcp_manager)

    def _show_mcp(self):
        if self.mcp_manager:
            McpServersDialog(self.root, self.mcp_manager)
        else:
            self._append_message("system", "MCP server management not yet configured.")

    def _bind_events(self):
        self.input_text.bind("<Return>", self._on_return)
        self.input_text.bind("<Shift-Return>", self._on_shift_return)
        self.input_text.bind("<Up>", self._on_history_up)
        self.input_text.bind("<Down>", self._on_history_down)
        self.root.bind("<Control-c>", lambda e: self._on_stop())
        self.root.bind("<Control-l>", lambda e: self._on_clear())
        self.root.bind("<Control-n>", lambda e: self._on_new())
        self.root.bind("<Control-o>", lambda e: self._on_open_folder())
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
        if role == "user":
            self._add_user_bubble(content)
        elif role == "assistant":
            self._add_assistant_bubble(content)
        elif role == "tool":
            self._add_tool_bubble(content)
        elif role == "error":
            self._add_error_bubble(content)
        elif role == "system":
            self._add_system_bubble(content)
        self._scroll_to_bottom()

    def _add_user_bubble(self, text: str):
        wrapper = tk.Frame(self.chat_inner, bg="#f5f5f5", highlightthickness=0, borderwidth=0)
        wrapper.pack(fill=tk.X, pady=2, padx=10)
        bubble = tk.Label(wrapper, text=text, bg="#0078d4", fg="white",
                          font=("TkDefaultFont", 10), wraplength=500,
                          justify=tk.RIGHT, padx=12, pady=8, anchor=tk.E,
                          highlightthickness=0, borderwidth=0, relief=tk.FLAT)
        bubble.pack(side=tk.RIGHT)
        self._message_widgets.append(wrapper)

    def _add_assistant_bubble(self, text: str):
        wrapper = tk.Frame(self.chat_inner, bg="#f5f5f5", highlightthickness=0, borderwidth=0)
        wrapper.pack(fill=tk.X, pady=2, padx=10)
        bubble = tk.Label(wrapper, text=text, bg="#e8e8e8", fg="#222222",
                          font=("TkDefaultFont", 10), wraplength=500,
                          justify=tk.LEFT, padx=12, pady=8, anchor=tk.W,
                          highlightthickness=0, borderwidth=0, relief=tk.FLAT)
        bubble.pack(side=tk.LEFT)
        self._message_widgets.append(wrapper)

    def _add_tool_bubble(self, text: str):
        wrapper = tk.Frame(self.chat_inner, bg="#f5f5f5", highlightthickness=0, borderwidth=0)
        wrapper.pack(fill=tk.X, pady=4, padx=10)
        header = tk.Label(wrapper, text="Tool Output", bg="#f5f5f5", fg="#888888",
                          font=("TkDefaultFont", 8), justify=tk.LEFT, anchor=tk.W,
                          highlightthickness=0, borderwidth=0, relief=tk.FLAT)
        header.pack(anchor=tk.W, padx=2, pady=(0, 2))
        bubble = tk.Label(wrapper, text=text, bg="#e8e4d8", fg="#333333",
                          font=("TkFixedFont", 9), wraplength=700,
                          justify=tk.LEFT, padx=10, pady=8, anchor=tk.W,
                          highlightthickness=0, borderwidth=0, relief=tk.FLAT)
        bubble.pack(fill=tk.X, side=tk.LEFT)
        self._message_widgets.append(wrapper)

    def _add_error_bubble(self, text: str):
        wrapper = tk.Frame(self.chat_inner, bg="#f5f5f5", highlightthickness=0, borderwidth=0)
        wrapper.pack(fill=tk.X, pady=2, padx=10)
        bubble = tk.Label(wrapper, text=text, bg="#fde8e8", fg="red",
                          font=("TkDefaultFont", 10), wraplength=500,
                          justify=tk.CENTER, padx=12, pady=8,
                          highlightthickness=0, borderwidth=0, relief=tk.FLAT)
        bubble.pack(fill=tk.X)
        self._message_widgets.append(wrapper)

    def _add_system_bubble(self, text: str):
        wrapper = tk.Frame(self.chat_inner, bg="#f5f5f5", highlightthickness=0, borderwidth=0)
        wrapper.pack(fill=tk.X, pady=2, padx=10)
        bubble = tk.Label(wrapper, text=text, bg="#f5f5f5", fg="gray",
                          font=("TkDefaultFont", 9, "italic"), wraplength=500,
                          justify=tk.CENTER, padx=12, pady=4,
                          highlightthickness=0, borderwidth=0, relief=tk.FLAT)
        bubble.pack(fill=tk.X)
        self._message_widgets.append(wrapper)

    def _scroll_to_bottom(self):
        self.chat_canvas.update_idletasks()
        self.chat_canvas.yview_moveto(1.0)

    def _append_streaming(self, text: str):
        if self._streaming_label is None:
            wrapper = tk.Frame(self.chat_inner, bg="#f5f5f5", highlightthickness=0, borderwidth=0)
            wrapper.pack(fill=tk.X, pady=2, padx=10)
            bubble = tk.Label(wrapper, text="", bg="#e8e8e8", fg="#222222",
                              font=("TkDefaultFont", 10), wraplength=500,
                              justify=tk.LEFT, padx=12, pady=8, anchor=tk.W,
                              highlightthickness=0, borderwidth=0, relief=tk.FLAT)
            bubble.pack(side=tk.LEFT)
            self._streaming_label = bubble
            self._streaming_wrapper = wrapper
            self._streaming_text = ""
            self._streaming_widgets = [wrapper]

        self._streaming_text += text
        self._streaming_label.configure(text=self._streaming_text)
        self._scroll_to_bottom()

    def _set_streaming_mode(self, active: bool):
        if active:
            self._streaming_label = None
            self._streaming_text = ""

    def _on_clear(self):
        self.query_engine.clear()
        for w in self._message_widgets:
            w.destroy()
        self._message_widgets = []
        if self._streaming_label:
            self._streaming_wrapper.destroy()
        self._streaming_label = None
        self.status_label.configure(text="Cleared")

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
            import warnings
            warnings.filterwarnings("ignore", message=".*was never awaited", category=RuntimeWarning)
            loop = asyncio.new_event_loop()
            loop.set_debug(False)
            asyncio.set_event_loop(loop)
            try:
                async def main():
                    async for event in self.query_engine.submit(user_input):
                        pass
                loop.run_until_complete(main())
            except Exception as e:
                error_msg = str(e)
                self.root.after(0, lambda: self._on_error(error_msg))
            finally:
                self.root.after(0, self._on_done)
                loop.close()

        threading.Thread(target=run_async, daemon=True).start()

    def _on_text_chunk(self, text: str):
        self.root.after(0, lambda: self._append_streaming(text))

    def _on_tool_start(self, name: str, args: dict):
        self._finalize_streaming()
        self.root.after(0, lambda: self._append_message("tool", f"Running {name}..."))

    def _finalize_streaming(self):
        def _do():
            if self._streaming_label and self._streaming_text:
                self._message_widgets.append(self._streaming_wrapper)
            self._streaming_label = None
            self._streaming_text = ""
        self.root.after(0, _do)

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

    def _on_exit(self):
        if self._is_processing:
            if not messagebox.askokcancel("Exit", "A request is still running. Exit anyway?"):
                return
        self.root.destroy()

    def _on_copy(self):
        try:
            text = self.root.clipboard_get()
        except tk.TclError:
            pass

    def _on_select_all(self):
        pass

    def _show_cost(self):
        CostDialog(self.root, self.query_engine.cost_tracker)

    def _show_help(self):
        help_text = """Available commands:
/help          - Show this help
/clear         - Clear conversation
/model <name>  - Change model
/host <url>    - Change API host
/key <key>     - Change API key
/cost          - Show cost breakdown
/config        - Show configuration

Keyboard shortcuts:
Enter          - Send message
Shift+Enter    - New line
Up/Down        - Command history
Ctrl+N         - New conversation
Ctrl+O         - Open folder
Ctrl+C         - Stop current request
Ctrl+L         - Clear conversation
F1             - Show this help"""
        self._append_message("system", help_text)

    def _show_about(self):
        dlg = tk.Toplevel(self.root)
        dlg.title("About tk-claudette")
        dlg.transient(self.root)
        dlg.grab_set()
        dlg.resizable(False, False)

        frame = ttk.Frame(dlg, padding=20)
        frame.pack(fill=tk.BOTH, expand=True)

        try:
            from PIL import Image, ImageTk
            img = Image.open(Path(__file__).parent / "claudette.png")
            img.thumbnail((128, 128))
            photo = ImageTk.PhotoImage(img)
            logo = ttk.Label(frame, image=photo)
            logo.image = photo
            logo.pack(pady=(0, 10))
        except Exception:
            pass

        ttk.Label(frame, text="tk-claudette v0.1.0", font=("TkDefaultFont", 12, "bold")).pack(pady=(0, 5))
        ttk.Label(frame, text="A desktop GUI AI coding agent built with Python and Tkinter.", foreground="gray").pack(pady=(0, 2))
        ttk.Label(frame, text="Supports any OpenAI-compatible endpoint.", foreground="gray").pack(pady=(0, 10))

        ttk.Button(frame, text="Close", command=dlg.destroy, width=10).pack()

        dlg.update_idletasks()
        x = self.root.winfo_x() + (self.root.winfo_width() // 2) - (dlg.winfo_width() // 2)
        y = self.root.winfo_y() + (self.root.winfo_height() // 2) - (dlg.winfo_height() // 2)
        dlg.geometry(f"+{x}+{y}")

        dlg.wait_window()

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
                self.query_engine.api_client.model = new_model
                self._sync_settings_to_ui()
                self._append_message("system", f"Model changed to: {new_model}")

        elif command == "/host":
            if args.strip():
                new_host = args.strip()
                self.config.set_api_base(new_host)
                self.query_engine.api_client.base_url = new_host.rstrip("/")
                self.query_engine.api_client.provider = detect_provider(new_host)
                self._sync_settings_to_ui()
                self._append_message("system", f"Host changed to: {new_host}")

        elif command == "/key":
            if args.strip():
                new_key = args.strip()
                self.config.set_api_key(new_key)
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
