use super::ast::{VNode};

pub fn parser(data: &VNode) -> String {
    parse_fregment(data)
}

fn parse_fregment(data: &VNode) -> String {
    let figment = parse_node(data);
    let res = format!("<view>{figment}</view>");
    res
}

fn parse_node(vnode: &VNode) -> String {
    let mut el = String::from("");
    for node in &vnode.children {
        // 同一树枝上的节点
        let deep_node = parse_node(node);
        // 同一层内的节点
        let back_node:String;
        if node.children.len() == 0 {
            back_node = write_tag(&node.name, node.content.as_ref().unwrap_or(&"".to_string()),node.class.clone().unwrap());
        } else {
            back_node = write_tag(&node.name, &deep_node,node.class.clone().unwrap());
        }
        el = format!("{}{}", el, back_node)
    }
    el
}
fn write_tag(name: &str, content: &str, class: String) -> String {
    format!("<{name} class={:?}>{content}</{name}>",class)
}




