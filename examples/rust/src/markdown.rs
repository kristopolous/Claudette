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
            // Prepend a zero-width space marker to indicate this line is from code (no wrap)
            let mut marked = vec![Span::raw("\u{200B}")];
            marked.extend(spans);
            lines.push(Line::from(marked));
        }
        lines
    } else {
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
/// - Tables (with borders)
pub fn render_markdown(input: &str) -> Text<'static> {
    let options = Options::ENABLE_TABLES;
    let parser = Parser::new_ext(input, options);
    let mut lines: Vec<Line<'static>> = Vec::new();
    let mut current_spans: Vec<Span<'static>> = Vec::new();
    let mut indent_stack: Vec<usize> = Vec::new(); // track list depth

    let flush_line = |spans: &mut Vec<Span<'static>>, lines: &mut Vec<Line<'static>>| {
        if !spans.is_empty() {
            lines.push(Line::from(spans.clone()));
            spans.clear();
        }
    };

    // Table state
    struct Table {
        headers: Vec<Vec<Span<'static>>>,
        rows: Vec<Vec<Vec<Span<'static>>>>,
    }
    let mut in_table = false;
    let mut current_table: Option<Table> = None;
    let mut current_row: Vec<Vec<Span<'static>>> = Vec::new();
    let mut current_cell: Vec<Span<'static>> = Vec::new();
    let mut in_code_block = false;
    let mut code_content = String::new();
    let mut code_lang: Option<String> = None;

    fn compute_column_widths(table: &Table) -> Vec<usize> {
        let col_count = table.headers.len();
        if col_count == 0 {
            return Vec::new();
        }
        let mut widths = vec![0; col_count];
        // Helper to measure cell width in display columns
        let measure = |cell: &Vec<Span>| -> usize {
            cell.iter()
                .map(|span| unicode_width::UnicodeWidthStr::width(span.content.as_ref()))
                .sum()
        };
        // Headers
        for (col_i, cell) in table.headers.iter().enumerate() {
            let w = measure(cell);
            widths[col_i] = w.max(widths[col_i]);
        }
        // Rows
        for row in &table.rows {
            for (col_i, cell) in row.iter().enumerate() {
                if col_i < col_count {
                    let w = measure(cell);
                    widths[col_i] = w.max(widths[col_i]);
                }
            }
        }
        widths
    }

    /// Apply styling to tool output lines based on prefix
    fn maybe_style_tool_output(part: &str, spans: &mut Vec<Span<'static>>) {
        let trimmed = part.trim();
        let style = if trimmed.starts_with("🔧 Using tool") || trimmed.starts_with("✅ Tool") {
            Some(Style::default().fg(Color::Rgb(221, 153, 238))) // purple
        } else if trimmed.starts_with("Successfully") || trimmed.starts_with("Wrote") {
            Some(Style::default().fg(Color::Rgb(150, 150, 150))) // muted gray
        } else if trimmed.starts_with("❌ Error") || trimmed.starts_with("[Tool result: error]") {
            Some(Style::default().fg(Color::Red).add_modifier(Modifier::BOLD))
        } else {
            None
        };
        if let Some(s) = style {
            spans.push(Span::styled(part.to_string(), s));
        } else {
            spans.push(Span::raw(part.to_string()));
        }
    }

    fn render_table(table: Table) -> Vec<Line<'static>> {
        let widths = compute_column_widths(&table);
        let mut out = Vec::new();
        let n = widths.len();
        if n == 0 {
            return out;
        }
        // Helper to build a horizontal line
        let horizontal = |edges: &str, fill: &str, mids: &str, edges2: &str| {
            let mut line = String::from(edges);
            for (i, &w) in widths.iter().enumerate() {
                line.push_str(&fill.repeat(w + 2));
                if i + 1 < widths.len() {
                    line.push_str(mids);
                } else {
                    line.push_str(edges2);
                }
            }
            Line::from(Span::raw(line))
        };
        // Build a row from raw cell strings
        let build_row = |cells: Vec<String>| -> Line<'static> {
            let mut line = String::from("│");
            for (i, cell) in cells.iter().enumerate() {
                // Each cell segment is exactly widths[i] + 2 chars: one leading space, content left-aligned, then padding to fill
                let segment = format!(" {:<width$}", cell, width = widths[i] + 1);
                line.push_str(&segment);
                line.push('│');
            }
            Line::from(Span::raw(line))
        };
        // Top border
        out.push(horizontal("┌", "─", "┬", "┐"));
        // Header row
        let header_cells: Vec<String> = table
            .headers
            .iter()
            .map(|cell| cell.iter().map(|s| s.content.as_ref()).collect())
            .collect();
        out.push(build_row(header_cells));
        // Header separator
        out.push(horizontal("├", "─", "┼", "┤"));
        // Data rows
        for row in table.rows {
            let row_cells: Vec<String> = row
                .iter()
                .map(|cell| cell.iter().map(|s| s.content.as_ref()).collect())
                .collect();
            out.push(build_row(row_cells));
        }
        // Bottom border
        out.push(horizontal("└", "─", "┴", "┘"));
        out
    }

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
                Tag::Table(_) => {
                    in_table = true;
                    current_table = Some(Table {
                        headers: Vec::new(),
                        rows: Vec::new(),
                    });
                }
                Tag::TableHead => {}
                Tag::TableRow => {
                    if in_table {
                        current_row = Vec::new();
                    }
                }
                Tag::TableCell => {
                    current_cell = Vec::new();
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
                    let highlighted = highlight_code(&code_content, code_lang.as_deref());
                    lines.extend(highlighted);
                    // Add spacing after code block
                    lines.push(Line::from(""));
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
                TagEnd::Table => {
                    if let Some(table) = current_table.take() {
                        lines.extend(render_table(table));
                    }
                    in_table = false;
                }
                TagEnd::TableHead => {
                    if !current_cell.is_empty() {
                        current_row.push(current_cell.drain(..).collect());
                    }
                    if let Some(ref mut table) = current_table {
                        table.headers = current_row.drain(..).collect();
                    }
                }
                TagEnd::TableRow => {
                    if !current_cell.is_empty() {
                        current_row.push(current_cell.drain(..).collect());
                    }
                    if let Some(ref mut table) = current_table {
                        table.rows.push(current_row.drain(..).collect());
                    }
                }
                TagEnd::TableCell => {
                    if !current_cell.is_empty() {
                        current_row.push(current_cell.drain(..).collect());
                    }
                }
                TagEnd::FootnoteDefinition => {}
                _ => {}
            },
            Event::Text(text) => {
                if !text.is_empty() {
                    if in_code_block {
                        code_content.push_str(&text);
                    } else if in_table {
                        // Table cell: treat each line as separate cell spans? Simpler: treat as raw
                        current_cell.push(Span::raw(text.to_string()));
                    } else {
                        // Split on newlines to preserve line breaks
                        let mut first = true;
                        for part in text.split('\n') {
                            if first {
                                first = false;
                                if !part.is_empty() {
                                    maybe_style_tool_output(part, &mut current_spans);
                                }
                            } else {
                                flush_line(&mut current_spans, &mut lines);
                                if part.is_empty() {
                                    lines.push(Line::from(""));
                                } else {
                                    maybe_style_tool_output(part, &mut current_spans);
                                }
                            }
                        }
                    }
                }
            }
            Event::Code(text) => {
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

    #[test]
    fn test_markdown_table() {
        let md = "| A | B |\n|---|---|\n| 1 | 2 |";
        let text = render_markdown(md);
        assert!(!text.lines.is_empty());
    }
}
