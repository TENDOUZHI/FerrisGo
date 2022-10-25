import { selectTarget } from "@/store/target.slice"
import { routesSliceAction, selectCurRoutes, selectProgramId, selectVapp } from "@/store/vapp.slice"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectRoot } from "@/store/source.slice"
import { useCompile } from "./useCompile"
import { selectDevice } from "@/store/device.slice"
import { Dispatch } from "@reduxjs/toolkit"
import { selectUser } from "@/store/user.slice"
import { selectWs } from "@/store/ws.slice"
import { selectSwiper } from "@/store/swiper.slice"


export const useGetValue = (prop: string, dispatch: Dispatch): [string, (value: string) => void] => {
    const [value, setValue] = useState<string>('')
    let target = useSelector(selectTarget) as HTMLElement
    const current = useSelector(selectCurRoutes)
    const root = useSelector(selectRoot)
    const device = useSelector(selectDevice)
    const user = useSelector(selectUser)
    const ws = useSelector(selectWs)
    const program_id = useSelector(selectProgramId)
    const swiper = useSelector(selectSwiper)
    const vapp = useSelector(selectVapp)
    useEffect(() => {
        if (target !== null) {
            if (prop === 'content') {
                const newValue = target.innerText
                setValue(newValue)
            } else {
                const newValue = getComputedStyle(target).getPropertyValue(prop)
                setValue(newValue)
            }
        }
    }, [target])
    const setValues = (value: string) => {
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
        // update element when change their attribute
        setTimeout(() => {
            const curVnode = {
                id: current.id,
                vNode: useCompile(root, device.width, false,swiper)
            }
            const curWnode = {
                id: current.id,
                vNode: useCompile(root, device.width, false,swiper)
            }
            dispatch(routesSliceAction.updateVnode({
                curVnode, curWnode, 
                user_id: user.id,
                program_id: program_id,
                ws: ws
            }))
        }, 300)

    }

    return [value, setValues];
}
