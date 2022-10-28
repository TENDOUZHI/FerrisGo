import { selectTarget } from "@/store/target.slice"
import { routesSliceAction, selectCurRoutes, selectProgramId, selectVapp } from "@/store/vapp.slice"
import { useEffect, useLayoutEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectRoot } from "@/store/source.slice"
import { useCompile } from "../useCompile"
import { selectDevice } from "@/store/device.slice"
import { Dispatch } from "@reduxjs/toolkit"
import { selectUser } from "@/store/user.slice"
import { selectWs } from "@/store/ws.slice"
import { selectSwiper, swiperSliceAction } from "@/store/swiper.slice"
import { useRenderer } from "../useRenderer"
import { useUpdate } from "../useUpdate"
import { useVprops } from "../useVprops"
import { iconSliceAction } from "@/store/icon.slice"


export const useGetValue = (prop: string, dispatch: Dispatch, hoc?: string, classStr?: string): [string, (value: string) => void] => {
    const [value, setValue] = useState<string>('')
    let target = useSelector(selectTarget) as HTMLElement
    const swiper = useSelector(selectSwiper)
    const vprops = useVprops()
    const preUpdate = useUpdate()
    useEffect(() => {
        if (target !== null) {
            if (prop === 'content') {
                const newValue = target.innerText
                setValue(newValue)
            } else if (hoc) {
                switch (prop) {
                    case 'swiper':
                        // @ts-ignore
                        setValue(swiper[hoc])
                        break;
                    case 'icon':
                        console.log(vprops.icon.content.get(classStr as string));
                        
                        let classs = classStr
                        if (vprops.icon.content.get(classStr as string) === undefined) {
                            classs = 'default'
                        }
                        let icon = vprops.icon.content.get(classStr as string)
                        setValue(icon?.size as string)
                        break;

                    default:
                        break;
                }
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
        } else if (prop === 'icon') {
            dispatch(iconSliceAction.updateIconSize({ className: classStr, size: value }))
        }
        else {
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
