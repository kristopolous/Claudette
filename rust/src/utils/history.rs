use anyhow::Result;
use serde::{Deserialize, Serialize};
use std::path::{Path, PathBuf};
use tokio::fs::{self, OpenOptions};
use tokio::io::AsyncWriteExt;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HistoryEntry {
    pub id: String,
    pub timestamp: chrono::DateTime<chrono::Utc>,
    pub project_path: Option<String>,
    pub session_id: Option<String>,
    pub text: String,
}

pub struct HistoryStore {
    history_file: PathBuf,
    pending: Vec<HistoryEntry>,
}

impl HistoryStore {
    pub async fn new() -> Result<Self> {
        let config_dir = dirs::config_dir()
            .unwrap_or_else(|| PathBuf::from("."))
            .join("claudette");

        fs::create_dir_all(&config_dir).await?;

        let history_file = config_dir.join("history.jsonl");

        Ok(Self {
            history_file,
            pending: Vec::new(),
        })
    }

    pub async fn add_entry(&mut self, entry: HistoryEntry) -> Result<()> {
        self.pending.push(entry);
        self.flush_pending().await
    }

    async fn flush_pending(&mut self) -> Result<()> {
        if self.pending.is_empty() {
            return Ok(());
        }

        let mut file = OpenOptions::new()
            .create(true)
            .append(true)
            .open(&self.history_file)
            .await?;

        for entry in self.pending.drain(..) {
            let line = serde_json::to_string(&entry)?;
            file.write_all(line.as_bytes()).await?;
            file.write_all(b"\n").await?;
        }

        file.flush().await?;
        Ok(())
    }

    pub async fn get_history(&self, limit: usize, project_path: Option<&str>) -> Result<Vec<HistoryEntry>> {
        if !self.history_file.exists() {
            return Ok(Vec::new());
        }

        let content = fs::read_to_string(&self.history_file).await?;
        let mut entries: Vec<HistoryEntry> = Vec::new();

        for line in content.lines() {
            if line.trim().is_empty() {
                continue;
            }
            if let Ok(entry) = serde_json::from_str::<HistoryEntry>(line) {
                if let Some(project) = project_path {
                    if entry.project_path.as_deref() == Some(project) {
                        entries.push(entry);
                    }
                } else {
                    entries.push(entry);
                }

                if entries.len() >= limit {
                    break;
                }
            }
        }

        entries.reverse();
        Ok(entries)
    }

    pub fn remove_last(&mut self) {
        self.pending.pop();
    }

    pub fn clear_pending(&mut self) {
        self.pending.clear();
    }
}

pub fn format_pasted_text_ref(num_lines: usize) -> String {
    format!("[Pasted text +{num_lines} lines]")
}

pub fn format_image_ref(id: u64) -> String {
    format!("[Image #{id}]")
}
