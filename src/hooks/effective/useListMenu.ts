import { iconSliceAction } from "@/store/icon.slice"
import { navigatorSliceAction, selectTabBar } from "@/store/navigator.slice"
import { routerElSliceAction } from "@/store/routerEl.slice"
import { selectTarget, targetSliceAction } from "@/store/target.slice"
import { Dispatch } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useUpdate } from "../useUpdate"
import { useVprops } from "../useVprops"

export type component = 'icon' | 'path' | 'router'

export const useListMenu = (component: component, title: string, navId?: number): [string, (value: string, id?: number) => void] => {
    const dispatch = useDispatch()
    const [value, setValue] = useState<string>('')
    const target = useSelector(selectTarget) as HTMLElement
    const navigator = useSelector(selectTabBar)
    const vprops = useVprops()
    const preUpdate = useUpdate()
    useEffect(() => {
        if (target !== null) {
            switch (component) {
                case 'icon':
                    let classs = target.classList[0]
                    if (vprops.icon.content.get(classs as string) === undefined) {
                        classs = 'default'
                    }
                    let icon = vprops.icon.content.get(classs as string)
                    setValue(icon?.icon_type as string)
                    break;
                case 'path':
                    setValue(title)
                    break;
                case 'router':
                    setValue(title)
                    break;
                default:
                    break;
            }
        } else {
            setValue(title)
        }

    }, [target, navigator, title])

    const setValues = (value: string, id?: number) => {
        switch (component) {
            case 'icon':
                dispatch(iconSliceAction.updateIconType({
                    className: target.classList[0], type: value
                }))
                setValue(value)
                break;
            case 'path':
                dispatch(navigatorSliceAction.updatePath({ id: navId, path: value }))
                dispatch(navigatorSliceAction.updatePathId({ id: navId, path_id: id }))
                setValue(value)
                break;
            case 'router':
                target.setAttribute('data-routerid', id?.toString() as string)
                target.setAttribute('data-router', value)
                break;
            default:
                break;
        }
        preUpdate()

    }

    return [value, setValues]
}