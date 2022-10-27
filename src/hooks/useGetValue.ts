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
import { useUpdate } from "./useUpdate"


export const useGetValue = (prop: string, dispatch: Dispatch, hoc?: string): [string, (value: string) => void] => {
    const [value, setValue] = useState<string>('')
    let target = useSelector(selectTarget) as HTMLElement
    const swiper = useSelector(selectSwiper)
    const preUpdate = useUpdate()
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
            preUpdate()
        }, 300)

    }

    return [value, setValues];
}
