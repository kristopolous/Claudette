use crate::markdown::render_markdown;
use crate::types::StreamEvent;
use crossterm::event::{self, Event, KeyCode, KeyEvent, KeyModifiers};
use crossterm::terminal::{disable_raw_mode, enable_raw_mode};
use dirs;
use ratatui::{
    backend::CrosstermBackend,
    layout::{Constraint, Direction, Layout, Position, Rect},
    style::{Color, Modifier, Style},
    text::{Line, Span, Text},
    widgets::{Block, Borders, Clear, Paragraph},
    Frame, Terminal,
};
use serde::{Deserialize, Serialize};
use std::io::{self, Write};
use tokio::sync::mpsc;
use unicode_width::{UnicodeWidthStr, UnicodeWidthChar};

#[derive(Debug, Clone, Serialize, Deserialize)]
struct PersistentHistory {
    messages: Vec<MessageEntry>,
    command_history: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MessageEntry {
    pub role: String,
    pub content: String,
}

const HISTORY_FILE: &str = ".claudette_history.json";
const MAX_HISTORY_ITEMS: usize = 1000;

pub struct App {
    pub messages: Vec<MessageEntry>,
    pub input_buffer: String,
    pub is_loading: bool,
    pub current_response: String,
    pub scroll_offset: usize,
    pub auto_scroll: bool,
    pub should_quit: bool,
    pub cursor_position: usize,
    pub should_submit: bool,
    pub history: Vec<String>,
    pub history_index: Option<usize>,
    pub kill_buffer: String,
    pub available_commands: Vec<String>,
    history_file: std::path::PathBuf,
}

impl App {
    pub fn new(available_commands: Option<Vec<String>>) -> Self {
        // Determine history file path in config directory
        let history_file = dirs::config_dir()
            .unwrap_or_else(|| std::path::PathBuf::from("."))
            .join("claudette")
            .join(HISTORY_FILE);

        // Try to load persisted history
        let (messages, command_history) = if let Ok(data) = std::fs::read_to_string(&history_file) {
            if let Ok(hist) = serde_json::from_str::<PersistentHistory>(&data) {
                (hist.messages, hist.command_history)
            } else {
                (Vec::new(), Vec::new())
            }
        } else {
            (Vec::new(), Vec::new())
        };

        Self {
            messages,
            input_buffer: String::new(),
            is_loading: false,
            current_response: String::new(),
            scroll_offset: 0,
            auto_scroll: true,
            should_quit: false,
            cursor_position: 0,
            should_submit: false,
            history: command_history,
            history_index: None,
            kill_buffer: String::new(),
            available_commands: available_commands.unwrap_or_default(),
            history_file,
        }
    }

    fn save_history(&self) {
        if let Some(parent) = self.history_file.parent() {
            let _ = std::fs::create_dir_all(parent);
        }
        // Keep only most recent N messages to limit file size
        let messages = if self.messages.len() > MAX_HISTORY_ITEMS {
            self.messages
                .split_at(self.messages.len() - MAX_HISTORY_ITEMS)
                .1
                .to_vec()
        } else {
            self.messages.clone()
        };
        let hist = PersistentHistory {
            messages,
            command_history: self.history.clone(),
        };
        if let Ok(data) = serde_json::to_string_pretty(&hist) {
            let _ = std::fs::write(&self.history_file, data);
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
            KeyCode::Up => {
                if self.scroll_offset > 0 {
                    self.scroll_offset -= 1;
                }
                self.auto_scroll = false;
            }
            KeyCode::Down => {
                self.scroll_offset += 1;
            }
            KeyCode::PageUp => {
                if let Ok((_, height)) = crossterm::terminal::size() {
                    let lines_per_page = height.saturating_sub(10) as usize;
                    self.scroll_offset = self.scroll_offset.saturating_sub(lines_per_page);
                } else {
                    self.scroll_offset = self.scroll_offset.saturating_sub(20);
                }
                self.auto_scroll = false;
            }
            KeyCode::PageDown => {
                if let Ok((_, height)) = crossterm::terminal::size() {
                    let lines_per_page = height.saturating_sub(10) as usize;
                    self.scroll_offset += lines_per_page;
                } else {
                    self.scroll_offset += 20;
                }
                self.auto_scroll = false;
            }
            KeyCode::Home => {
                self.scroll_offset = 0;
                self.auto_scroll = false;
            }
            KeyCode::End => {
                self.scroll_offset = 1_000_000; // will be clamped in rendering
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
                // Keep history bounded
                if self.history.len() > MAX_HISTORY_ITEMS {
                    self.history.remove(0);
                }
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
                    .push_str(&format!("\n🔧 Using tool: {}...\n\n", name));
            }
            StreamEvent::ToolUseEnd { name, .. } => {
                self.current_response
                    .push_str(&format!("\n✅ Tool '{}' completed\n\n", name));
            }
            StreamEvent::MessageEnd { message: _ } => {
                if !self.current_response.is_empty() {
                    self.messages.push(MessageEntry {
                        role: "assistant".to_string(),
                        content: self.current_response.clone(),
                    });
                }
                self.current_response.clear();
                self.is_loading = false;
            }
            StreamEvent::Error { message, .. } => {
                self.current_response
                    .push_str(&format!("\n❌ Error: {}", message));
                self.is_loading = false;
            }
            StreamEvent::ClearScreen => {
                self.messages.clear();
                self.current_response.clear();
                self.scroll_offset = 0;
                self.auto_scroll = true;
            }
            _ => {}
        }
    }

