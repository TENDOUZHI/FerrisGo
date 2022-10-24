import { createRoot } from "react-dom/client";
import { useHashCode } from "./useHashCode"
import { SwiperMini } from "@/components/atoms/SwiperMini"
// import Swiper from 'swiper'
// import 'swiper/css';

export type nodeName = 'view' | 'text' | 'button' | 'swiper'

export const useCreateCom = (nodeName: nodeName, node: HTMLElement) => {
    const className = useHashCode(nodeName)
    node.classList.add(className)
    node.id = nodeName
    switch (nodeName) {
        case 'view':
            createView(node)
            break;
        case 'swiper':
            createSwiper(node)
            break;
        case 'text':
            createText(node)
        default:
            break;
    }
}

const createView = (node: HTMLElement) => {
    node.draggable = false
    node.style.width = '100%'
    node.style.height = '50px'
    node.style.color = '#000'
    node.style.backgroundColor = '#fff'
    node.style.border = '1px solid #000'
    node.style.cursor = 'pointer'
    node.style.transition = 'all .2s ease-in-out'
}

const createSwiper = (node: HTMLElement) => {
    node.style.width = '100%'
    node.style.cursor = 'pointer'
    // setTimeout(() => {
    const swiperNode = createRoot(node)
    swiperNode.render(SwiperMini())
    // }, 100)

}

const createText = (node: HTMLElement) => {
    node.draggable = false
    node.style.minWidth = '75px'
    node.style.height = '2rem'
    node.style.color = '#000'
    node.style.backgroundColor = '#fff'
    node.style.border = '1px solid #000'
    node.style.cursor = 'pointer'
    node.style.transition = 'all .2s ease-in-out'
}