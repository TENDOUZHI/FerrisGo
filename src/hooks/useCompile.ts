import { Icon, Image, Router, Swiper, VNode, Vprops, VpropsState } from "@/store/ast";
import { IconState } from "@/store/icon.slice";
import { SwiperRedux } from "@/store/swiper.slice";
import { useParseCss } from "./useParseCss";

//  to do list
//  first: finish auto save of current page
//  second: use redux to record vNode of every page, in order to impl create page 
//  third: merge them into one json stream

export const useCompile = (rootNode: any, width: number, isRpx: boolean, ctx: VpropsState, encapsulate?: boolean) => {
    // inital the virtual dom
    let vNode: VNode = {
        name: encapsulate ? 'root' : rootNode.id,
        class: rootNode.classList[0],
        tag_name: rootNode.tagName,
        props: null,
        style: useParseCss(rootNode, width, isRpx),
        content: rootNode.nodeValue,
        children: []
    }
    dfs(rootNode, vNode, width, isRpx, ctx)
    return vNode;
}
// traverse the real dom
// during the traversing, compile the real dom into virtual dom
const dfs = (rootNode: any, vNode: VNode, width: number, isRpx: boolean, ctx: VpropsState, custom?: string) => {
    // 对rootNode的子节点进行遍历
    // console.log(vNode);

    // const vnode = vNode.children
    rootNode.childNodes.forEach((el: HTMLElement, index: number) => {
        const nextLevel = (custom?: string) => {
            const vnode = vNode.children[index]
            // console.log(vnode);

            // if (vnode!== undefined) {

            vNode.children.push(node)
            dfs(el, vNode.children[index], width, isRpx, ctx, custom)
            // }
        }
        let styles;
        let curClass;
        let router = null;
        if (el.innerText === undefined) {
            styles = null
            curClass = null
        } else {
            styles = useParseCss(el, width, isRpx)
            curClass = el.classList[0]
        }
        if (el.id !== undefined) {
            if (el.getAttribute('data-routerid') !== null) {
                const rou: Router = {
                    routerid: el.getAttribute('data-routerid') as string,
                    router: el.getAttribute('data-router') as string
                }
                router = rou
            } else router = null
        }
        // compile basic attribute
        const node: VNode = {
            name: el.id,
            class: curClass,
            tag_name: el.tagName,
            style: styles,
            props: {
                swiper: null,
                img: {
                    src: ''
                },
                icon: null,
                router: router
            },
            content: null,
            children: []
        }
        switch (el.id) {
            case 'view':
                compileView(node, el)
                nextLevel(custom)
                break;
            case 'text':
                compileText(node, el)
                nextLevel(custom)
                break;
            case 'swiper':
                compileSwiper(node, el, width, isRpx, ctx.swiper as Swiper)
                nextLevel(custom)
                break;
            case 'button':
                compileButton(node, el)
                nextLevel(custom)
                break;
            case 'image':
                compileImage(node, el)
                nextLevel(custom)
                break;
            case 'icon':
                compileIcon(node, el)
                nextLevel(custom)
                break;
            case undefined:
                break;
            default:
                nextLevel(el.id)
                break;
        }
    });
}

const compileView = (node: VNode, el: HTMLElement) => {
    node.content = null
}

const compileText = (node: VNode, el: HTMLElement) => {
    if (node.content !== '') node.content = el.innerText
}

const compileSwiper = (node: VNode, el: HTMLElement, width: number, isRpx: boolean, swiperRedux: Swiper) => {
    // compile swiper
    node.name = 'swiper'
    node.props!.swiper = {
        auto_play: swiperRedux.auto_play,
        auto_play_delay: swiperRedux.auto_play_delay,
        pagination: swiperRedux.pagination,
        scrollbar: swiperRedux.scrollbar,
        items: swiperRedux.items,
        garbage: swiperRedux.garbage
    }
    // compile swiper-item
    try {
        const swiper = el.childNodes[0]
        const swiperItem = swiper.childNodes[0]
        swiperItem.childNodes.forEach((el: ChildNode, index: number) => {
            const item: VNode = {
                name: "swiper-item",
                tag_name: "DIV",
                class: (el as HTMLElement).classList[0],
                style: useParseCss(el as HTMLElement, width, isRpx),
                props: null,
                content: el.textContent,
                children: []
            }
            node.children.push(item)
        })
    } catch (error) { }


}

const compileButton = (node: VNode, el: HTMLElement) => {
    node.content = el.innerText
}

const compileImage = (node: VNode, el: HTMLElement) => {
    node.props!.img!.src = el.getAttribute('src') as string
}

const compileIcon = (node: VNode, el: HTMLElement) => {
    const content = {
        icon_type: el.getAttribute('data-type'),
        icon_size: el.getAttribute('data-size')
    }
    const iconInfo = {
        content: content
    }
    node.props!.icon! = iconInfo as Icon
}
