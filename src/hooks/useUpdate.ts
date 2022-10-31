import { selectDevice } from "@/store/device.slice"
import { selectRoot } from "@/store/source.slice"
import { selectSwiper } from "@/store/swiper.slice"
import { selectTarget } from "@/store/target.slice"
import { selectUser } from "@/store/user.slice"
import { selectCurRoutes, selectProgramId, routesSliceAction } from "@/store/vapp.slice"
import { selectWs } from "@/store/ws.slice"
import { useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useCompile } from "./useCompile"
import { useDiff } from "./usePatch"
import { useRenderer } from "./useRenderer"
import { useVprops } from "./useVprops"

export const useUpdate = (): (() => void) => {
    const dispatch = useDispatch()
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const target = useSelector(selectTarget)
    const program_id = useSelector(selectProgramId)
    const [curNode, setCurNode] = useState<any>(null)
    const vprops = useVprops()
    const patch = useDiff()
    useLayoutEffect(() => {
        update()
    }, [curNode])
    const update = () => {
        if (root !== null) {
            // clear screen
            // const len = root!.childNodes.length as number
            // const childs = root!.childNodes
            // for (let i = len - 1; i >= 0; i--) {
            //     // @ts-ignore
            //     try {
            //         root!.removeChild(childs[i])
            //     } catch (error) { }
            // }
            // root?.removeChild(target as Node)
            // set into real dom
            setTimeout(() => {
                // console.log(target);
                patch(curNode)
                // useRenderer(root as HTMLElement, curNode, dispatch, vprops)
            })
        }
    }
    const preUpdate = () => {
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
            user_id: user.id,
            program_id: program_id,
            ws: ws
        }))
        setCurNode(curVnode.vNode)
    }
    return preUpdate
}