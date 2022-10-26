import { selectDevice } from "@/store/device.slice"
import { selectRoot } from "@/store/source.slice"
import { selectSwiper } from "@/store/swiper.slice"
import { selectUser } from "@/store/user.slice"
import { selectCurRoutes, selectProgramId, routesSliceAction } from "@/store/vapp.slice"
import { selectWs } from "@/store/ws.slice"
import { useLayoutEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useCompile } from "./useCompile"
import { useRenderer } from "./useRenderer"

export const useUpdate = () => {
    const dispatch = useDispatch()
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const user = useSelector(selectUser)
    const swiper = useSelector(selectSwiper)
    const ws = useSelector(selectWs)
    const program_id = useSelector(selectProgramId)
    const [curNode, setCurNode] = useState<any>(null)
    const update = () => {
        if (root !== null) {
            // clear screen
            const len = root!.childNodes.length as number
            const childs = root!.childNodes
            for (let i = len - 1; i >= 0; i--) {
                // @ts-ignore
                try {
                    root!.removeChild(childs[i])
                } catch (error) { }
            }
            // set into real dom
            setTimeout(() => {
                useRenderer(root as HTMLElement, curNode, dispatch, swiper)
            })
        }
    }
    const preUpdate = () => {
        const curVnode = {
            id: current.id,
            vNode: useCompile(root, device.width, false, swiper)
        }
        const curWnode = {
            id: current.id,
            vNode: useCompile(root, device.width, true, swiper)
        }
        dispatch(routesSliceAction.updateVnode({
            curVnode, curWnode,
            user_id: user.id,
            program_id: program_id,
            ws: ws
        }))
        setCurNode(curVnode.vNode)
    }
    return [curNode, preUpdate, update]
}