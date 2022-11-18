use super::ast::VNode;
pub fn parser_wxss(data: &VNode) -> String {
    parse_style(data)
}

fn parse_style(vnode: &VNode) -> String {
    let mut st = String::from("");
    for node in &vnode.children {
        let class = if let None = node.class {
            "view".to_string()
        } else {
            node.class.clone().unwrap()
        };
        let deep_style = parse_style(node);
        let style = node.style.as_ref().unwrap().to_style_sheet();
        let class_str = write_class(class, style);
        st = format!("{}{}{}", st, class_str, deep_style);
    }
    st
}

fn write_class(class_name: String, style: String) -> String {
    let s = format!(".{}{{{}}}",class_name,style);
    s
}
