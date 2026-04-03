import { Tool, ToolUseContext } from '../../types'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export const BashTool: Tool = {
  name: 'Bash',
  description: 'Execute a shell command in a sandboxed workspace directory. The shell runs in the workspace directory, so file operations affect real files there. Destructive operations outside the workspace are not allowed.',
  input_schema: {
    type: 'object',
    properties: {
      command: {
        type: 'string',
        description: 'The shell command to execute',
      },
    },
    required: ['command'],
  },
  execute: async (input, context: ToolUseContext) => {
    const command = input.command as string
    const workspace = context.vfs.baseDir

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: workspace,
        timeout: 30000,
        maxBuffer: 1024 * 1024,
        env: { ...process.env, HOME: workspace, TERM: 'xterm-256color' },
      })
      let output = ''
      if (stdout) output += stdout
      if (stderr) output += stderr
      return output || '(no output)'
    } catch (e: any) {
      let output = ''
      if (e.stdout) output += e.stdout
      if (e.stderr) output += e.stderr
      if (e.code) output += `\n[Exit code: ${e.code}]`
      if (!output) output = e.message || String(e)
      return output
    }
  },
}
