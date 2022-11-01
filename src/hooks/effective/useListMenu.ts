import { iconSliceAction } from "@/store/icon.slice"
import { selectTarget } from "@/store/target.slice"
import { Dispatch } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useUpdate } from "../useUpdate"
import { useVprops } from "../useVprops"

export const useListMenu = ( dispatch: Dispatch, component: string): [string, (value: string) => void] => {
    const [value, setValue] = useState<string>('')
    let target = useSelector(selectTarget) as HTMLElement
    const vprops = useVprops()
    const preUpdate = useUpdate()

    useEffect(() => {
        if (target !== null) {
            let classs = target.classList[0]
            if (vprops.icon.content.get(classs as string) === undefined) {
                classs = 'default'
            }
            let icon = vprops.icon.content.get(classs as string)
            setValue(icon?.icon_type as string)
        }

    }, [target])

    const setValues = (value: string) => {
        switch (component) {
            case 'icon':
                dispatch(iconSliceAction.updateIconType({
                    className: target.classList[0], type: value
                }))
                setValue(value)
                break;

            default:
                break;
        }
        preUpdate()
        
    }

    return [value, setValues]
}