import { VNode } from "@/store/ast"
import { selectRoot } from "@/store/source.slice"
import { selectTarget, targetSliceAction } from "@/store/target.slice"
import { Dispatch } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { seprate } from "./useRenderer"
import { useVprops } from "./useVprops"

export const useDiff = () => {
    const vprops = useVprops()
    const target = useSelector(selectTarget)
    const dispatch = useDispatch()
    const dfs = (vNode: VNode, classStr: string) => {
        for (let i = 0; i < vNode.children.length; i++) {
            if (vNode.children[i].class === classStr) {
                // console.log(vNode.children[i]);
                const node = vNode.children[i]
                return node;
            } else {
                dfs(vNode.children[i], classStr)
            }
        }
    }
    const diffOperate = (vNode: VNode) => {
        const classStr = target?.classList[0] as string
        let node = dfs(vNode, classStr)
        const el = seprate(node as VNode, vprops)
        target?.replaceWith(el)
        dispatch(targetSliceAction.captureTarget(el))
    }
    return diffOperate
}