use crate::tools::*;
use crate::types::ToolRegistry;

pub fn register_builtin_tools(registry: &mut ToolRegistry) {
    registry.register(Box::new(BashTool::new()));
    registry.register(Box::new(ReadTool));
    registry.register(Box::new(WriteTool));
    registry.register(Box::new(EditTool));
    registry.register(Box::new(GlobTool));
    registry.register(Box::new(GrepTool));
    registry.register(Box::new(TodoWriteTool));
    registry.register(Box::new(WebFetchTool::new()));
    registry.register(Box::new(WebSearchTool::new()));
}