    pub fn add_user_message(&mut self, text: String) {
        self.messages.push(MessageEntry {
            role: "user".to_string(),
            content: text,
        });
        self.auto_scroll = true;
    }
}

impl Default for App {
    fn default() -> Self {
        Self::new(None)
    }
}

// Word wrapping: split a line into chunks by spaces, then pack into lines.
fn split_line_into_chunks(line: &Line) -> Vec<(Style, String)> {
    let mut chunks = Vec::new();
    for span in &line.spans {
        let style = span.style;
        let content = &span.content;
        let mut start = 0;
        let bytes = content.as_bytes();
        for i in 0..bytes.len() {
            if bytes[i] == b' ' {
                if start < i {
                    chunks.push((style, content[start..i].to_string()));
                }
                chunks.push((style, " ".to_string()));
                start = i + 1;
            }
        }
        if start < content.len() {
            chunks.push((style, content[start..].to_string()));
        }
    }
    chunks
}

fn wrap_chunks(chunks: Vec<(Style, String)>, max_width: usize) -> Vec<Line<'static>> {
    let mut result = Vec::new();
    let mut current_line: Vec<Span<'static>> = Vec::new();
    let mut current_width = 0;

    for (style, chunk) in chunks.into_iter() {
        let chunk_width = chunk.width();
        if chunk_width == 0 {
            continue;
        }
        if current_width == 0 {
            current_line.push(Span::styled(chunk.clone(), style));
            current_width = chunk_width;
        } else {
            if current_width + chunk_width <= max_width {
                current_line.push(Span::styled(chunk.clone(), style));
                current_width += chunk_width;
            } else {
                // Flush current line
                result.push(Line::from(current_line));
                current_line = Vec::new();
                if chunk_width > max_width {
                    // Split the long word into pieces of max_width (character-level)
                    let mut start = 0;
                    while start < chunk.len() {
                        let mut line_width = 0;
                        let mut end = start;
                        for (i, c) in chunk[start..].char_indices() {
                            let cw = c.width().unwrap_or(1);
                            if line_width + cw > max_width {
                                break;
                            }
                            line_width += cw;
                            end = start + i + c.len_utf8();
                        }
                        if end == start {
                            if let Some(c) = chunk[start..].chars().next() {
                                end = start + c.len_utf8();
                            } else {
                                break;
                            }
                        }
                        let part = &chunk[start..end];
                        result.push(Line::from(Span::styled(part.to_string(), style)));
                        start = end;
                    }
                    current_line = Vec::new();
                    current_width = 0;
                } else {
                    current_line.push(Span::styled(chunk.clone(), style));
                    current_width = chunk_width;
                }
            }
        }
    }
    if !current_line.is_empty() {
        result.push(Line::from(current_line));
    }
    result
}

fn wrap_text(text: &Text, max_width: u16) -> Vec<Line<'static>> {
    let max_width = max_width as usize;
    if max_width == 0 {
        return Vec::new();
    }
    let mut result = Vec::new();
    for line in &text.lines {
        // Check if this line is a code line (starts with sentinel)
        if let Some(first_span) = line.spans.first() {
            if first_span.content.starts_with('\u{200B}') {
                // Strip the sentinel and push line as-is (no wrap)
                let stripped: Vec<Span> = line
                    .spans
                    .iter()
                    .skip(1)
                    .map(|s| Span::styled(s.content.to_string(), s.style))
                    .collect();
                result.push(Line::from(stripped));
                continue;
            }
        }
        // Normal text: perform word wrapping
        let chunks = split_line_into_chunks(line);
        let wrapped = wrap_chunks(chunks, max_width);
        result.extend(wrapped);
    }
    result
}

