use anyhow::Result;
use std::path::Path;

#[derive(Debug, Clone, Default)]
pub struct GitStatus {
    pub branch: Option<String>,
    pub status_text: String,
    pub has_changes: bool,
}

pub fn get_git_status(cwd: &Path) -> Result<Option<GitStatus>> {
    let repo = match git2::Repository::discover(cwd) {
        Ok(repo) => repo,
        Err(_) => return Ok(None),
    };

    let head = repo.head()?;
    let branch = head.shorthand().map(|s| s.to_string());

    let mut status_text = String::new();
    let mut has_changes = false;

    // Get working directory status
    let statuses = repo.statuses(None)?;
    if statuses.len() > 0 {
        has_changes = true;
        for entry in statuses.iter() {
            let path = entry.path().unwrap_or("?");
            let status = entry.status();

            let indicator =
                if status.is_index_new() || status.is_index_modified() || status.is_index_deleted()
                {
                    "M"
                } else if status.is_wt_new() {
                    "??"
                } else if status.is_wt_modified() {
                    " M"
                } else if status.is_wt_deleted() {
                    " D"
                } else {
                    "  "
                };

            status_text.push_str(&format!("{indicator} {path}\n"));
        }
    }

    // Truncate if too long
    let max_len = 2000;
    if status_text.len() > max_len {
        status_text = status_text[..max_len].to_string();
        status_text.push_str("\n... (truncated, run `git status` for full output)");
    }

    Ok(Some(GitStatus {
        branch,
        status_text,
        has_changes,
    }))
}

pub fn format_git_context(status: &GitStatus) -> String {
    let mut ctx = String::new();

    if let Some(branch) = &status.branch {
        ctx.push_str(&format!("Branch: {branch}\n"));
    }

    if status.has_changes {
        ctx.push_str("\nWorking tree changes:\n");
        ctx.push_str(&status.status_text);
    } else {
        ctx.push_str("\nWorking tree: clean");
    }

    ctx
}
