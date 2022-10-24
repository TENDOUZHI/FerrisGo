import { createRoot } from "react-dom/client";
import { useHashCode } from "./useHashCode"
import { SwiperMini } from "@/components/atoms/SwiperMini"
import { targetSliceAction } from "@/store/target.slice";
import { Dispatch } from "@reduxjs/toolkit";
// import Swiper from 'swiper'
// import 'swiper/css';

export type nodeName = 'view' | 'text' | 'button' | 'swiper'

export const useCreateCom = (nodeName: nodeName, node: HTMLElement, dispatch: Dispatch) => {
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
    node.addEventListener('click', (e: MouseEvent) => {
        decoration(node)
        dispatch(targetSliceAction.captureTarget(e.target))
        dispatch(targetSliceAction.updateState(true))

    })
}

const decoration = (node: HTMLElement) => {
    const cach = node.style.border
    node.style.border = 'solid 3px #914bf8'
    node.style.transition = 'border 0s'
    node.classList.add('relative')
    const decorateTop = document.createElement('div')
    const decorateBottom = document.createElement('div')
    const decorateMid = document.createElement('div')
    const decorateBoard = document.createElement('div')
    decorateTop.classList.add('com_selected_top')
    decorateBottom.classList.add('com_selected_bottom')
    decorateMid.classList.add('com_selected_mid')
    decorateBoard.classList.add('com_selected_board')
    node.append(decorateTop,decorateBottom,decorateMid,decorateBoard)
    const blur = (ev: MouseEvent) => {
        console.log(ev.target);
        if (ev.target !== node) {
            node.style.border = cach
            node.classList.remove('relative')
            decorateTop.remove()
            decorateBottom.remove()
            decorateMid.remove()
            decorateBoard.remove()
            document.removeEventListener('click', blur)
        }
    }
    document.addEventListener('click', blur)
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
    node.style.resize = 'both'
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
    node.style.resize = 'both'
}