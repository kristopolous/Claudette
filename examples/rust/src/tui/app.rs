use crate::types::{StreamEvent, Usage};
use crossterm::event::{self, Event, KeyCode, KeyEvent, KeyModifiers};
use crossterm::terminal::{enable_raw_mode, disable_raw_mode};
use ratatui::{
    backend::CrosstermBackend,
    layout::{Constraint, Direction, Layout, Position},
    style::{Color, Modifier, Style},
    text::{Line, Text},
    widgets::{Block, Borders, Paragraph, Wrap},
    Frame, Terminal,
};
use std::io::{self, Write};
use tokio::sync::mpsc;
use unicode_width::UnicodeWidthStr;

#[derive(Debug, Clone)]
pub struct MessageEntry {
    pub role: String,
    pub content: String,
}

pub struct App {
    pub messages: Vec<MessageEntry>,
    pub input_buffer: String,
    pub is_loading: bool,
    pub usage: Usage,
    pub current_response: String,
    pub scroll_offset: usize,
    pub should_quit: bool,
    pub cursor_position: usize,
    pub should_submit: bool,
    pub history: Vec<String>,
    pub history_index: Option<usize>,
    pub kill_buffer: String,
    pub available_commands: Vec<String>,
}

impl App {
    pub fn new(available_commands: Option<Vec<String>>) -> Self {
        Self {
            messages: Vec::new(),
            input_buffer: String::new(),
            is_loading: false,
            usage: Usage::default(),
            current_response: String::new(),
            scroll_offset: 0,
            should_quit: false,
            cursor_position: 0,
            should_submit: false,
            history: Vec::new(),
            history_index: None,
            kill_buffer: String::new(),
            available_commands: available_commands.unwrap_or_default(),
        }
    }

    pub fn handle_key(&mut self, key: &KeyEvent) {
        match key.code {
            KeyCode::Char(c) => {
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'c' {
                    self.should_quit = true;
                    return;
                }
                // Ctrl+A: beginning of line
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'a' {
                    self.cursor_position = 0;
                    return;
                }
                // Ctrl+E: end of line
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'e' {
                    self.cursor_position = self.input_buffer.len();
                    return;
                }
                // Ctrl+B: backward char
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'b' {
                    if self.cursor_position > 0 {
                        self.cursor_position -= 1;
                    }
                    return;
                }
                // Ctrl+F: forward char
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'f' {
                    if self.cursor_position < self.input_buffer.len() {
                        self.cursor_position += 1;
                    }
                    return;
                }
                // Ctrl+K: kill to end
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'k' {
                    if self.cursor_position < self.input_buffer.len() {
                        self.kill_buffer = self.input_buffer.split_off(self.cursor_position);
                    } else {
                        self.kill_buffer.clear();
                    }
                    return;
                }
                // Ctrl+Y: yank
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'y' {
                    if !self.kill_buffer.is_empty() {
                        self.input_buffer.insert_str(self.cursor_position, &self.kill_buffer);
                        self.cursor_position += self.kill_buffer.len();
                    }
                    return;
                }
                // Ctrl+P: previous history
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'p' {
                    self.history_prev();
                    return;
                }
                // Ctrl+N: next history
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'n' {
                    self.history_next();
                    return;
                }
                // Normal character insertion
                self.input_buffer.insert(self.cursor_position, c);
                self.cursor_position += 1;
            }
            KeyCode::Backspace => {
                if self.cursor_position > 0 {
                    self.input_buffer.remove(self.cursor_position - 1);
                    self.cursor_position -= 1;
                }
            }
            KeyCode::Enter => {
                if key.modifiers.contains(KeyModifiers::SHIFT) {
                    // Insert newline at cursor
                    self.input_buffer.insert_str(self.cursor_position, "\n");
                    self.cursor_position += 1;
                } else {
                    self.should_submit = true;
                }
            }
            KeyCode::Left => {
                if self.cursor_position > 0 {
                    self.cursor_position -= 1;
                }
            }
            KeyCode::Right => {
                if self.cursor_position < self.input_buffer.len() {
                    self.cursor_position += 1;
                }
            }
            KeyCode::Home => {
                self.cursor_position = 0;
            }
            KeyCode::End => {
                self.cursor_position = self.input_buffer.len();
            }
            KeyCode::Up => {
                if self.scroll_offset > 0 {
                    self.scroll_offset -= 1;
                }
            }
            KeyCode::Down => {
                self.scroll_offset += 1;
            }
            KeyCode::Esc => {
                self.should_quit = true;
            }
            KeyCode::Tab => {
                // Autocomplete slash commands
                if self.input_buffer.starts_with('/') {
                    let prefix = self.input_buffer.trim();
                    if let Some((longest_common, completions)) = self.complete_command(prefix) {
                        if completions.len() == 1 {
                            // Single match: complete it
                            self.input_buffer = longest_common.to_string();
                            self.cursor_position = self.input_buffer.len();
                        } else if completions.len() > 1 && longest_common.len() > prefix.len() {
                            // Multiple matches: extend to common prefix
                            self.input_buffer = longest_common.to_string();
                            self.cursor_position = self.input_buffer.len();
                        }
                        // Could show completions in UI; for now just silent update
                    }
                }
            }
            _ => {}
        }
    }

