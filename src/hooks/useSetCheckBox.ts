import { VNode } from "@/store/ast"
import { selectDevice } from "@/store/device.slice"
import { selectRoot } from "@/store/source.slice"
import { selectSwiper, swiperSliceAction, SwiperType } from "@/store/swiper.slice"
import { selectTarget } from "@/store/target.slice"
import { selectUser } from "@/store/user.slice"
import { routesSliceAction, selectCurRoutes, selectProgramId, selectRoutes } from "@/store/vapp.slice"
import { selectWs } from "@/store/ws.slice"
import { Dispatch } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useCompile } from "./useCompile"
import { useRenderer } from "./useRenderer"


export const useSetCheckBox = (rootValue: SwiperType, dispatch: Dispatch): [boolean, (value: boolean) => void] => {
    const [value, setValue] = useState<boolean>(false)
    let target = useSelector(selectTarget) as HTMLElement
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const swiper = useSelector(selectSwiper)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const program_id = useSelector(selectProgramId)
    const route = useSelector(selectRoutes)
    useEffect(() => {
        setValue(swiper[rootValue])
    }, [target])
    useEffect(() => {
        // set into real dom
        setTimeout(() => {
            useRenderer(root as HTMLElement, route[current.id].vnode as VNode, dispatch, swiper)
        }, 100)

    }, [swiper])
    // syn data to vnode and rerender root
    const setValues = (value: boolean) => {
        switch (rootValue) {
            case 'autoPlay':
                dispatch(swiperSliceAction.setAutoPlay(value))
                break;
            case 'pagination':
                dispatch(swiperSliceAction.setPagination(value))
                break;
            case 'scrollbar':
                dispatch(swiperSliceAction.setScrollBar(value))
                break;
            default:
                break;
        }
        // clear screen
        const len = root!.childNodes.length as number
        const childs = root!.childNodes
        for (let i = len - 1; i >= 0; i--) {
            // @ts-ignore
            try {
                root!.removeChild(childs[i])
            } catch (error) { }
        }
        // set vnode
        setTimeout(() => {
            const curVnode = {
                id: current.id,
                vNode: useCompile(root, device.width, false, swiper)
            }
            const curWnode = {
                id: current.id,
                vNode: useCompile(root, device.width, false, swiper)
            }
            dispatch(routesSliceAction.updateVnode({
                curVnode, curWnode,
                user_id: user.id,
                program_id: program_id,
                ws: ws
            }))

        })
    }

    return [value, setValues]
}