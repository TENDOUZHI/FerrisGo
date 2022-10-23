import { VNode } from "@/store/ast";
import { useParseCss } from "./useParseCss";

//  to do list
//  first: finish auto save of current page
//  second: use redux to record vNode of every page, in order to impl create page 
//  third: merge them into one json stream

export const useCompile = (rootNode: any, width: number, isRpx: boolean) => {
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
    dfs(rootNode, vNode, width, isRpx)
    // console.log(vNode);
    return vNode;
}
// traverse the real dom
// during the traversing, compile the real dom into virtual dom
const dfs = (rootNode: any, vNode: VNode, width: number, isRpx: boolean) => {
    // 对rootNode的子节点进行遍历
    rootNode.childNodes.forEach((el: HTMLElement, index: number) => {
        if (el.id === 'swiper') {
            console.log('swiper compile');
        } else {
            
        }
        // 同步到vNode的子节点
        let styles;
        let curClass;
        let content;
        if (el.id !== 'text') {
            content = null
        } else {
            content = el.innerText
        }
        if (el.innerText === undefined) {
            styles = null
            curClass = null
        } else {
            styles = useParseCss(el, width, isRpx)
            curClass = el.classList[0]
        }
        const node: VNode = {
            name: el.id,
            class: curClass,
            tag_name: el.tagName,
            style: styles,
            props: {
                swiper: {
                    items: null,
                    auto_play: false,
                    auto_play_delay: 0,
                    pagination: false,
                    scrollbar: false
                }
            },
            content: content,
            children: []
        }

        if (el.innerText !== undefined) {
            vNode.children.push(node)
            dfs(el, vNode.children[index], width, isRpx)
        }
    });
}