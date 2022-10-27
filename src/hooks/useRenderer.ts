import { selectTarget, targetSliceAction } from "@/store/target.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { Image, Swiper, VNode, Vprops } from '@/store/ast'
import { useSelector } from "react-redux";
import { emitKeypressEvents } from "readline";
import { createRoot } from "react-dom/client";
import { SwiperMini } from "@/components/atoms/SwiperMini";
import { decoration } from "./useCreateCom";
import { selectSwiper, SwiperRedux } from "@/store/swiper.slice";
import defaultImg from '@/assets/default.png'


export const useRenderer = (root: HTMLElement, vNode: VNode, dispatch: Dispatch, ctx: Vprops) => {
    dfs(root, vNode, dispatch, ctx)
}

const dfs = (rootNode: HTMLElement | Node, vNode: VNode, dispatch: Dispatch, ctx: Vprops) => {
    vNode.children.forEach((item: VNode, index: number) => {
        if (item.name !== '') {
            rootNode.appendChild(createNode(item, dispatch, ctx))
        }
        dfs(rootNode.childNodes[index], item, dispatch, ctx)
    })

}

const createNode = (vNode: VNode, dispatch: Dispatch, ctx: Vprops): HTMLElement => {
    const curNode = seprate(vNode, ctx)
    curNode.addEventListener('click', (e: MouseEvent) => {
        let target = e.target
        if (curNode.id === 'swiper') {
            target = curNode
        }
        decoration(curNode)
        dispatch(targetSliceAction.captureTarget(target))
    })
    return curNode
}

const seprate = (node: VNode, ctx: Vprops) => {
    switch (node.name) {
        case 'view' || 'text':
            return createViewText(node);
        case 'swiper':
            return createSwiper(node, ctx.swiper as Swiper)
        case 'button':
            return createButton(node)
        case 'image':
            return createImage(node, ctx.img as Image)
        default:
            return createViewText(node);
    }
}



const parseCss = (el: HTMLElement, node: VNode) => {
    for (const key in node.style) {
        if (Object.prototype.hasOwnProperty.call(node.style, key)) {
            let camel: string = ''
            if (key.includes('_')) {
                for (let i = 0; i < key.length; i++) {
                    if (key[i] === '_') {
                        camel = key.substring(0, i) + key[i + 1].toUpperCase() + key.substring(i + 2, key.length)
                    }
                }
            } else {
                camel = key
            }
            // @ts-ignore
            el.style[camel] = node.style[key]
        }
    }
}

const createViewText = (node: VNode): HTMLElement => {
    const el = document.createElement(node.tag_name)
    el.id = node.name
    el.classList.add(node.class as string)
    el.style.resize = 'both'
    el.textContent = node.content
    el.draggable = false
    el.style.cursor = 'pointer'
    el.style.border = '1px solid #000'
    parseCss(el, node)
    return el
}

const createSwiper = (node: VNode, swiper: SwiperRedux): HTMLElement => {
    const el = document.createElement(node.tag_name)
    el.id = node.name
    el.classList.add(node.class as string)
    el.style.cursor = 'pointer'
    const swiperNode = createRoot(el)
    swiperNode.render(SwiperMini({
        autoplay: swiper.auto_play,
        autoplayDelay: swiper.auto_play_delay,
        pagination: swiper.pagination,
        scrollbar: swiper.scrollbar,
        items: swiper.items,
        garbage: swiper.garbage
    }))
    // console.log(swiper.items);
    parseCss(el, node)
    return el
}

const createButton = (node: VNode): HTMLElement => {
    const el = document.createElement(node.tag_name)
    el.id = node.name
    el.classList.add(node.class as string)
    el.textContent = node.content
    el.style.cursor = 'pointer'
    el.style.border = '1px solid #000'
    el.style.boxShadow = 'none'
    parseCss(el, node)
    return el
}

const createImage = (node: VNode, image: Image): HTMLElement => {
    const el = document.createElement(node.tag_name)
    el.id = node.name
    el.classList.add(node.class as string)
    el.style.width = '200px'
    el.style.height = '100px'
    el.style.color = '#000'
    el.style.backgroundColor = 'transparant'
    el.style.border = '1px solid #000'
    el.style.cursor = 'pointer'
    el.style.borderRadius = '3px'
    if(image.src.get(node.class as string) === undefined) el.setAttribute('src', defaultImg)
    else el.setAttribute('src', image.src.get(node.class as string) as string)
    return el
}