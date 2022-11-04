import { createRoot } from "react-dom/client";
import { useHashCode } from "./useHashCode"
import { SwiperMini } from "@/components/atoms/SwiperMini"
import { targetSliceAction } from "@/store/target.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { SwiperRedux } from "@/store/swiper.slice";
import defaultImg from '@/assets/default.png'
import success from '@/assets/icon/success.png'
import { Swiper, Vprops } from "@/store/ast";

export type nodeName = 'view' | 'text' | 'button' | 'swiper' | 'image' | 'icon'

export const useCreateCom = (nodeName: nodeName, node: HTMLElement, dispatch: Dispatch, ctx: Vprops) => {
    const className = useHashCode(nodeName)
    node.classList.add(className)
    node.id = nodeName
    switch (nodeName) {
        case 'view':
            createView(node)
            break;
        case 'swiper':
            createSwiper(node, ctx.swiper as Swiper)
            break;
        case 'text':
            createText(node)
            break;
        case 'button':
            createButton(node)
            break;
        case 'image':
            createImage(node)
            break;
        case 'icon':
            createIcon(node)
            break;
        default:
            break;
    }
    node.addEventListener('click', (e: MouseEvent) => {
        let target = e.target
        if (node.id === 'swiper') {
            target = node
        }
        decoration(node)
        dispatch(targetSliceAction.captureTarget(target))
        dispatch(targetSliceAction.updateState(true))

    })
}

export const decoration = (node: HTMLElement) => {
    // const cach = node.style.border
    node.style.outline = 'solid 2px #914bf8'
    node.style.transition = 'all .2s ease-in-out'
    // node.style.resize = 'both'
    // node.style.overflow = 'auto'
    node.classList.add('relatives')
    const decorateTop = document.createElement('div')
    const decorateBottom = document.createElement('div')
    const decorateMid = document.createElement('div')
    const decorateBoard = document.createElement('div')
    decorateTop.classList.add('com_selected_top')
    decorateBottom.classList.add('com_selected_bottom')
    decorateMid.classList.add('com_selected_mid')
    decorateBoard.classList.add('com_selected_board')
    node.prepend(decorateTop, decorateBottom, decorateMid, decorateBoard)
    // console.log(node);
    const blur = (ev: MouseEvent) => {
        if (ev.target !== node) {
            node.style.outline = 'none'
            // node.style.resize = 'none'
            // node.style.overflow = 'auto'
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
    // node.style.transition = 'all .2s ease-in-out'
    // node.style.resize = 'both'
}

const createText = (node: HTMLElement) => {
    node.draggable = false
    node.style.minWidth = '75px'
    node.style.height = '2rem'
    node.style.color = '#000'
    node.style.backgroundColor = '#fff'
    node.style.border = '1px solid #000'
    node.style.cursor = 'pointer'
    // node.style.transition = 'all .2s ease-in-out'
    // node.style.resize = 'both'
}

const createSwiper = (node: HTMLElement, swiper: Swiper) => {
    node.style.width = '100%'
    node.style.height = '150px'
    node.style.cursor = 'pointer'
    setTimeout(() => {
        const swiperNode = createRoot(node)
        swiperNode.render(SwiperMini({
            autoplay: swiper.auto_play,
            autoplayDelay: swiper.auto_play_delay,
            pagination: swiper.pagination,
            scrollbar: swiper.scrollbar,
            items: swiper.items,
            garbage: swiper.garbage
        }))
    }, 100)

}

const createButton = (node: HTMLElement) => {
    node.draggable = false
    node.style.minWidth = '75px'
    node.style.height = '2rem'
    node.style.color = '#000'
    node.style.backgroundColor = '#fff'
    node.style.border = '1px solid #000'
    node.style.cursor = 'pointer'
    node.style.borderRadius = '3px'
    node.style.boxShadow = 'none'
}

const createImage = (node: HTMLElement) => {
    node.draggable = false
    node.setAttribute('src', defaultImg)
    node.style.width = '200px'
    node.style.height = '100px'
    node.style.color = '#000'
    node.style.backgroundColor = 'transparant'
    node.style.border = '1px solid #000'
    node.style.cursor = 'pointer'
    node.style.borderRadius = '3px'
}

const createIcon = (node: HTMLElement) => {
    node.draggable = false
    node.style.width = '93px'
    node.style.height = '93px'
    node.style.color = '#000'
    node.style.backgroundImage = 'url(' + success + ')'
    node.style.backgroundSize = '100% 100%'
    node.setAttribute('data-type', 'success')
    node.setAttribute('data-size', '93')
    node.style.cursor = 'pointer'
}