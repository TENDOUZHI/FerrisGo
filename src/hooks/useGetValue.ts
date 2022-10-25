import { selectTarget } from "@/store/target.slice"
import { routesSliceAction, selectCurRoutes, selectProgramId, selectVapp } from "@/store/vapp.slice"
import { useEffect, useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectRoot } from "@/store/source.slice"
import { useCompile } from "./useCompile"
import { selectDevice } from "@/store/device.slice"
import { Dispatch } from "@reduxjs/toolkit"
import { selectUser } from "@/store/user.slice"
import { selectWs } from "@/store/ws.slice"
import { selectSwiper, swiperSliceAction } from "@/store/swiper.slice"
import { useRenderer } from "./useRenderer"


export const useGetValue = (prop: string, dispatch: Dispatch, hoc?: string): [string, (value: string) => void] => {
    const [value, setValue] = useState<string>('')
    let target = useSelector(selectTarget) as HTMLElement
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const program_id = useSelector(selectProgramId)
    const swiper = useSelector(selectSwiper)
    const [curNode, setCurNode] = useState<any>(null)
    useEffect(() => {
        if (target !== null) {
            if (prop === 'content') {
                const newValue = target.innerText
                setValue(newValue)
            } else if (hoc) {
                // @ts-ignore
                setValue(swiper[hoc])
            }
            else {
                const newValue = getComputedStyle(target).getPropertyValue(prop)
                setValue(newValue)
            }
        }
    }, [target])
    useLayoutEffect(() => {
        if (root !== null && hoc) {
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

    }, [curNode])
    const setValues = (value: string) => {
        if (prop === 'swiper') {
            dispatch(swiperSliceAction.setAutoPlayDelay(value))
        } else {
            if (prop === 'content') {
                target.innerHTML = value
            } else {
                // transfer to camel name
                let camel: string | any = ''
                if (target !== null) {
                    if (prop.includes('-')) {
                        for (let i = 0; i < prop.length; i++) {
                            if (prop[i] === '-') {
                                camel = prop.substring(0, i) + prop[i + 1].toUpperCase() + prop.substring(i + 2, prop.length)
                            }
                        }
                    } else {
                        camel = prop
                    }
                    target.style[camel] = value
                }
            }
        }

        // update element when change their attribute
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
            setCurNode(curVnode.vNode)
        }, 300)

    }

    return [value, setValues];
}
