import { VNode } from "@/store/ast";
import { selectTarget } from "@/store/target.slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createNode } from "./useRenderer";
import { useVprops } from "./useVprops";

export const useBetterDiff = () => {
    const dispatch = useDispatch()
    const vprops = useVprops()
    const target = useSelector(selectTarget)
    const [tar, setTar] = useState<HTMLElement | null>(null)
    useEffect(() => {
        if (target !== null) setTar(target)
    }, [target])
    const dfs = (vNode: VNode, classStr: string) => {
        for (let i = 0; i < vNode.children.length; i++) {
            if (vNode.children[i].class === classStr) {
                const node = vNode.children[i]
                return node;
            } else {
                dfs(vNode.children[i], classStr)
            }
        }
    }
    const traverseNode = (n1: VNode, n2: VNode) => {
        if (n1 === undefined) {
            const node2 = document.querySelector('.' + n2.class)
            node2?.remove()
        }
        if(n2 === undefined) {
            
        }
        try {
            const newChildren = n1.children
            const oldChildren = n2.children
            for (let i = 0; i < oldChildren.length; i++) {
                traverseNode(newChildren[i], oldChildren[i])
            }
        } catch (error) { }




    }
    const diff = (n1: VNode, n2: VNode) => {
        // undo when components' attribute changed
        if (tar !== null) {
            const key = tar?.classList[0]
            const oldNode = dfs(n1, key as string)
            if (oldNode !== null) {
                const newNode = document.querySelector('.' + key)
                const old = createNode(oldNode as VNode, dispatch, vprops, true)
                newNode?.replaceWith(old)

            }
        }
        // undo when components' new append
        traverseNode(n1, n2)



    }
    return diff
}