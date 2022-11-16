import { IconState } from "./icon.slice"
import { ImageState } from "./image.slice"
import { Nav } from "./navigator.slice"
import { SwiperItem } from "./swiper.slice"

export interface Vapp {
    project_name: string,
    routes: Array<Routes>,
    navigator: Nav
}

export interface Routes {
    id: number,
    name: string,
    state: 0 | -1,
    size: number,
    vnode: VNode,
}

export interface VNode {
    name: string,
    tag_name: string,
    class: string | null,
    style: Style | null,
    props: Vprops | null,
    content: string | null,
    children: Array<VNode>
}

export interface Vprops {
    swiper: Swiper | null
    img: Image | null
    icon: Icon | null
    router: Router | null
}

export interface Router {
    routerid: string,
    router: string
}

export interface Icon {
    content: {
        icon_type: string,
        icon_size: string
    }
}

export interface VpropsState {
    swiper: Swiper | null
    img: ImageState | null
    icon: IconState | null
}

export interface Image {
    src: string
}

export interface Swiper {
    auto_play: boolean,
    auto_play_delay: string,
    pagination: boolean,
    scrollbar: boolean,
    items: Array<SwiperItem>,
    garbage: number
}

export interface Style {
    width: string
    height: string
    font_size: string
    color: string
    margin_top: string
    margin_bottom: string
    margin_left: string
    margin_right: string
    padding_top: string
    padding_bottom: string
    padding_left: string
    padding_right: string
    border_radius: string
    border: string
    border_width: string
    border_color: string
    background_color: string
    opacity: string
    display: string
    flex_direction: string
    justify_content: string
    justify_items: string
    align_content: string
    align_items: string

}

export interface LoginPayload {
    username: string | null,
    telephone: string | null,
    email: string | null,
    message: string | null,
    emessage: string | null,
    password: string | null
}

export interface PassCodePayload {
    email_address: string,
    is_login: boolean
}