    pub fn submit_input(&mut self) -> Option<String> {
        if self.should_submit {
            self.should_submit = false;
            let input = self.input_buffer.trim().to_string();
            if input.is_empty() {
                return None;
            }
            // Add to history if not duplicate of last entry
            if self.history.last() != Some(&input) {
                self.history.push(input.clone());
            }
            self.history_index = None;
            self.input_buffer.clear();
            self.cursor_position = 0;
            Some(input)
        } else {
            None
        }
    }

    fn history_prev(&mut self) {
        if self.history.is_empty() {
            return;
        }
        match self.history_index {
            None => {
                // Start browsing from the newest entry (last in history)
                self.history_index = Some(self.history.len() - 1);
                if let Some(idx) = self.history_index {
                    self.input_buffer = self.history[idx].clone();
                    self.cursor_position = self.input_buffer.len();
                }
            }
            Some(i) => {
                if i > 0 {
                    self.history_index = Some(i - 1);
                    self.input_buffer = self.history[self.history_index.unwrap()].clone();
                    self.cursor_position = self.input_buffer.len();
                }
            }
        }
    }

    fn history_next(&mut self) {
        match self.history_index {
            None => {}
            Some(i) => {
                if i + 1 < self.history.len() {
                    self.history_index = Some(i + 1);
                    self.input_buffer = self.history[self.history_index.unwrap()].clone();
                    self.cursor_position = self.input_buffer.len();
                } else {
                    self.history_index = None;
                    self.input_buffer.clear();
                    self.cursor_position = 0;
                }
            }
        }
    }

    fn complete_command(&self, prefix: &str) -> Option<(String, Vec<String>)> {
        let trimmed = prefix.trim();
        if !trimmed.starts_with('/') {
            return None;
        }
        let cmd_prefix = &trimmed[1..]; // after slash
        let mut matches: Vec<String> = self.available_commands.iter()
            .filter(|cmd| cmd.starts_with(cmd_prefix))
            .cloned()
            .collect();
        if matches.is_empty() {
            return None;
        }
        matches.sort();
        // Find longest common prefix
        let mut longest = matches[0].clone();
        for m in &matches[1..] {
            while !m.starts_with(&longest) {
                longest.pop();
                if longest.is_empty() {
                    break;
                }
            }
        }
        Some((format!("/{}", longest), matches))
    }

    pub fn handle_stream_event(&mut self, event: &StreamEvent) {
        match event {
            StreamEvent::StreamStart => {
                self.is_loading = true;
            }
            StreamEvent::TextDelta { delta } => {
                self.current_response.push_str(delta);
            }
            StreamEvent::ToolUseStart { name, .. } => {
                self.current_response
                    .push_str(&format!("\n🔧 Using tool: {}...\n", name));
            }
            StreamEvent::ToolUseEnd { name, .. } => {
                self.current_response
                    .push_str(&format!("\n✅ Tool '{}' completed\n", name));
            }
            StreamEvent::MessageEnd { message } => {
                if !self.current_response.is_empty() {
                    self.messages.push(MessageEntry {
                        role: "assistant".to_string(),
                        content: self.current_response.clone(),
                    });
                }
                self.current_response.clear();
                self.usage.accumulate(&message.usage);
                self.is_loading = false;
                // Auto-scroll to bottom (newest message) - set a large offset
                self.scroll_offset = 1_000_000;
            }
            StreamEvent::Error { message, .. } => {
                self.current_response
                    .push_str(&format!("\n❌ Error: {}", message));
                self.is_loading = false;
            }
            _ => {}
        }
    }

    pub fn add_user_message(&mut self, text: String) {
        self.messages.push(MessageEntry {
            role: "user".to_string(),
            content: text,
        });
        self.scroll_offset = 0;
    }
}

impl Default for App {
    fn default() -> Self {
        Self::new(None)
    }
}

