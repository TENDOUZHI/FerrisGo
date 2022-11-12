import { VNode } from "@/store/ast"
import { selectDevice } from "@/store/device.slice"
import { selectRoot } from "@/store/source.slice"
import { selectTarget, targetSliceAction } from "@/store/target.slice"
import { selectCurRoutes, routesSliceAction } from "@/store/vapp.slice"
import { Dispatch } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import { useCompile } from "./useCompile"
import { createNode } from "./useRenderer"
import { useVprops } from "./useVprops"

export const useDiff = () => {
    const vprops = useVprops()
    const target = useSelector(selectTarget)
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const dispatch = useDispatch()
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

    const synVapp = () => {
        const curVnode = {
            id: current.id,
            vNode: useCompile(root, device.width, false, vprops)
        }
        const curWnode = {
            id: current.id,
            vNode: useCompile(root, device.width, true, vprops)
        }
        dispatch(routesSliceAction.updateVnode({
            curVnode, curWnode,
            user_id: '',
            program_id: '',
            ws: ''
        }))
    }
    const diffOperate = (vNode: VNode) => {
        const classStr = target?.classList[0] as string
        let node = dfs(vNode, classStr)
        const el = createNode(node as VNode, dispatch, vprops)
        target?.replaceWith(el)
        dispatch(targetSliceAction.captureTarget(el))
        synVapp()
    }
    return diffOperate
}