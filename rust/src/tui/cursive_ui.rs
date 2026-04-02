use crate::types::{StreamEvent, Usage};
use anyhow::Result;
use cursive::prelude::*;
use cursive::{
    self,
    views::{Dialog, EditView, ScrollView, TextView, LinearLayout},
    Cursive,
};
use std::cell::RefCell;
use tokio::sync::mpsc;

/// Simple message entry for UI display
struct MessageEntry {
    role: String,
    content: String,
}

/// Runs the Cursive-based TUI
pub async fn run_tui(
    mut event_rx: tokio::sync::mpsc::Receiver<StreamEvent>,
    input_tx: tokio::sync::mpsc::Sender<String>,
) -> Result<()> {
    #[derive(Default)]
    struct AppState {
        messages: Vec<MessageEntry>,
        current_response: String,
        usage: Usage,
        is_loading: bool,
    }

    let mut siv = Cursive::new();

    // Store state and event receiver in user data
    siv.set_user_data(RefCell::new(AppState::default()));
    siv.set_user_data(RefCell::new(Some(event_rx)));

    // Set up update callback: process events and refresh UI
    siv.set_on_update(move |siv| {
        // Drain all pending events from the channel
        let mut rx_opt = siv.user_data::<RefCell<Option<tokio::sync::mpsc::Receiver<StreamEvent>>>>().unwrap();
        if let Some(rx) = &mut *rx_opt {
            loop {
                match rx.try_recv() {
                    Ok(event) => {
                        let mut state = siv.user_data::<RefCell<AppState>>().unwrap().borrow_mut();
                        match event {
                            StreamEvent::TextDelta { delta } => {
                                state.current_response.push_str(&delta);
                            }
                            StreamEvent::ToolUseStart { name, .. } => {
                                state.current_response.push_str(&format!("\n🔧 Using tool: {}...\n", name));
                            }
                            StreamEvent::ToolUseEnd { name, .. } => {
                                state.current_response.push_str(&format!("\n✅ Tool '{}' completed\n", name));
                            }
                            StreamEvent::MessageEnd { message } => {
                                if !state.current_response.is_empty() {
                                    state.messages.push(MessageEntry {
                                        role: "assistant".to_string(),
                                        content: state.current_response.clone(),
                                    });
                                    state.current_response.clear();
                                }
                                state.usage.accumulate(&message.usage);
                                state.is_loading = false;
                            }
                            StreamEvent::Error { message, .. } => {
                                state.current_response.push_str(&format!("\n❌ Error: {}", message));
                                state.is_loading = false;
                            }
                            _ => {}
                        }
                    }
                    Err(tokio::sync::mpsc::error::TryRecvError::Empty) => break,
                    Err(tokio::sync::mpsc::error::TryRecvError::Disconnected) => {
                        *rx_opt = None;
                        break;
                    }
                }
            }
        }

        // Build display string from state
        let state = siv.user_data::<RefCell<AppState>>().unwrap().borrow();
        let mut display = String::new();
        for msg in &state.messages {
            let prefix = match msg.role.as_str() {
                "user" => "> ",
                "assistant" => "",
                _ => "",
            };
            display.push_str(&format!("{}{}\n\n", prefix, msg.content));
        }
        if !state.current_response.is_empty() {
            display.push_str(&state.current_response);
            if !state.current_response.ends_with('\n') {
                display.push('\n');
            }
        }
        if state.is_loading {
            display.push_str("\n[thinking...]\n");
        }

        // Update the chat TextView (wrapped in WithId)
        siv.call_on_id("chat_text", |view: &mut WithId<TextView>| {
            view.set_content(display.clone());
        });

        // Scroll the ScrollView to bottom
        let _ = siv.call_on_id(
            "chat_scroll",
            |view: &mut WithId<ScrollView<WithId<TextView>>>| {
                view.scroll_to_bottom();
            },
        );
    });

    // Build UI components with IDs using View::with_id
    let text_view = TextView::new("").with_id("chat_text");
    let scroll_view = ScrollView::new(text_view).with_id("chat_scroll");

    let input_tx_clone = input_tx.clone();
    let editor = EditView::new()
        .with_id("input_editor")
        .on_submit(move |siv, input: &str| {
            if input.trim().is_empty() {
                return;
            }
            if let Err(e) = input_tx_clone.try_send(input.to_string()) {
                siv.add_layer(Dialog::info(format!("Failed to send input: {}", e)));
                return;
            }
            {
                let mut state = siv.user_data::<RefCell<AppState>>().unwrap().borrow_mut();
                state.messages.push(MessageEntry {
                    role: "user".to_string(),
                    content: input.to_string(),
                });
                state.is_loading = true;
                state.current_response.clear();
            }
            siv.call_on_id("input_editor", |view: &mut EditView| {
                view.set_content("");
            });
            siv.force_update();
        });

    // Build layout using builder pattern
    let layout = LinearLayout::vertical()
        .child(scroll_view)
        .child(editor);

    siv.add_layer(layout);

    // Global shortcut to quit
    siv.add_global_callback('q', |s| s.quit());

    // Run the event loop (run() returns Result<()>)
    siv.run()?;
    Ok(())
}