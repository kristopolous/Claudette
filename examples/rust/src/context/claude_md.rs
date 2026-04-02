use anyhow::Result;
use std::path::{Path, PathBuf};
use tokio::fs;

const CLAUDE_MD_FILES: &[&str] = &[
    "CLAUDE.md",
    ".claude/CLAUDE.md",
    ".github/CLAUDE.md",
];

pub async fn find_claude_md(cwd: &Path) -> Result<Vec<(PathBuf, String)>> {
    let mut results = Vec::new();

    for file in CLAUDE_MD_FILES {
        let path = cwd.join(file);
        if path.exists() && path.is_file() {
            if let Ok(content) = fs::read_to_string(&path).await {
                results.push((path, content));
            }
        }
    }

    // Also search parent directories
    let mut current = cwd.to_path_buf();
    while let Some(parent) = current.parent() {
        for file in CLAUDE_MD_FILES {
            let path = parent.join(file);
            if path.exists() && path.is_file() {
                if let Ok(content) = fs::read_to_string(&path).await {
                    // Only add if not already found
                    if !results.iter().any(|(p, _)| p == &path) {
                        results.push((path, content));
                    }
                }
            }
        }

        // Stop at git root
        if parent.join(".git").exists() {
            break;
        }

        current = parent.to_path_buf();
    }

    Ok(results)
}

pub async fn format_claude_md_context(cwd: &Path) -> Result<String> {
    let files = find_claude_md(cwd).await?;

    if files.is_empty() {
        return Ok(String::new());
    }

    let mut context = String::from("\n\n# Project Context (from CLAUDE.md files)\n\n");

    for (path, content) in &files {
        let rel_path = path.strip_prefix(cwd).unwrap_or(path);
        context.push_str(&format!("## {}\n\n", rel_path.display()));
        context.push_str(content);
        context.push_str("\n\n---\n\n");
    }

    Ok(context)
}
