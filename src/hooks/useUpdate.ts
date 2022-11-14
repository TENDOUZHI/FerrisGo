import { selectDevice } from "@/store/device.slice"
import { selectRoot } from "@/store/source.slice"
import { selectSwiper } from "@/store/swiper.slice"
import { selectTarget } from "@/store/target.slice"
import { undoSliceAction } from "@/store/undo.slice"
import { selectUser } from "@/store/user.slice"
import { selectCurRoutes, selectProgramId, routesSliceAction, selectVapp } from "@/store/vapp.slice"
import { selectWs } from "@/store/ws.slice"
import { invoke } from "@tauri-apps/api"
import { useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useCompile } from "./useCompile"
import { useDiff } from "./usePatch"
import { useVprops } from "./useVprops"

export const useUpdate = (): (() => void) => {
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const [curNode, setCurNode] = useState<any>(null)
    const vprops = useVprops()
    const patch = useDiff()
    useLayoutEffect(() => {
        update()
    }, [curNode])

    const update = () => {
        if (root !== null && curNode !== null) {
            setTimeout(() => {
                patch(curNode)
            })
        }
    }
    const preUpdate = () => {
            const curVnode = {
                id: current.id,
                vNode: useCompile(root, device.width, false, vprops)
            }
            setCurNode(curVnode.vNode)
            invoke('save_operate', { newOperate: curVnode.vNode })
    }
    return preUpdate
}