pub fn ui(frame: &mut Frame, app: &mut App) {
    let outer_margin = 1;
    let inner_padding = 1;
    let chunks = Layout::default()
        .direction(Direction::Vertical)
        .margin(outer_margin)
        .constraints([
            Constraint::Min(1),
            Constraint::Length(3),
        ])
        .split(frame.area());

    // Render messages block
    let message_area = chunks[0];
    let title_style = Style::default().fg(Color::Rgb(0, 150, 255)).add_modifier(Modifier::BOLD);
    let message_block = Block::default()
        .title(format!("Messages{}", if app.is_loading { " [thinking...]" } else { "" }))
        .borders(Borders::ALL)
        .border_style(Style::default().fg(Color::Rgb(120, 120, 120)))
        .title_style(title_style);
    frame.render_widget(message_block, message_area);

    // Inner area with padding
    let inner = Rect::new(
        message_area.x + inner_padding + 1,
        message_area.y + inner_padding + 1,
        message_area.width.saturating_sub(2 * (inner_padding + 1)),
        message_area.height.saturating_sub(2 * (inner_padding + 1)),
     );

    // Clear the inner area to prevent artifacts from previous frames
    frame.render_widget(Clear, inner);

    // Render messages with proper alignment and code preservation
    // Build all lines into a flat buffer
    let mut flat_lines: Vec<Line<'static>> = Vec::new();

    // Helper to compute display width of a line
    let line_width = |line: &Line| -> usize {
        line.spans.iter().map(|s| s.content.as_ref().width()).sum()
    };

    // Helper to add a message to flat_lines with alignment
    let mut add_message = |role: &str, content: &str| {
        let raw = render_markdown(content);
        let is_user = role == "user";
        let wrap_width = if is_user { inner.width } else { inner.width.saturating_sub(1) };
        let mut wrapped = wrap_text(&raw, wrap_width);
        // Assistant: prepend a space as left margin
        if !is_user {
            for line in &mut wrapped {
                let mut new_spans = vec![Span::raw(" ")];
                new_spans.extend(line.spans.clone());
                *line = Line::from(new_spans);
            }
        }
        // User: right-align by padding with leading spaces
        if is_user {
            for line in &mut wrapped {
                let w = line_width(line);
                if w < inner.width as usize {
                    let spaces = inner.width as usize - w;
                    let mut new_spans = vec![Span::raw(" ".repeat(spaces))];
                    new_spans.extend(line.spans.clone());
                    *line = Line::from(new_spans);
                }
            }
        }
        flat_lines.extend(wrapped);
        // spacing between messages
        flat_lines.push(Line::from(""));
    };

    for msg in &app.messages {
        add_message(&msg.role, &msg.content);
    }
    if !app.current_response.is_empty() {
        add_message("assistant", &app.current_response);
    }

    // Remove trailing blank line
    if flat_lines.last().map(|l| l.spans.is_empty() && line_width(l) == 0).unwrap_or(false) {
        flat_lines.pop();
    }

    let total_lines = flat_lines.len();
    let visible = inner.height as usize;
    let max_scroll = if total_lines > visible { total_lines - visible } else { 0 };

    if app.auto_scroll {
        app.scroll_offset = max_scroll;
    } else if app.scroll_offset > max_scroll {
        app.scroll_offset = max_scroll;
    }
    if app.scroll_offset == max_scroll {
        app.auto_scroll = true;
    }

    // Slice visible lines and render directly (no Paragraph::scroll to avoid wrap artifacts)
    let start = app.scroll_offset;
    let end = (start + visible).min(total_lines);
    let visible_lines: Vec<Line<'static>> = flat_lines[start..end].to_vec();
    let text = Text::from(visible_lines);
    let paragraph = Paragraph::new(text);
    frame.render_widget(paragraph, inner);



    // Input area with muted border
    let input_block = Block::default()
        .title("Input (Ctrl+C to quit, ↑↓ scroll, Tab autocomplete)")
        .borders(Borders::ALL)
        .border_style(Style::default().fg(Color::Rgb(120, 120, 120)))
        .title_style(Style::default().fg(Color::Rgb(200, 200, 200)));

    let input_widget = Paragraph::new(app.input_buffer.as_str())
        .block(input_block);
    frame.render_widget(input_widget, chunks[1]);

    // Cursor positioning
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
        terminal.draw(|f| ui(f, &mut app))?;

        // Handle input events
        if event::poll(std::time::Duration::from_millis(50))? {
            match event::read()? {
                Event::Key(key) => {
                    app.handle_key(&key);
                    if app.should_quit {
                        break;
                    }
                    if let Some(input) = app.submit_input() {
                        // Don't add slash commands to message history
                        if !input.starts_with('/') {
                            app.add_user_message(input.clone());
                        }
                        if let Err(e) = input_tx.send(input).await {
                            eprintln!("Failed to send input: {}", e);
                        }
                    }
                }
                Event::Mouse(mouse_event) => {
                    use crossterm::event::MouseEventKind;
                    match mouse_event.kind {
                        MouseEventKind::ScrollUp => {
                            app.auto_scroll = false;
                            app.scroll_offset = app.scroll_offset.saturating_sub(3);
                        }
                        MouseEventKind::ScrollDown => {
                            app.auto_scroll = false;
                            app.scroll_offset += 3;
                        }
                        _ => {}
                    }
                }
                _ => {}
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
    // Save history before exit
    app.save_history();
    let mut stdout = io::stdout();
    stdout.write_all(b"\x1b[?1049l")?; // Leave alternate screen
    stdout.flush()?;
    Ok(())
}