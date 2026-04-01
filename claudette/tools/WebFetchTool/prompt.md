# WebFetchTool/prompt.ts

## Purpose

Exports the WebFetch tool name, description, and a helper to construct the secondary model prompt. The prompt guides the AI in extracting information from fetched web content, with stricter rules for non-preapproved domains to mitigate copyright concerns.

## Imports

- **Stdlib**: None
- **External**: None
- **Internal**: None

## Logic

- `WEB_FETCH_TOOL_NAME = 'WebFetch'`
- `DESCRIPTION`: Multi-line string documenting:
  - What the tool does (fetch URL, convert HTML→markdown, process with small model)
  - When to use (retrieve and analyze web content)
  - Usage notes:
    - Prefer MCP-provided WebFetch if available (fewer restrictions)
    - URL must be fully-formed; HTTP upgraded to HTTPS automatically
    - Prompt should describe desired extraction
    - Read-only; may summarize large content
    - 15-minute cache for repeated accesses
    - Redirects: tool informs and returns redirect info; need new WebFetch with new URL
    - GitHub URLs: prefer `gh` CLI via Bash instead
- `makeSecondaryModelPrompt(markdownContent, prompt, isPreapprovedDomain): string`:
  - Builds prompt for the secondary (Haiku) model
  - Includes:
    - "Web page content:" section with markdown between `---` delimiters
    - The user's extraction `prompt`
    - `guidelines` depending on domain trust:
      - Preapproved: "Provide a concise response based on the content above. Include relevant details, code examples, and documentation excerpts as needed."
      - Non-preapproved: Stricter rules:
        - 125-char max for quotes
        - Use quotation marks for exact language; avoid paraphrasing as identical
        - Not a lawyer, don't comment on legality
        - Never reproduce exact song lyrics
  - Returns complete prompt string

## Exports

- `WEB_FETCH_TOOL_NAME: string`
- `DESCRIPTION: string`
- `makeSecondaryModelPrompt(markdownContent: string, prompt: string, isPreapprovedDomain: boolean): string`
