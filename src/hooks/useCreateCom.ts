import { createRoot } from "react-dom/client";
import { useHashCode } from "./useHashCode"
import { SwiperMini } from "@/components/atoms/SwiperMini"
import { targetSliceAction } from "@/store/target.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { SwiperRedux } from "@/store/swiper.slice";

export type nodeName = 'view' | 'text' | 'button' | 'swiper'

export const useCreateCom = (nodeName: nodeName, node: HTMLElement, dispatch: Dispatch, ctx: Object) => {
    const className = useHashCode(nodeName)
    node.classList.add(className)
    node.id = nodeName
    switch (nodeName) {
        case 'view':
            createView(node)
            break;
        case 'swiper':
            createSwiper(node, ctx as SwiperRedux)
            break;
        case 'text':
            createText(node)
        case 'button':
            createButton(node)
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
    console.log(node);
    
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
    node.append(decorateTop, decorateBottom, decorateMid, decorateBoard)
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

const createSwiper = (node: HTMLElement, swiper: SwiperRedux) => {
    node.style.width = '100%'
    node.style.cursor = 'pointer'
    setTimeout(() => {
        const swiperNode = createRoot(node)
        swiperNode.render(SwiperMini({
            autoplay: swiper.autoPlay,
            autoplayDelay: swiper.autoPlayDelay,
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