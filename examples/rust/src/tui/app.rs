use crate::markdown::render_markdown;
use crate::types::{StreamEvent, Usage};
use crossterm::event::{self, Event, KeyCode, KeyEvent, KeyModifiers};
use crossterm::terminal::{disable_raw_mode, enable_raw_mode};
use dirs;
use ratatui::{
    backend::CrosstermBackend,
    layout::{Alignment, Constraint, Direction, Layout, Position, Rect},
    style::{Color, Modifier, Style},
    text::{Line, Span, Text},
    widgets::{Block, Borders, Paragraph},
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
    pub usage: Usage,
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
            usage: Usage::default(),
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
            Constraint::Length(1),
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

    // Pre-render all messages and current_response as message bundles (role + lines)
    #[allow(unused)]
    enum MessageRole {
        User,
        Assistant,
        Spacing,
    }
    let mut bundles: Vec<(MessageRole, Vec<Line<'static>>)> = Vec::new();
    for msg in &app.messages {
        let raw = render_markdown(&msg.content);
        let is_user = msg.role == "user";
        let wrap_width = if is_user { inner.width } else { inner.width.saturating_sub(1) };
        let mut wrapped = wrap_text(&raw, wrap_width);
        // For assistant, color tool result lines and add left margin
        if !is_user {
            // Color status lines
            for line in &mut wrapped {
                let plain: String = line.spans.iter().map(|s| s.content.as_ref()).collect();
                if plain == "[Tool result: ok]" {
                    *line = Line::from(Span::styled(
                        plain,
                        Style::default().fg(Color::Green).add_modifier(Modifier::BOLD),
                    ));
                } else if plain == "[Tool result: error]" {
                    *line = Line::from(Span::styled(
                        plain,
                        Style::default().fg(Color::Red).add_modifier(Modifier::BOLD),
                    ));
                }
            }
            // Add left margin space
            for line in &mut wrapped {
                let mut new_spans = vec![Span::raw(" ")];
                new_spans.extend(line.spans.clone());
                *line = Line::from(new_spans);
            }
        }
        let role = if is_user { MessageRole::User } else { MessageRole::Assistant };
        bundles.push((role, wrapped));
        bundles.push((MessageRole::Spacing, vec![Line::from("")]));
    }
    if !app.current_response.is_empty() {
        let raw = render_markdown(&app.current_response);
        // assistant response: wrap with width-1 and add left margin
        let wrap_width = inner.width.saturating_sub(1);
        let mut wrapped = wrap_text(&raw, wrap_width);
        // Color status lines
        for line in &mut wrapped {
            let plain: String = line.spans.iter().map(|s| s.content.as_ref()).collect();
            if plain == "[Tool result: ok]" {
                *line = Line::from(Span::styled(
                    plain,
                    Style::default().fg(Color::Green).add_modifier(Modifier::BOLD),
                ));
            } else if plain == "[Tool result: error]" {
                *line = Line::from(Span::styled(
                    plain,
                    Style::default().fg(Color::Red).add_modifier(Modifier::BOLD),
                ));
            }
        }
        // Add left margin space
        for line in &mut wrapped {
            let mut new_spans = vec![Span::raw(" ")];
            new_spans.extend(line.spans.clone());
            *line = Line::from(new_spans);
        }
        bundles.push((MessageRole::Assistant, wrapped));
        bundles.push((MessageRole::Spacing, vec![Line::from("")]));
    }
    let mut bundles: Vec<(MessageRole, Vec<Line<'static>>)> = Vec::new();
    for msg in &app.messages {
        let raw = render_markdown(&msg.content);
        let is_user = msg.role == "user";
        let wrap_width = if is_user { inner.width } else { inner.width.saturating_sub(1) };
        let mut wrapped = wrap_text(&raw, wrap_width);
        // For assistant, prepend a space as left margin
        if !is_user {
            for line in &mut wrapped {
                let mut new_spans = vec![Span::raw(" ")];
                new_spans.extend(line.spans.clone());
                *line = Line::from(new_spans);
            }
        }
        let role = if is_user { MessageRole::User } else { MessageRole::Assistant };
        bundles.push((role, wrapped));
        bundles.push((MessageRole::Spacing, vec![Line::from("")]));
    }
    if !app.current_response.is_empty() {
        let raw = render_markdown(&app.current_response);
        // assistant response: wrap with width-1 and add left margin space
        let wrap_width = inner.width.saturating_sub(1);
        let mut wrapped = wrap_text(&raw, wrap_width);
        for line in &mut wrapped {
            let mut new_spans = vec![Span::raw(" ")];
            new_spans.extend(line.spans.clone());
            *line = Line::from(new_spans);
        }
        bundles.push((MessageRole::Assistant, wrapped));
        bundles.push((MessageRole::Spacing, vec![Line::from("")]));
    }

    // Compute total height for scroll
    let total_lines: usize = bundles.iter().map(|(_, lines)| lines.len()).sum();
    let visible = inner.height as usize;
    let max_scroll = if total_lines > visible { total_lines - visible } else { 0 };

    // Auto-scroll handling
    if app.auto_scroll {
        app.scroll_offset = max_scroll;
    } else if app.scroll_offset > max_scroll {
        app.scroll_offset = max_scroll;
    }
    if app.scroll_offset == max_scroll {
        app.auto_scroll = true;
    }
    let scroll_offset = app.scroll_offset;

    // Render visible message bundles with backgrounds as whole paragraphs
    let mut y: usize = 0;
    for (role, lines) in &bundles {
        let h = lines.len();
        // Skip if entirely above viewport
        if y + h <= scroll_offset {
            y += h;
            continue;
        }
        // Stop if beyond bottom
        if y >= scroll_offset + visible {
            break;
        }
        let render_y = inner.y + (y as u16).saturating_sub(scroll_offset as u16);
        let avail = inner.height.saturating_sub(render_y - inner.y);
        let render_h = std::cmp::min(h as u16, avail);
        let area = Rect::new(inner.x, render_y, inner.width, render_h);
        let text = Text::from_iter(lines.iter().cloned());
        match role {
            MessageRole::User => {
                let para = Paragraph::new(text)
                    .alignment(Alignment::Right);
                frame.render_widget(para, area);
            }
            MessageRole::Assistant => {
                let para = Paragraph::new(text)
                    .style(Style::default().bg(Color::Rgb(20, 20, 20))) // dark grey #141414
                    .alignment(Alignment::Left);
                frame.render_widget(para, area);
            }
            MessageRole::Spacing => {
                // blank line, no background
                frame.render_widget(Paragraph::new(text), area);
            }
        }
        y += h;
    }

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

    // Status bar with modern color
    let status = format!(
        "Tokens: {} in / {} out | Cost: ${:.4}",
        app.usage.input_tokens, app.usage.output_tokens, 0.0
    );
    let status_bar = Paragraph::new(status).style(
        Style::default()
            .fg(Color::Rgb(0, 200, 150))
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