import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

export interface FeatureNode {
  id: string;
  label: string;
  description: string;
  path: string;
  children: FeatureNode[];
  files: string[];
  isLeaf: boolean;
  required?: boolean;
}

const CLAUDETTE_DIR = '';

function rel(...parts: string[]): string {
  return join(CLAUDETTE_DIR, ...parts);
}

/**
 * Feature tree organized around what a builder actually needs.
 *
 * Top-level groups are implementation layers — you build them in order.
 * Each feature maps to real documentation files in claudette/.
 *
 * "required" = the absolute minimum for a working Claudette.
 * If you skip a required feature, the agent won't function.
 * Optional features add polish, extensibility, or nice-to-haves.
 */
export async function buildFeatureTree(basePath: string): Promise<FeatureNode[]> {
  return [
    // ─── LAYER 1: The brain ───────────────────────────────────────────
    {
      id: 'core-agent',
      label: 'Core Agent',
      description: 'The conversation engine — messages in, LLM responses out, tool calls loop back',
      path: basePath,
      required: true,
      children: [
        {
          id: 'core-agent/query-engine',
          label: 'Query Engine',
          description: 'Per-conversation state manager — owns messages, usage, permissions',
          path: basePath,
          children: [],
          files: [rel('QueryEngine.md')],
          isLeaf: true,
        },
        {
          id: 'core-agent/query-loop',
          label: 'Query Loop',
          description: 'Async generator: API call → stream → tool exec → repeat',
          path: basePath,
          children: [],
          files: [rel('query.md'), rel('query/config.md'), rel('query/deps.md'), rel('query/stopHooks.md'), rel('query/tokenBudget.md')],
          isLeaf: true,
        },
        {
          id: 'core-agent/system-prompt',
          label: 'System Prompt',
          description: 'All prompt sections + templates that instruct the model how to behave',
          path: basePath,
          children: [],
          files: [rel('constants/prompts.md'), rel('constants/system.md'), rel('constants/systemPromptSections.md'), rel('constants/outputStyles.md')],
          isLeaf: true,
        },
        {
          id: 'core-agent/tool-registry',
          label: 'Tool Interface & Registry',
          description: 'Tool interface definition and registry system',
          path: basePath,
          children: [],
          files: [rel('Tool.md'), rel('tools.md'), rel('tools/utils.md')],
          isLeaf: true,
        },
        {
          id: 'core-agent/api-client',
          label: 'API Client',
          description: 'OpenAI-compatible client with streaming, retry, and error handling',
          path: basePath,
          children: [],
          files: [rel('services/api/claude.md'), rel('services/api/client.md'), rel('services/api/errors.md'), rel('services/api/withRetry.md')],
          isLeaf: true,
        },
      ],
      files: [],
      isLeaf: false,
    },

    // ─── LAYER 2: What the agent can do ───────────────────────────────
    {
      id: 'shell-commands',
      label: 'Shell Commands',
      description: 'Let the agent run bash — with permission checks, sandboxing, and safety',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('tools/BashTool/BashTool.md'),
        rel('tools/BashTool/prompt.md'),
        rel('tools/BashTool/bashPermissions.md'),
        rel('tools/BashTool/bashSecurity.md'),
        rel('tools/BashTool/readOnlyValidation.md'),
        rel('tools/BashTool/destructiveCommandWarning.md'),
        rel('tools/BashTool/pathValidation.md'),
        rel('tools/BashTool/modeValidation.md'),
        rel('tools/BashTool/shouldUseSandbox.md'),
        rel('tools/BashTool/commandSemantics.md'),
        rel('tools/BashTool/bashCommandHelpers.md'),
        rel('tools/BashTool/UI.md'),
        rel('utils/bash/bashParser.md'),
        rel('utils/bash/commands.md'),
        rel('utils/bash/shellQuote.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'file-operations',
      label: 'File Operations',
      description: 'Read, write, and edit files — SEARCH/REPLACE blocks with diff output',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('tools/FileEditTool/FileEditTool.md'),
        rel('tools/FileEditTool/prompt.md'),
        rel('tools/FileEditTool/types.md'),
        rel('tools/FileEditTool/constants.md'),
        rel('tools/FileEditTool/UI.md'),
        rel('tools/FileEditTool/utils.md'),
        rel('tools/FileReadTool/FileReadTool.md'),
        rel('tools/FileReadTool/prompt.md'),
        rel('tools/FileReadTool/UI.md'),
        rel('tools/FileReadTool/limits.md'),
        rel('tools/FileWriteTool/FileWriteTool.md'),
        rel('tools/FileWriteTool/prompt.md'),
        rel('tools/FileWriteTool/UI.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'file-search',
      label: 'File Search',
      description: 'Glob patterns and regex search across the codebase',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('tools/GlobTool/GlobTool.md'),
        rel('tools/GlobTool/prompt.md'),
        rel('tools/GlobTool/UI.md'),
        rel('tools/GrepTool/GrepTool.md'),
        rel('tools/GrepTool/prompt.md'),
        rel('tools/GrepTool/UI.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'web-access',
      label: 'Web Access',
      description: 'Fetch URLs and search the web for real-time information',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('tools/WebFetchTool/WebFetchTool.md'),
        rel('tools/WebFetchTool/prompt.md'),
        rel('tools/WebFetchTool/UI.md'),
        rel('tools/WebFetchTool/utils.md'),
        rel('tools/WebFetchTool/preapproved.md'),
        rel('tools/WebSearchTool/WebSearchTool.md'),
        rel('tools/WebSearchTool/prompt.md'),
        rel('tools/WebSearchTool/UI.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'sub-agents',
      label: 'Sub-Agents',
      description: 'Spawn specialized agents — verifier, planner, explorer',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('tools/AgentTool/AgentTool.md'),
        rel('tools/AgentTool/prompt.md'),
        rel('tools/AgentTool/builtInAgents.md'),
        rel('tools/AgentTool/runAgent.md'),
        rel('tools/AgentTool/built-in/verificationAgent.md'),
        rel('tools/AgentTool/built-in/planAgent.md'),
        rel('tools/AgentTool/built-in/exploreAgent.md'),
        rel('tools/AgentTool/built-in/generalPurposeAgent.md'),
        rel('tools/AgentTool/built-in/claudeCodeGuideAgent.md'),
      ],
      isLeaf: true,
    },

    // ─── LAYER 3: The terminal face ───────────────────────────────────
    {
      id: 'terminal-ui',
      label: 'Terminal UI',
      description: 'Full REPL — messages, input, dialogs, virtual scrolling',
      path: basePath,
      required: true,
      children: [
        {
          id: 'terminal-ui/rendering',
          label: 'UI Rendering Layer',
          description: 'Functional spec for the rendering layer — frame-buffer diffing, flexbox layout, virtual scrolling, streaming text, input handling. Platform-agnostic: works with terminal, web, native GUI, or any toolkit',
          path: basePath,
          children: [],
          files: [rel('ui-rendering.md'), rel('ink.md'), rel('ink/ink.md'), rel('ink/reconciler.md'), rel('ink/renderer.md'), rel('ink/screen.md'), rel('ink/output.md'), rel('ink/dom.md'), rel('ink/colorize.md'), rel('ink/measure-text.md'), rel('ink/wrap-text.md'), rel('ink/optimizer.md')],
          isLeaf: true,
        },
        {
          id: 'terminal-ui/components',
          label: 'UI Components',
          description: 'App, Messages, PromptInput, dialogs, spinner, design system',
          path: basePath,
          children: [],
          files: [
            rel('components/App.md'),
            rel('components/Messages.md'),
            rel('components/Message.md'),
            rel('components/PromptInput/PromptInput.md'),
            rel('components/VirtualMessageList.md'),
            rel('components/Spinner/index.md'),
            rel('components/design-system/Dialog.md'),
            rel('components/design-system/Pane.md'),
            rel('components/design-system/Tabs.md'),
            rel('screens/REPL.md'),
          ],
          isLeaf: true,
        },
      ],
      files: [],
      isLeaf: false,
    },

    // ─── LAYER 4: Safety & control ────────────────────────────────────
    {
      id: 'permissions',
      label: 'Permissions',
      description: 'Always / Once / Never — per tool and per path',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('components/permissions/PermissionRequest.md'),
        rel('components/permissions/PermissionDialog.md'),
        rel('components/permissions/PermissionPrompt.md'),
        rel('components/permissions/PermissionExplanation.md'),
        rel('components/permissions/BashPermissionRequest/BashPermissionRequest.md'),
        rel('components/permissions/FileEditPermissionRequest/'),
        rel('components/permissions/FilesystemPermissionRequest/FilesystemPermissionRequest.md'),
        rel('utils/permissions/'),
      ],
      isLeaf: true,
    },

    // ─── LAYER 5: Quality of life ─────────────────────────────────────
    {
      id: 'slash-commands',
      label: 'Slash Commands',
      description: '/commit, /review, /help, /model, /cost, /clear, and more',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('command-registry-spec.md'),
        rel('commands.md'),
        rel('commands/commit.md'),
        rel('commands/review.md'),
        rel('commands/security-review.md'),
        rel('commands/insights.md'),
        rel('commands/init-verifiers.md'),
        rel('commands/model/model.md'),
        rel('commands/config/config.md'),
        rel('commands/cost/cost.md'),
        rel('commands/doctor/doctor.md'),
        rel('commands/help/help.md'),
        rel('commands/status/status.md'),
        rel('commands/session/session.md'),
        rel('commands/version.md'),
        rel('commands/exit/exit.md'),
        rel('commands/compact/compact.md'),
        rel('commands/clear/clear.md'),
        rel('commands/export/export.md'),
        rel('commands/feedback/feedback.md'),
        rel('commands/permissions/permissions.md'),
        rel('commands/theme/theme.md'),
        rel('commands/vim/vim.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'memory',
      label: 'Memory System',
      description: 'Persistent project & team memory across sessions via .claude/',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('memdir/memdir.md'),
        rel('memdir/findRelevantMemories.md'),
        rel('memdir/memoryTypes.md'),
        rel('memdir/memoryScan.md'),
        rel('memdir/memoryAge.md'),
        rel('memdir/paths.md'),
        rel('memdir/teamMemPrompts.md'),
        rel('memdir/teamMemPaths.md'),
        rel('services/SessionMemory/prompts.md'),
        rel('services/SessionMemory/sessionMemory.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'context-management',
      label: 'Context Window Management',
      description: 'Auto-compact conversations when context gets full',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('services/compact/compact.md'),
        rel('services/compact/prompt.md'),
        rel('services/compact/autoCompact.md'),
        rel('services/compact/microCompact.md'),
        rel('services/compact/grouping.md'),
        rel('services/compact/postCompactCleanup.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'cost-tracking',
      label: 'Cost Tracking',
      description: 'Token usage, cost estimation, budget warnings',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('cost-tracker.md'),
        rel('costHook.md'),
        rel('components/CostThresholdDialog.md'),
        rel('services/api/usage.md'),
        rel('query/tokenBudget.md'),
      ],
      isLeaf: true,
    },

    // ─── LAYER 6: Extensibility ───────────────────────────────────────
    {
      id: 'mcp',
      label: 'MCP Integration',
      description: 'Model Context Protocol — connect external tool servers',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('services/mcp/client.md'),
        rel('services/mcp/types.md'),
        rel('services/mcp/config.md'),
        rel('services/mcp/MCPConnectionManager.md'),
        rel('services/mcp/auth.md'),
        rel('services/mcp/elicitationHandler.md'),
        rel('tools/MCPTool/MCPTool.md'),
        rel('tools/MCPTool/prompt.md'),
        rel('tools/ReadMcpResourceTool/ReadMcpResourceTool.md'),
        rel('tools/ListMcpResourcesTool/ListMcpResourcesTool.md'),
        rel('components/mcp/index.md'),
        rel('components/mcp/MCPSettings.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'skills',
      label: 'Skills',
      description: 'Reusable prompt packages that extend agent capabilities',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('skills/loadSkillsDir.md'),
        rel('skills/bundledSkills.md'),
        rel('tools/SkillTool/SkillTool.md'),
        rel('tools/SkillTool/prompt.md'),
        rel('skills/bundled/skillify.md'),
        rel('skills/bundled/updateConfig.md'),
        rel('skills/bundled/keybindings.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'keybindings',
      label: 'Keybindings',
      description: 'Customizable keyboard shortcuts with user config files',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('keybindings/schema.md'),
        rel('keybindings/parser.md'),
        rel('keybindings/match.md'),
        rel('keybindings/resolver.md'),
        rel('keybindings/defaultBindings.md'),
        rel('keybindings/loadUserBindings.md'),
        rel('keybindings/validate.md'),
        rel('keybindings/shortcutFormat.md'),
        rel('keybindings/useKeybinding.md'),
        rel('keybindings/reservedShortcuts.md'),
        rel('keybindings/template.md'),
        rel('keybindings/KeybindingProviderSetup.md'),
        rel('keybindings/KeybindingContext.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'plugins',
      label: 'Plugins',
      description: 'Third-party extensibility — install, manage, and run plugins',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('plugins/builtinPlugins.md'),
        rel('utils/plugins/'),
        rel('commands/plugin/plugin.md'),
        rel('services/plugins/pluginOperations.md'),
        rel('services/plugins/PluginInstallationManager.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'tasks',
      label: 'Background Tasks',
      description: 'Background agents and shell tasks running alongside the main session',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('tasks.md'),
        rel('Task.md'),
        rel('tasks/LocalMainSessionTask.md'),
        rel('tasks/LocalShellTask/LocalShellTask.md'),
        rel('tasks/LocalAgentTask/LocalAgentTask.md'),
        rel('tasks/RemoteAgentTask/RemoteAgentTask.md'),
        rel('components/tasks.md'),
        rel('tools/TaskListTool/TaskListTool.md'),
        rel('tools/TaskGetTool/TaskGetTool.md'),
        rel('tools/TaskOutputTool/TaskOutputTool.md'),
        rel('tools/TaskCreateTool/TaskCreateTool.md'),
        rel('tools/TaskStopTool/TaskStopTool.md'),
      ],
      isLeaf: true,
    },

    // ─── LAYER 7: Advanced / niche ────────────────────────────────────
    {
      id: 'remote-mode',
      label: 'Remote / Bridge Mode',
      description: 'Run Claudette remotely with local permission forwarding',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('bridge/replBridge.md'),
        rel('bridge/bridgeApi.md'),
        rel('bridge/bridgeConfig.md'),
        rel('bridge/remoteBridgeCore.md'),
        rel('remote/RemoteSessionManager.md'),
        rel('remote/remotePermissionBridge.md'),
        rel('remote/SessionsWebSocket.md'),
        rel('remote/sdkMessageAdapter.md'),
        rel('server/directConnectManager.md'),
        rel('coordinator/coordinatorMode.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'lsp',
      label: 'LSP Integration',
      description: 'Language Server Protocol — diagnostics, definitions, references',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('services/lsp/LSPClient.md'),
        rel('services/lsp/LSPDiagnosticRegistry.md'),
        rel('services/lsp/LSPServerManager.md'),
        rel('services/lsp/manager.md'),
        rel('tools/LSPTool/LSPTool.md'),
        rel('tools/LSPTool/prompt.md'),
        rel('tools/LSPTool/formatters.md'),
        rel('services/diagnosticTracking.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'vim-mode',
      label: 'Vim Mode',
      description: 'Vim-style keybindings for the terminal input',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('vim/motions.md'),
        rel('vim/operators.md'),
        rel('vim/textObjects.md'),
        rel('vim/transitions.md'),
        rel('vim/types.md'),
        rel('components/VimTextInput.md'),
        rel('hooks/useVimInput.md'),
      ],
      isLeaf: true,
    },

    // ─── FOUNDATION: plumbing every layer needs ───────────────────────
    {
      id: 'state-management',
      label: 'State Management',
      description: 'App state store, selectors, reactive context, command history',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('state-management.md'),
        rel('state/store.md'),
        rel('state/selectors.md'),
        rel('state/AppState.md'),
        rel('state/AppStateStore.md'),
        rel('bootstrap/state.md'),
        rel('context.md'),
        rel('history.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'entry-points',
      label: 'Entry Points',
      description: 'CLI bootstrap, SDK exports, MCP server entry',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('main.md'),
        rel('entrypoints/cli.md'),
        rel('entrypoints/init.md'),
        rel('entrypoints/mcp.md'),
        rel('entrypoints/sdk/coreTypes.md'),
        rel('replLauncher.md'),
        rel('setup.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'utilities',
      label: 'Shared Utilities',
      description: 'Helpers used across the system — messages, config, file ops, git, etc.',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('utils/messages.md'),
        rel('utils/config.md'),
        rel('utils/file.md'),
        rel('utils/git.md'),
        rel('utils/fileStateCache.md'),
        rel('utils/systemPrompt.md'),
        rel('utils/sideQuestion.md'),
        rel('utils/undercover.md'),
        rel('utils/agenticSessionSearch.md'),
        rel('utils/memoize.md'),
        rel('utils/context.md'),
        rel('utils/errors.md'),
        rel('utils/gracefulShutdown.md'),
        rel('utils/cachePaths.md'),
        rel('utils/env.md'),
        rel('utils/platform.md'),
        rel('utils/claudemd.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'constants',
      label: 'Constants & Tool Limits',
      description: 'System constants, tool limits, error IDs, spinner verbs, product URLs',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('constants/common.md'),
        rel('constants/tools.md'),
        rel('constants/toolLimits.md'),
        rel('constants/messages.md'),
        rel('constants/keys.md'),
        rel('constants/files.md'),
        rel('constants/xml.md'),
        rel('constants/product.md'),
        rel('constants/errorIds.md'),
        rel('constants/spinnerVerbs.md'),
        rel('constants/turnCompletionVerbs.md'),
        rel('constants/figures.md'),
        rel('constants/apiLimits.md'),
        rel('constants/betas.md'),
        rel('constants/cyberRiskInstruction.md'),
      ],
      isLeaf: true,
    },

    // ─── Hooks & types (implementation detail, but needed for any port) ──
    {
      id: 'interaction-patterns',
      label: 'Interaction Patterns',
      description: 'Permission decisions, cancellation, text input, virtual scrolling, autocomplete, keybindings, settings access, command queue — the event handlers and stateful logic the UI needs, regardless of framework',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('input-handling.md'),
        rel('keybindings-spec.md'),
        rel('tool-permission-flow.md'),
        rel('hooks/useCanUseTool.md'),
        rel('hooks/useCancelRequest.md'),
        rel('hooks/useTerminalSize.md'),
        rel('hooks/useTextInput.md'),
        rel('hooks/useVirtualScroll.md'),
        rel('hooks/useTypeahead.md'),
        rel('hooks/useSettings.md'),
        rel('hooks/useCommandQueue.md'),
        rel('hooks/useExitOnCtrlCD.md'),
        rel('hooks/useGlobalKeybindings.md'),
        rel('hooks/toolPermission/'),
        rel('hooks/unifiedSuggestions.md'),
      ],
      isLeaf: true,
    },
    {
      id: 'types',
      label: 'Data Models & Type Contracts',
      description: 'Core data shapes: messages, permissions, commands, hooks, text input — the type contracts every implementation must honor regardless of language',
      path: basePath,
      required: true,
      children: [],
      files: [
        rel('types/permissions.md'),
        rel('types/command.md'),
        rel('types/ids.md'),
        rel('types/hooks.md'),
        rel('types/textInputTypes.md'),
      ],
      isLeaf: true,
    },

    // ─── Skip unless you're upgrading ─────────────────────────────────
    {
      id: 'migrations',
      label: 'Settings Migrations',
      description: 'Version-to-version settings migration scripts',
      path: basePath,
      required: false,
      children: [],
      files: [
        rel('migrations/migrateAutoUpdatesToSettings.md'),
        rel('migrations/migrateBypassPermissionsAcceptedToSettings.md'),
        rel('migrations/migrateFennecToOpus.md'),
        rel('migrations/migrateLegacyOpusToCurrent.md'),
        rel('migrations/migrateOpusToOpus1m.md'),
        rel('migrations/migrateSonnet1mToSonnet45.md'),
        rel('migrations/migrateSonnet45ToSonnet46.md'),
        rel('migrations/resetAutoModeOptInForDefaultOffer.md'),
        rel('migrations/resetProToOpusDefault.md'),
      ],
      isLeaf: true,
    },
  ];
}

/**
 * Resolve file paths relative to the actual claudette/ directory.
 * Walks the tree and fills in .path for each node.
 */
export async function resolveFeaturePaths(tree: FeatureNode[], basePath: string): Promise<FeatureNode[]> {
  return tree.map((node) => {
    const resolvedFiles = node.files
      .map((f) => f ? join(basePath, f.replace(/^\//, '')) : '')
      .filter(Boolean);

    // Also resolve children recursively
    const resolvedChildren = node.children.length > 0
      ? node.children.map((child) => {
          const childFiles = child.files
            .map((f) => f ? join(basePath, f.replace(/^\//, '')) : '')
            .filter(Boolean);
          return { ...child, files: childFiles, children: [] };
        })
      : [];

    // Merge child files into parent
    const allFiles = [...resolvedFiles, ...resolvedChildren.flatMap((c) => c.files)];

    return {
      ...node,
      files: [...new Set(allFiles)],
      children: resolvedChildren,
    };
  });
}
