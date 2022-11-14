import { Icon, Image, Swiper, VNode, Vprops, VpropsState } from "@/store/ast";
import { IconState } from "@/store/icon.slice";
import { SwiperRedux } from "@/store/swiper.slice";
import { useParseCss } from "./useParseCss";

//  to do list
//  first: finish auto save of current page
//  second: use redux to record vNode of every page, in order to impl create page 
//  third: merge them into one json stream

export const useCompile = (rootNode: any, width: number, isRpx: boolean, ctx: VpropsState) => {
    // inital the virtual dom
    let vNode: VNode = {
        name: 'root',
        class: rootNode.classList[0],
        tag_name: rootNode.tagName,
        props: null,
        style: useParseCss(rootNode, width, isRpx),
        content: rootNode.nodeValue,
        children: []
    }
    dfs(rootNode, vNode, width, isRpx, ctx)
    // console.log(vNode);

    return vNode;
}
// traverse the real dom
// during the traversing, compile the real dom into virtual dom
const dfs = (rootNode: any, vNode: VNode, width: number, isRpx: boolean, ctx: VpropsState) => {
    // 对rootNode的子节点进行遍历

    rootNode.childNodes.forEach((el: HTMLElement, index: number) => {
        const nextLevel = () => {
            vNode.children.push(node)
            dfs(el, vNode.children[index], width, isRpx, ctx)
        }
        let styles;
        let curClass;
        if (el.innerText === undefined) {
            styles = null
            curClass = null
        } else {
            styles = useParseCss(el, width, isRpx)
            curClass = el.classList[0]
            // console.log(styles);
            
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
                icon: null
            },
            content: null,
            children: []
        }
        switch (el.id) {
            case 'view':
                compileView(node, el)
                nextLevel()
                break;
            case 'text':
                compileText(node, el)
                nextLevel()
                break;
            case 'swiper':
                compileSwiper(node, el, width, isRpx, ctx.swiper as Swiper)
                nextLevel()
                break;
            case 'button':
                compileButton(node, el)
                nextLevel()
                break;
            case 'image':
                compileImage(node, el)
                nextLevel()
                break;
            case 'icon':
                compileIcon(node, el)
                nextLevel()
                break;
            default:
                break;
        }
    });
}


const compileView = (node: VNode, el: HTMLElement) => {
    node.content = null
}

const compileText = (node: VNode, el: HTMLElement) => {
    node.content = el.innerText
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
