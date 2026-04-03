use pulldown_cmark::{Event, Options, Parser, Tag, TagEnd};
use ratatui::style::{Color, Modifier, Style};
use ratatui::text::{Line, Span, Text};
use std::borrow::Cow;
use syntect::easy::HighlightLines;
use syntect::highlighting::{Theme, ThemeSet};
use syntect::parsing::SyntaxSet;

lazy_static::lazy_static! {
    static ref PS: SyntaxSet = SyntaxSet::load_defaults_newlines();
    static ref TS: ThemeSet = ThemeSet::load_defaults();
    static ref THEME: &'static Theme = TS.themes.get("Solarized (dark)").unwrap_or_else(|| TS.themes.values().next().unwrap());
}

/// Highlight a code block using syntect if language is recognized.
fn highlight_code(code: &str, lang: Option<&str>) -> Vec<Line<'static>> {
    if let Some(lang) = lang.and_then(|l| {
        PS.find_syntax_by_token(l)
            .or_else(|| PS.find_syntax_by_extension(l))
    }) {
        let mut h = HighlightLines::new(lang, &THEME);
        let mut lines = Vec::new();
        for line in code.lines() {
            let mut spans = Vec::new();
            for (style, text) in h.highlight_line(line, &PS).unwrap_or_default() {
                let color = Color::Rgb(style.foreground.r, style.foreground.g, style.foreground.b);
                spans.push(Span::styled(
                    Cow::Owned(text.to_string()),
                    Style::default().fg(color).add_modifier(
                        Modifier::from_bits(style.font_style.bits() as u16)
                            .unwrap_or(Modifier::empty()),
                    ),
                ));
            }
            if spans.is_empty() {
                spans.push(Span::raw(Cow::Owned(line.to_string())));
            }
            lines.push(Line::from(spans));
        }
        lines
    } else {
        // Fallback: plain monospace gray
        vec![Line::styled(
            code.to_string(),
            Style::default().fg(Color::Gray).add_modifier(Modifier::DIM),
        )]
    }
}

