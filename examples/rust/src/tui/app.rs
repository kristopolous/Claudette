use crate::types::{StreamEvent, Usage};
use crossterm::event::{self, Event, KeyCode, KeyEvent, KeyModifiers};
use crossterm::terminal::{enable_raw_mode, disable_raw_mode};
use ratatui::{
    backend::CrosstermBackend,
    layout::{Constraint, Direction, Layout, Position},
    style::{Color, Modifier, Style},
    text::{Line, Span},
    widgets::{Block, Borders, List, ListItem, Paragraph, Wrap},
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
}

impl App {
    pub fn new() -> Self {
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
        }
    }

    pub fn handle_key(&mut self, key: &KeyEvent) {
        match key.code {
            KeyCode::Char(c) => {
                if key.modifiers.contains(KeyModifiers::CONTROL) && c == 'c' {
                    self.should_quit = true;
                    return;
                }
                // Insert character at cursor position
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
                self.should_submit = true;
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
                if self.scroll_offset < self.messages.len().saturating_sub(1) {
                    self.scroll_offset += 1;
                }
            }
            KeyCode::Down => {
                if self.scroll_offset > 0 {
                    self.scroll_offset -= 1;
                }
            }
            KeyCode::Esc => {
                self.should_quit = true;
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
            self.input_buffer.clear();
            self.cursor_position = 0;
            Some(input)
        } else {
            None
        }
    }

    pub fn handle_stream_event(&mut self, event: &StreamEvent) {
        match event {
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
                self.scroll_offset = 0;
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
        Self::new()
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

    let mut items: Vec<ListItem> = Vec::new();

    let visible_start = app.scroll_offset;
    let visible_end = app.messages.len();

    for i in (visible_start..visible_end).rev() {
        let msg = &app.messages[i];
        let prefix = match msg.role.as_str() {
            "user" => "> ",
            "assistant" => "",
            _ => "",
        };

        let style = match msg.role.as_str() {
            "user" => Style::default()
                .fg(Color::Cyan)
                .add_modifier(Modifier::BOLD),
            "assistant" => Style::default(),
            _ => Style::default(),
        };

        for line in msg.content.lines() {
            let styled_line = if line.starts_with("🔧") {
                Line::from(Span::styled(
                    line.to_string(),
                    Style::default().fg(Color::Yellow),
                ))
            } else if line.starts_with("✅") {
                Line::from(Span::styled(
                    line.to_string(),
                    Style::default().fg(Color::Green),
                ))
            } else if line.starts_with("❌") {
                Line::from(Span::styled(
                    line.to_string(),
                    Style::default().fg(Color::Red),
                ))
            } else if line.starts_with("<thinking>") || line.starts_with("</thinking>") {
                Line::from(Span::styled(
                    line.to_string(),
                    Style::default().fg(Color::DarkGray),
                ))
            } else {
                Line::from(Span::styled(format!("{prefix}{line}"), style))
            };
            items.push(ListItem::new(styled_line));
        }

        items.push(ListItem::new(Line::from("")));
    }

    if !app.current_response.is_empty() {
        for line in app.current_response.lines() {
            let styled_line = if line.starts_with("🔧") {
                Line::from(Span::styled(
                    line.to_string(),
                    Style::default().fg(Color::Yellow),
                ))
            } else if line.starts_with("✅") {
                Line::from(Span::styled(
                    line.to_string(),
                    Style::default().fg(Color::Green),
                ))
            } else if line.starts_with("❌") {
                Line::from(Span::styled(
                    line.to_string(),
                    Style::default().fg(Color::Red),
                ))
            } else if line.starts_with("<thinking>") || line.starts_with("</thinking>") {
                Line::from(Span::styled(
                    line.to_string(),
                    Style::default().fg(Color::DarkGray),
                ))
            } else {
                Line::from(Span::styled(line.to_string(), Style::default()))
            };
            items.push(ListItem::new(styled_line));
        }
    }

    let loading_indicator = if app.is_loading { " [thinking...]" } else { "" };
    let message_block = Block::default()
        .title(format!("Messages{loading_indicator}"))
        .borders(Borders::ALL)
        .style(Style::default());

    let list = List::new(items).block(message_block);
    frame.render_widget(list, chunks[0]);

    let input_block = Block::default()
        .title("Input (Ctrl+C to quit, ↑↓ scroll)")
        .borders(Borders::ALL)
        .style(Style::default());

     let input_widget = Paragraph::new(app.input_buffer.as_str())
         .block(input_block)
         .wrap(Wrap { trim: false });
     frame.render_widget(input_widget, chunks[1]);

     // Compute cursor x position based on text width up to cursor (handling double-width chars)
     let text_before_cursor = &app.input_buffer[..app.cursor_position];
     let cursor_x_offset = UnicodeWidthStr::width(text_before_cursor) as u16;
     let input_x = 1 + cursor_x_offset;
     let input_y = chunks[1].y + 1;
     frame.set_cursor_position(Position::new(
         input_x.min(chunks[1].width - 2 + chunks[1].x),
         input_y,
     ));

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