pub fn ui(frame: &mut Frame, app: &App) {
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .margin(1)
        .constraints([
            Constraint::Min(1),
            Constraint::Length(3),
            Constraint::Length(1),
        ])
        .split(frame.area());

    // Build all lines from messages and current response
    let mut lines: Vec<Line<'_>> = Vec::new();

    // Helper to add styled lines from a message
    let add_message = |lines: &mut Vec<Line<'_>>, role: &str, content: &str| {
        let prefix = match role {
            "user" => "> ",
            _ => "",
        };
        let base_style = match role {
            "user" => Style::default().fg(Color::Cyan).add_modifier(Modifier::BOLD),
            _ => Style::default(),
        };
        let mut first = true;
        for line in content.lines() {
            let line_str = if first {
                format!("{}{}", prefix, line)
            } else {
                let indent = " ".repeat(prefix.len());
                format!("{}{}", indent, line)
            };
            first = false;

            // Determine style based on line content
            let line_style = if line.starts_with("🔧") {
                Style::default().fg(Color::Yellow)
            } else if line.starts_with("✅") {
                Style::default().fg(Color::Green)
            } else if line.starts_with("❌") {
                Style::default().fg(Color::Red)
            } else if line.starts_with("<thinking>") || line.starts_with("</thinking>") {
                Style::default().fg(Color::DarkGray)
            } else {
                base_style
            };
            lines.push(Line::styled(line_str, line_style));
        }
    };

    // Add all previous messages
    for msg in &app.messages {
        add_message(&mut lines, &msg.role, &msg.content);
    }
    // Add current streaming response, if any
    if !app.current_response.is_empty() {
        add_message(&mut lines, "assistant", &app.current_response);
    }

    let text = Text::from(lines);

    // Calculate available inner height for messages (subtract block borders)
    let area = chunks[0];
    let inner_height = area.height.saturating_sub(2) as usize;
    let total_lines = text.lines.len();
    let max_scroll = total_lines.saturating_sub(inner_height);
    let scroll_offset = app.scroll_offset.min(max_scroll);

    let message_block = Block::default()
        .title(format!("Messages{}", if app.is_loading { " [thinking...]" } else { "" }))
        .borders(Borders::ALL)
        .style(Style::default());

    let paragraph = Paragraph::new(text)
        .block(message_block)
        .wrap(Wrap { trim: false })
        .scroll((scroll_offset as u16, 0));

    frame.render_widget(paragraph, chunks[0]);

    // Input area
    let input_block = Block::default()
        .title("Input (Ctrl+C to quit, ↑↓ scroll, Tab autocomplete)")
        .borders(Borders::ALL)
        .style(Style::default());

    let input_widget = Paragraph::new(app.input_buffer.as_str())
        .block(input_block);
    frame.render_widget(input_widget, chunks[1]);

    // Cursor: multi-line aware positioning
    let before_cursor = &app.input_buffer[..app.cursor_position];
    let mut line_count = 0usize;
    let mut last_newline_pos = 0usize;
    for (i, &b) in before_cursor.as_bytes().iter().enumerate() {
        if b == b'\n' {
            line_count += 1;
            last_newline_pos = i + 1;
        }
    }
    let col_text = &before_cursor[last_newline_pos..];
    let cursor_x_offset = UnicodeWidthStr::width(col_text) as u16;
    let cursor_x = chunks[1].x + 1 + cursor_x_offset;
    // Clamp X to inner width
    let cursor_x = cursor_x.min(chunks[1].x + chunks[1].width - 2);
    let cursor_y = chunks[1].y + 1 + line_count as u16;
    // Clamp Y to inner height
    let cursor_y = cursor_y.min(chunks[1].y + chunks[1].height - 2);
    frame.set_cursor_position(Position::new(cursor_x, cursor_y));

    // Status bar
    let status = format!(
        "Tokens: {} in / {} out | Cost: ${:.4}",
        app.usage.input_tokens, app.usage.output_tokens, 0.0
    );
    let status_bar = Paragraph::new(status).style(
        Style::default()
            .fg(Color::Cyan)
            .add_modifier(Modifier::BOLD),
    );
    frame.render_widget(status_bar, chunks[2]);
}



pub async fn run_tui(
    mut app: App,
    mut event_rx: mpsc::Receiver<StreamEvent>,
    input_tx: mpsc::Sender<String>,
) -> Result<(), anyhow::Error> {
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    stdout.write_all(b"\x1b[?1049h")?; // Enter alternate screen
    stdout.flush()?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    loop {
        terminal.draw(|f| ui(f, &app))?;

        // Handle input events
        if event::poll(std::time::Duration::from_millis(50))? {
            if let Event::Key(key) = event::read()? {
                app.handle_key(&key);
                if app.should_quit {
                    break;
                }
                if let Some(input) = app.submit_input() {
                    if let Err(e) = input_tx.send(input).await {
                        eprintln!("Failed to send input: {}", e);
                    }
                }
            }
        }

        // Process streaming events from backend
        while let Ok(event) = event_rx.try_recv() {
            app.handle_stream_event(&event);
        }

        // Also handle async events in a non-blocking way
        tokio::task::yield_now().await;
    }

    disable_raw_mode()?;
    let mut stdout = io::stdout();
    stdout.write_all(b"\x1b[?1049l")?; // Leave alternate screen
    stdout.flush()?;
    Ok(())
}