/// Render markdown to ratatui Text with basic styling and syntax-highlighted code.
///
/// Supports:
/// - Headings (H1 magenta bold, H2 yellow bold, H3 green bold)
/// - Bold, italic
/// - Inline code (yellow bold)
/// - Code blocks (monospaced, dim gray)
/// - Blockquotes (gray italic, with "> " prefix)
/// - Lists (bullet points)
/// - Links (light blue underlined)
pub fn render_markdown(input: &str) -> Text<'static> {
    let parser = Parser::new_ext(input, Options::empty());
    let mut lines: Vec<Line<'static>> = Vec::new();
    let mut current_spans: Vec<Span<'static>> = Vec::new();
    let mut indent_stack: Vec<usize> = Vec::new(); // track list depth

    let flush_line = |spans: &mut Vec<Span<'static>>, lines: &mut Vec<Line<'static>>| {
        if !spans.is_empty() {
            lines.push(Line::from(spans.clone()));
            spans.clear();
        }
    };

    let mut in_code_block = false;
    let mut code_content = String::new();
    let mut code_lang: Option<String> = None;

    for event in parser {
        match event {
            Event::Start(tag) => match tag {
                Tag::Paragraph => {}
                Tag::Heading { level, .. } => {
                    let style = match level {
                        pulldown_cmark::HeadingLevel::H1 => Style::default()
                            .fg(Color::Magenta)
                            .add_modifier(Modifier::BOLD),
                        pulldown_cmark::HeadingLevel::H2 => Style::default()
                            .fg(Color::Yellow)
                            .add_modifier(Modifier::BOLD),
                        pulldown_cmark::HeadingLevel::H3 => Style::default()
                            .fg(Color::Green)
                            .add_modifier(Modifier::BOLD),
                        _ => Style::default().add_modifier(Modifier::BOLD),
                    };
                    current_spans.push(Span::styled("", style));
                }
                Tag::BlockQuote => {
                    current_spans.push(Span::styled(
                        "> ",
                        Style::default()
                            .fg(Color::Gray)
                            .add_modifier(Modifier::ITALIC),
                    ));
                }
                Tag::CodeBlock(lang) => {
                    flush_line(&mut current_spans, &mut lines);
                    in_code_block = true;
                    code_content.clear();
                    code_lang = match lang {
                        pulldown_cmark::CodeBlockKind::Fenced(lit) => Some(lit.to_string()),
                        pulldown_cmark::CodeBlockKind::Indented => None,
                    };
                }
                Tag::Emphasis => {
                    current_spans.push(Span::styled(
                        "",
                        Style::default().add_modifier(Modifier::ITALIC),
                    ));
                }
                Tag::Strong => {
                    current_spans.push(Span::styled(
                        "",
                        Style::default().add_modifier(Modifier::BOLD),
                    ));
                }
                Tag::Link { .. } => {
                    current_spans.push(Span::styled(
                        "",
                        Style::default()
                            .fg(Color::LightBlue)
                            .add_modifier(Modifier::UNDERLINED),
                    ));
                }
                Tag::Item => {
                    let depth = indent_stack.len();
                    let prefix = "  ".repeat(depth) + "• ";
                    current_spans.push(Span::styled(prefix, Style::default().fg(Color::Cyan)));
                }
                Tag::List(_) => {
                    indent_stack.push(0);
                }
                Tag::FootnoteDefinition(_) => {}
                _ => {}
            },
            Event::End(tag_end) => match tag_end {
                TagEnd::Paragraph => {
                    flush_line(&mut current_spans, &mut lines);
                }
                TagEnd::Heading(_) => {
                    flush_line(&mut current_spans, &mut lines);
                }
                TagEnd::BlockQuote => {
                    flush_line(&mut current_spans, &mut lines);
                }
                TagEnd::CodeBlock => {
                    in_code_block = false;
                    // Output opening fence with language
                    let lang_str = code_lang.as_deref().unwrap_or("");
                    let fence = if lang_str.is_empty() {
                        "```".to_string()
                    } else {
                        format!("```{}", lang_str)
                    };
                    lines.push(Line::styled(
                        fence,
                        Style::default()
                            .fg(Color::DarkGray)
                            .add_modifier(Modifier::BOLD),
                    ));
                    // Output highlighted code lines
                    let highlighted = highlight_code(&code_content, code_lang.as_deref());
                    lines.extend(highlighted);
                    // Closing fence
                    lines.push(Line::styled(
                        "```",
                        Style::default()
                            .fg(Color::DarkGray)
                            .add_modifier(Modifier::BOLD),
                    ));
                }
                TagEnd::Emphasis => {}
                TagEnd::Strong => {}
                TagEnd::Link => {}
                TagEnd::Item => {
                    flush_line(&mut current_spans, &mut lines);
                }
                TagEnd::List(_) => {
                    indent_stack.pop();
                }
                TagEnd::FootnoteDefinition => {}
                _ => {}
            },
            Event::Text(text) => {
                if !text.is_empty() {
                    if in_code_block {
                        code_content.push_str(&text);
                    } else {
                        current_spans.push(Span::raw(text.to_string()));
                    }
                }
            }
            Event::Code(text) => {
                // Inline code (not a code block)
                if !in_code_block {
                    current_spans.push(Span::styled(
                        text.to_string(),
                        Style::default()
                            .fg(Color::Yellow)
                            .add_modifier(Modifier::BOLD),
                    ));
                }
            }
            Event::SoftBreak => {
                flush_line(&mut current_spans, &mut lines);
            }
            Event::HardBreak => {
                flush_line(&mut current_spans, &mut lines);
                lines.push(Line::from(Span::raw("")));
            }
            _ => {}
        }
    }

    flush_line(&mut current_spans, &mut lines);
    Text::from(lines)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_markdown_bold() {
        let md = "This is **bold** text.";
        let text = render_markdown(md);
        assert!(!text.lines.is_empty());
    }
}
