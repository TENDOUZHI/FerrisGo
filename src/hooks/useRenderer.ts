import { selectTarget, targetSliceAction } from "@/store/target.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { Image, Swiper, VNode, Vprops, VpropsState } from '@/store/ast'
import { useSelector } from "react-redux";
import { emitKeypressEvents } from "readline";
import { createRoot } from "react-dom/client";
import { SwiperMini } from "@/components/atoms/SwiperMini";
import { decoration } from "./useCreateCom";
import { selectSwiper, SwiperItem, SwiperRedux, swiperSliceAction } from "@/store/swiper.slice";
import defaultImg from '@/assets/default.png'
import success from '@/assets/icon/success.png'
import tip from '@/assets/icon/tip.png'
import warn from '@/assets/icon/normal-warn.png'
import { iconSliceAction, IconState } from "@/store/icon.slice";
import { imageSliceAction, ImageState } from "@/store/image.slice";


export const useRenderer = (root: HTMLElement, vNode: VNode, dispatch: Dispatch, ctx: VpropsState, retrive?: boolean) => {
    dfs(root, vNode, dispatch, ctx, retrive)
}

const dfs = (rootNode: HTMLElement | Node, vNode: VNode, dispatch: Dispatch, ctx: VpropsState, retrive?: boolean) => {
    vNode.children.forEach((item: VNode, index: number) => {
        if (item.name !== '') {
            rootNode.appendChild(createNode(item, dispatch, ctx, retrive))
        }
        dfs(rootNode.childNodes[index], item, dispatch, ctx, retrive)
    })

}

export const createNode = (vNode: VNode, dispatch: Dispatch, ctx: VpropsState, retrive?: boolean): HTMLElement => {
    const curNode = seprate(vNode, ctx, dispatch, retrive)
    curNode.setAttribute('data-id', 'ferrisGo')
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

const seprate = (node: VNode, ctx: VpropsState, dispatch: Dispatch, retrive?: boolean) => {
    switch (node.name) {
        case 'view' || 'text':
            return createViewText(node);
        case 'swiper':
            return createSwiper(node, ctx.swiper as Swiper, dispatch, retrive)
        case 'button':
            return createButton(node)
        case 'image':
            return createImage(node, ctx.img as ImageState, dispatch, retrive)
        case 'icon':
            return createIcon(node, ctx.icon as IconState, dispatch, retrive)
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
    el.style.transition = 'all .2s'
    parseCss(el, node)
    return el
}

const createSwiper = (node: VNode, swiper: SwiperRedux, dispatch: Dispatch, retrive?: boolean): HTMLElement => {
    const el = document.createElement(node.tag_name)
    el.id = node.name
    el.classList.add(node.class as string)
    el.style.cursor = 'pointer'
    const swiperNode = createRoot(el)
    const props: SwiperMini = {
        autoplay: swiper.auto_play,
        autoplayDelay: swiper.auto_play_delay,
        pagination: swiper.pagination,
        scrollbar: swiper.scrollbar,
        items: swiper.items,
        garbage: swiper.garbage
    }
    if (retrive) {
        const swiperAttr = node.props?.swiper
        props.autoplay = swiperAttr?.auto_play as boolean
        props.autoplayDelay = swiperAttr?.auto_play_delay as string
        props.pagination = swiperAttr?.pagination as boolean
        props.scrollbar = swiperAttr?.scrollbar as boolean
        props.items = swiperAttr?.items as SwiperItem[]
        props.garbage = swiperAttr?.garbage as number
        dispatch(swiperSliceAction.retriveSwiper(props))
    }

    swiperNode.render(SwiperMini(props))
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

const createImage = (node: VNode, image: ImageState, dispatch: Dispatch, retrive?: boolean): HTMLElement => {
    const el = document.createElement(node.tag_name)
    el.id = node.name
    el.classList.add(node.class as string)
    el.style.width = node.style?.width as string
    el.style.height = node.style?.height as string
    el.style.color = '#000'
    el.style.backgroundColor = 'transparant'
    el.style.border = node.style?.border_width + ' solid ' + node.style?.border_color
    el.style.borderRadius = node.style?.border_radius as string
    el.style.cursor = 'pointer'
    if (retrive) {
        el.setAttribute('src', node.props?.img?.src as string)
        dispatch(imageSliceAction.updateSrc({ className: node.class, src: node.props?.img?.src }))

    } else {
        if (image.src.get(node.class as string) === undefined) el.setAttribute('src', defaultImg)
        else el.setAttribute('src', image.src.get(node.class as string) as string)
    }

    return el
}

export const createIcon = (node: VNode, icon: IconState, dispatch: Dispatch, retrive?: boolean): HTMLElement => {
    const el = document.createElement(node.tag_name)
    let classStr = node.class as string
    if (icon.content.get(classStr) === undefined) {
        classStr = 'default'
    }
    let size = icon.content.get(classStr)?.icon_size as string
    let type = icon.content.get(classStr)?.icon_type as string
    if (retrive) {
        size = node.props?.icon?.content.icon_size as string
        type = node.props?.icon?.content.icon_type as string
        dispatch(iconSliceAction.updateIconSize({
            className: node.class,
            size
        }))
        dispatch(iconSliceAction.updateIconType({
            className: node.class,
            type
        }))
    }
    el.id = node.name
    el.classList.add(node.class as string)
    el.setAttribute('data-type', type)
    el.setAttribute('data-size', size)
    el.style.width = size + 'px'
    el.style.height = size + 'px'
    switch (type) {
        case 'success':
            el.style.backgroundImage = 'url(' + success + ')'
            break;
        case 'tip':
            el.style.backgroundImage = 'url(' + tip + ')'
            break;
        case 'warn':
            el.style.backgroundImage = 'url(' + warn + ')'
            break;
        default:
            break;
    }

    el.style.backgroundSize = '100% 100%'
    el.style.cursor = 'pointer'
    return el
}