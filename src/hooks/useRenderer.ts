import { selectTarget, targetSliceAction } from "@/store/target.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { VNode } from '@/store/ast'
import { useSelector } from "react-redux";
import { emitKeypressEvents } from "readline";
import { createRoot } from "react-dom/client";
import { SwiperMini } from "@/components/atoms/SwiperMini";


export const useRenderer = (root: HTMLElement, vNode: VNode, dispatch: Dispatch) => {
    dfs(root, vNode, dispatch)
}

const dfs = (rootNode: HTMLElement | Node, vNode: VNode, dispatch: Dispatch) => {
    vNode.children.forEach((item: VNode, index: number) => {
        if (item.name !== '') {
            rootNode.appendChild(createNode(item, dispatch))
        }
        dfs(rootNode.childNodes[index], item, dispatch)
    })

}

const createNode = (vNode: VNode, dispatch: Dispatch): HTMLElement => {
    const curNode = seprate(vNode)
    curNode.addEventListener('click', (e: MouseEvent) => {
        dispatch(targetSliceAction.captureTarget(e.target))
    })

    return curNode
}

const seprate = (node: VNode) => {
    switch (node.name) {
        case 'view' || 'text':
            return createViewText(node);
        case 'swiper':
            return createSwiper(node)
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
    el.textContent = node.content
    el.draggable = false
    el.style.cursor = 'pointer'
    el.style.border = '1px solid #000'
    parseCss(el, node)
    return el
}

const createSwiper = (node: VNode): HTMLElement => {
    const el = document.createElement(node.tag_name)
    el.classList.add(node.class as string)
    const swiperNode = createRoot(el)
    swiperNode.render(SwiperMini())
    parseCss(el, node)
    return el
}