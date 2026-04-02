use crate::tui::App;
use crossterm::{
    event::{self, DisableMouseCapture, EnableMouseCapture, Event, KeyCode, KeyEventKind},
    execute,
    terminal::{disable_raw_mode, enable_raw_mode, EnterAlternateScreen, LeaveAlternateScreen},
};
use ratatui::{backend::CrosstermBackend, Terminal};
use std::io;
use std::sync::Arc;
use tokio::sync::mpsc;

pub async fn run_tui(
    mut app: App,
    mut event_rx: mpsc::Receiver<crate::types::StreamEvent>,
    input_tx: mpsc::Sender<String>,
) -> anyhow::Result<()> {
    // Setup terminal
    enable_raw_mode()?;
    let mut stdout = io::stdout();
    execute!(stdout, EnterAlternateScreen, EnableMouseCapture)?;
    let backend = CrosstermBackend::new(stdout);
    let mut terminal = Terminal::new(backend)?;

    let result = run_app(&mut terminal, &mut app, &mut event_rx, &input_tx).await;

    // Restore terminal
    disable_raw_mode()?;
    execute!(
        terminal.backend_mut(),
        LeaveAlternateScreen,
        DisableMouseCapture
    )?;
    terminal.show_cursor()?;

    result
}

async fn run_app(
    terminal: &mut Terminal<CrosstermBackend<io::Stdout>>,
    app: &mut App,
    event_rx: &mut mpsc::Receiver<crate::types::StreamEvent>,
    input_tx: &mpsc::Sender<String>,
) -> anyhow::Result<()> {
    loop {
        // Draw UI
        terminal.draw(|f| crate::tui::ui(f, app))?;

        // Check for stream events (non-blocking)
        while let Ok(event) = event_rx.try_recv() {
            app.handle_stream_event(&event);
        }

        // Check for keyboard input (non-blocking poll)
        if crossterm::event::poll(std::time::Duration::from_millis(50))? {
            if let Event::Key(key) = event::read()? {
                if key.kind == KeyEventKind::Press {
                    if key.code == KeyCode::Enter && !app.is_loading {
                        if let Some(input) = app.submit_input() {
                            app.add_user_message(input.clone());
                            app.is_loading = true;
                            app.current_response.clear();
                            let _ = input_tx.send(input).await;
                        }
                    } else {
                        app.handle_key(&key);
                    }

                    if app.should_quit {
                        return Ok(());
                    }
                }
            }
        }
    }
}
