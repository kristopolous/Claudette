use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum TaskType {
    LocalBash,
    LocalAgent,
    RemoteAgent,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub enum TaskStatus {
    Pending,
    Running,
    Completed,
    Failed,
    Killed,
}

impl TaskStatus {
    pub fn is_terminal(&self) -> bool {
        matches!(
            self,
            TaskStatus::Completed | TaskStatus::Failed | TaskStatus::Killed
        )
    }
}

#[derive(Debug, Clone)]
pub struct Task {
    pub id: String,
    pub name: String,
    pub task_type: TaskType,
    pub status: TaskStatus,
    pub description: String,
    pub output_path: Option<String>,
}

pub fn generate_task_id(task_type: &TaskType) -> String {
    let prefix = match task_type {
        TaskType::LocalBash => "b",
        TaskType::LocalAgent => "a",
        TaskType::RemoteAgent => "r",
    };
    let uuid = Uuid::new_v4()
        .to_string()
        .replace('-', "")
        .chars()
        .take(8)
        .collect::<String>();
    format!("{prefix}{uuid}")
}
