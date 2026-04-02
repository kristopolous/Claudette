use crate::mcp::protocol::{JsonRpcMessage, JsonRpcRequest, JsonRpcResponse};
use anyhow::Result;
use async_trait::async_trait;
use std::process::Stdio;
use tokio::io::{AsyncBufReadExt, AsyncWriteExt, BufReader};
use tokio::process::{Child, ChildStdin, ChildStdout, Command};

#[async_trait]
pub trait McpTransport: Send + Sync {
    async fn send(&mut self, message: &JsonRpcMessage) -> Result<()>;
    async fn recv(&mut self) -> Result<Option<JsonRpcMessage>>;
    async fn close(&mut self) -> Result<()>;
}

pub struct StdioTransport {
    child: Child,
    stdin: ChildStdin,
    stdout: BufReader<ChildStdout>,
    next_id: u64,
}

impl StdioTransport {
    pub async fn new(command: &str, args: &[&str], env: Option<Vec<(String, String)>>) -> Result<Self> {
        let mut cmd = Command::new(command);
        cmd.args(args)
            .stdin(Stdio::piped())
            .stdout(Stdio::piped())
            .stderr(Stdio::piped())
            .kill_on_drop(true);

        if let Some(env_vars) = env {
            for (key, value) in env_vars {
                cmd.env(key, value);
            }
        }

        let mut child = cmd.spawn()?;
        let stdin = child.stdin.take().ok_or_else(|| anyhow::anyhow!("Failed to get stdin"))?;
        let stdout = child.stdout.take().ok_or_else(|| anyhow::anyhow!("Failed to get stdout"))?;

        Ok(Self {
            child,
            stdin,
            stdout: BufReader::new(stdout),
            next_id: 1,
        })
    }

    pub async fn send_request(&mut self, method: &str, params: serde_json::Value) -> Result<JsonRpcResponse> {
        let id = self.next_id;
        self.next_id += 1;

        let request = JsonRpcMessage::Request(JsonRpcRequest {
            jsonrpc: "2.0".to_string(),
            id,
            method: method.to_string(),
            params,
        });

        self.send(&request).await?;

        loop {
            match self.recv().await? {
                Some(JsonRpcMessage::Response(resp)) if resp.id == id => return Ok(resp),
                Some(JsonRpcMessage::Response(_)) => continue,
                Some(JsonRpcMessage::Notification(_)) => continue,
                Some(JsonRpcMessage::Request(_)) => continue,
                None => return Err(anyhow::anyhow!("Connection closed before response received")),
            }
        }
    }
}

#[async_trait]
impl McpTransport for StdioTransport {
    async fn send(&mut self, message: &JsonRpcMessage) -> Result<()> {
        let json = serde_json::to_string(message)?;
        self.stdin.write_all(json.as_bytes()).await?;
        self.stdin.write_all(b"\n").await?;
        self.stdin.flush().await?;
        Ok(())
    }

    async fn recv(&mut self) -> Result<Option<JsonRpcMessage>> {
        let mut line = String::new();
        let bytes_read = self.stdout.read_line(&mut line).await?;
        if bytes_read == 0 {
            return Ok(None);
        }
        let message: JsonRpcMessage = serde_json::from_str(line.trim())?;
        Ok(Some(message))
    }

    async fn close(&mut self) -> Result<()> {
        self.child.kill().await?;
        Ok(())
    }
}
