use super::ast::{Icon, Image, Swiper, SwiperItem, VNode, Vprops};
use image::io::Reader as ImageReader;
use image_base64::from_base64;
use std::io::Cursor;

pub fn parser(data: &VNode, image_path: &str) -> String {
    parse_fragment(data, image_path)
}

fn parse_fragment(data: &VNode, image_path: &str) -> String {
    let figment = parse_node(data, image_path);
    let res = format!("<view>{figment}</view>");
    res
}

fn parse_node(vnode: &VNode, image_path: &str) -> String {
    let mut el = String::from("");
    for node in &vnode.children {
        // 同一树枝上的节点
        let deep_node = parse_node(node, image_path);
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
                image_path,
            );
        } else {
            back_node = write_tag(
                &node.name,
                &deep_node,
                node.class.clone().unwrap(),
                node.props.clone().unwrap(),
                image_path,
            );
        }
        el = format!("{}{}", el, back_node)
    }
    el
}
fn write_tag(name: &str, content: &str, class: String, props: Vprops, image_path: &str) -> String {
    // println!("{:?}", name);
    format!("<{name} class={:?}>{content}</{name}>", class);
    match name {
        "view" | "text" => format!("<{name} class={:?}>{content}</{name}>", class),
        "swiper" => write_swiper(name, class.clone(), props.swiper.unwrap(), image_path),
        "image" => write_image(name, class.clone(), props.img.unwrap(), image_path),
        "icon" => write_icon(name, props.icon.unwrap()),
        _ => format!("<{name} class={:?}>{content}</{name}>", class),
    }
}

fn write_swiper(name: &str, class: String, props: Swiper, image_path: &str) -> String {
    let mut items = String::from("");
    for item in props.items {
        items = format!("{}{}", items, write_swiper_item(item, &class, image_path));
    }
    format!(
        "<{name} autoplay='{}' interval='{}' indicator-dots='{}' class={:?}>{}</{name}>",
        props.auto_play, props.auto_play_delay, props.pagination, class, items
    )
}

fn write_swiper_item(props: SwiperItem, class: &str, image_path: &str) -> String {
    if props.status {
        let relative_path = image_operate(props.content, &class, image_path, Some(props.id));
        format!(
            "<swiper-item><image src='{}'  style='width: 100%;height:100%' ></image></swiper-item>",
            relative_path
        )
    } else {
        String::from("")
    }
}

fn write_image(name: &str, class: String, props: Image, image_path: &str) -> String {
    let relative_path = image_operate(props.src, &class, image_path, None);
    format!("<{name} src='{}' class='{}' alt=''></{name}>", relative_path,class)
}

fn write_icon(name: &str, props: Icon) -> String {
    let icon = props.content;
    format!(
        "<{name} type='{}' size='{}'></{name}>",
        icon.icon_type, icon.icon_size
    )
}

fn image_operate(src: String, class: &str, image_path: &str, id: Option<i32>) -> String {
    if src == "/src/assets/default.png".to_string() {
        let relative_path = "/images/default.png".to_string();
        relative_path
    } else {
        let bytes = from_base64(src.clone());
        let mut image_name = format!("{}", class);
        if let Some(num) = id {
            image_name = format!("{}-{}", image_name, num);
        }
        let image_full = format!("{}.png", image_name);
        let image = ImageReader::new(Cursor::new(bytes))
            .with_guessed_format()
            .expect("guessed format")
            .decode()
            .expect("decode");
        let path = format!("{}/images/{}", image_path, image_full);
        let relative_path = format!("/images/{}", image_full);
        image.save(path).unwrap();
        relative_path
    }
}
