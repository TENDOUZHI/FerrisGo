
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Style {
    pub width: String,
    pub height: String,
    pub font_size: String,
    pub color: String,
    pub margin_top: String,
    pub margin_bottom: String,
    pub margin_left: String,
    pub margin_right: String,
    pub padding_top: String,
    pub padding_bottom: String,
    pub padding_left: String,
    pub padding_right: String,
    pub border_radius: String,
    pub border_width: String,
    pub border_color: String,
    pub background_color: String,
    pub opacity: String,
    pub display: String,
    pub flex_direction: String,
    pub justify_content: String,
    pub justify_items: String,
    pub align_content: String,
    pub align_items: String,
}

impl Style {
    pub fn to_style_sheet(&self) -> String {
        self.parser()
    }

    fn parser(&self) -> String {
        let vec_style = self.vec_style();
        let mut style_line = String::from("");
        for (name, value) in vec_style {
            style_line = format!("{}{}:{};", style_line, name, value);
        }
        style_line
    }

    fn vec_style(&self) -> Vec<(&str, &String)> {
        let mut style_vec = vec![];
        style_vec.push(("width", &self.width));
        style_vec.push(("height", &self.height));
        style_vec.push(("font-size", &self.font_size));
        style_vec.push(("color", &self.color));
        style_vec.push(("margin-top", &self.margin_top));
        style_vec.push(("margin-bottom", &self.margin_bottom));
        style_vec.push(("margin-left", &self.margin_left));
        style_vec.push(("margin-right", &self.margin_right));
        style_vec.push(("padding-top", &self.padding_top));
        style_vec.push(("padding-bottom", &self.padding_bottom));
        style_vec.push(("padding-left", &self.padding_left));
        style_vec.push(("padding-right", &self.padding_right));
        style_vec.push(("border-radius", &self.border_radius));
        style_vec.push(("border-width", &self.border_width));
        style_vec.push(("border-color", &self.border_color));
        style_vec.push(("background-color", &self.background_color));
        style_vec.push(("opacity", &self.opacity));
        style_vec.push(("display", &self.display));
        style_vec.push(("flex-direction", &self.flex_direction));
        style_vec.push(("justify-content", &self.justify_content));
        style_vec.push(("justify-items", &self.justify_items));
        style_vec.push(("align-content", &self.align_content));
        style_vec.push(("align-items", &self.align_items));
        style_vec
    }
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Vapp {
    pub project_name: String,
    pub routes: Vec<Routes>,
    pub navigator: Navigator
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Navigator {
    pub tab_bar_status: bool,
    pub font_color: String,
    pub selected_color: String,
    pub border_color: String,
    pub items: Vec<NavItem>
}

#[derive(Deserialize, Serialize, Debug)]
pub struct NavItem{
    id: i32,
    icon: Option<String>,
    selected_icon: Option<String>,
    text: String,
    path: String,
    status: bool,
    selected_status: bool
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Routes {
    pub id: u8,
    pub name: String,
    pub state: u8,
    pub size: u8,
    pub vnode: Option<VNode>,
}

#[derive(Deserialize, Serialize, Debug,Clone)]
pub struct VNode {
    pub name: String,
    pub tag_name: String,
    pub class: Option<String>,
    pub style: Option<Style>,
    pub props: Option<Vprops>,
    pub content: Option<String>,
    pub children: Vec<VNode>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Vprops {
    pub swiper: Option<Swiper>,
    pub img: Option<Image>,
    pub icon: Option<Icon>,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Swiper {
    pub auto_play: bool,
    pub auto_play_delay: String,
    pub pagination: bool,
    pub scrollbar: bool,
    pub items: Vec<SwiperItem>,
    pub garbage: i32,
}
#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct SwiperItem {
    pub id: i32,
    pub content: String,
    pub status: bool,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Image {
    pub src: String,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct Icon {
    pub content: IconValue,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct IconValue {
    pub icon_type: String,
    pub icon_size: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct Info {
    pub name: String,
    pub style: Style,
    pub content: Option<String>,
    pub children: Vec<Info>,
}
