use super::ast::{Icon, Image, Swiper, SwiperItem, VNode, Vprops};

pub fn parser(data: &VNode) -> String {
    parse_fragment(data)
}

fn parse_fragment(data: &VNode) -> String {
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
        let back_node: String;
        if node.name == "swiper-item" {
            continue;
        }
        if node.children.len() == 0 {
            back_node = write_tag(
                &node.name,
                node.content.as_ref().unwrap_or(&"".to_string()),
                node.class.clone().unwrap(),
                node.props.clone().unwrap(),
            );
        } else {
            back_node = write_tag(
                &node.name,
                &deep_node,
                node.class.clone().unwrap(),
                node.props.clone().unwrap(),
            );
        }
        el = format!("{}{}", el, back_node)
    }
    el
}
fn write_tag(name: &str, content: &str, class: String, props: Vprops) -> String {
    // println!("{:?}", name);
    format!("<{name} class={:?}>{content}</{name}>", class);
    match name {
        "view" | "text" => format!("<{name} class={:?}>{content}</{name}>", class),
        "swiper" => write_swiper(name, class.clone(), props.swiper.unwrap()),
        "image" => write_image(name, props.img.unwrap()),
        "icon" => write_icon(name, props.icon.unwrap()),
        _ => format!("<{name} class={:?}>{content}</{name}>", class),
    }
}

fn write_swiper(name: &str, class: String, props: Swiper) -> String {
    let mut items = String::from("");
    for item in props.items {
        items = format!("{}{}", items, write_swiper_item(item));
    }
    format!(
        "<{name} autoplay='{}' interval='{}' indicator-dots='{}' class={:?}>{}</{name}>",
        props.auto_play, props.auto_play_delay, props.pagination, class, items
    )
}

fn write_swiper_item(props: SwiperItem) -> String {
    if props.status {
        format!("<swiper-item><img src='{}' /></swiper-item>", props.content)
    } else {
        String::from("")
    }
}

fn write_image(name: &str, props: Image) -> String {
    format!("<{name} src='{}' alt=''></{name}>",props.src)
}

fn write_icon(name: &str, props: Icon) -> String {
    let icon = props.content;
    format!(
        "<{name} type='{}' size='{}'></{name}>",
        icon.icon_type, icon.icon_size
    )
}
